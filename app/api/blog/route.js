import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { fetchWithCache, invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

// Check if running in Vercel production environment
const isVercelProduction = process.env.VERCEL_ENV === 'production';

export async function POST(request) {
  try {
    await connectDB();
    
    // Check if the request is FormData or JSON
    const contentType = request.headers.get('content-type') || '';
    
    let blogData = {};
    let imageUrl = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const image = formData.get('image');

      for (const [key, value] of formData.entries()) {
        if (key !== 'image' && !key.endsWith('[]')) {
          blogData[key] = value;
        } else if (key.endsWith('[]')) {
          const baseKey = key.slice(0, -2);
          if (!blogData[baseKey]) {
            blogData[baseKey] = [];
          }
          blogData[baseKey].push(value);
        }
      }

      if (image && image.name) {
        try {
          const { getGridFSBucket } = await import('@/lib/gridfs');
          const { Readable } = await import('stream');
          const bucket = await getGridFSBucket();
          const filename = `${Date.now()}-${image.name}`;
          const arrayBuffer = await image.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const uploadStream = bucket.openUploadStream(filename, {
            metadata: {
              contentType: image.type || 'image/jpeg',
              uploadedAt: new Date(),
              size: buffer.length,
            },
          });
          await new Promise((resolve, reject) => {
            const readable = Readable.from(buffer);
            readable.pipe(uploadStream).on('finish', resolve).on('error', reject);
          });
          imageUrl = `/api/media/${uploadStream.id}/${encodeURIComponent(filename)}`;
        } catch (uploadErr) {
          console.error('GridFS upload failed, fallback to local file:', uploadErr);
          const buffer = Buffer.from(await image.arrayBuffer());
          const filename = `${Date.now()}-${image.name}`;
          const imagePath = path.join(process.cwd(), 'public', 'uploads', 'blog', filename);
          await fs.mkdir(path.dirname(imagePath), { recursive: true });
          await fs.writeFile(imagePath, buffer);
          imageUrl = `/uploads/blog/${filename}`;
        }
      }
    } else {
      blogData = await request.json();
    }

    if (imageUrl) {
      blogData.imageUrl = imageUrl;
    }
    
    // Set author if passed as nested obj or string
    if (blogData.author && typeof blogData.author === 'object' && blogData.author.name) {
      blogData.author = { name: blogData.author.name };
    } else if (typeof blogData.authorName === 'string') {
       blogData.author = { name: blogData.authorName };
    }

    // Default title to slug if slug isn't provided
    if (!blogData.slug && blogData.title) {
        blogData.slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    // Map coverImage to imageUrl
    if (blogData.coverImage && !blogData.imageUrl) {
        blogData.imageUrl = blogData.coverImage;
    }

    // Always place new blog post at the very top (smallest order number)
    const lowestPost = await Blog.findOne({}).sort({ order: 1 }).select('order').lean();
    const minOrder = (lowestPost && typeof lowestPost.order === 'number') ? lowestPost.order : 0;
    blogData.order = Math.min(minOrder - 1, -1);
    if (!blogData.publishedAt) {
      blogData.publishedAt = new Date();
    }

    const newPost = await Blog.create(blogData);

    invalidateCache('blogs_');
    invalidateCache('homepage');
    invalidateCache('public_blog');

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error processing blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    
    const cacheKey = `blogs_list_${includeUnpublished}`;
    const mappedPosts = await fetchWithCache(cacheKey, async () => {
      await connectDB();
      const query = includeUnpublished ? {} : { status: 'published' };
      const posts = await Blog.find(query).sort({ order: 1, publishedAt: -1 }).lean();
      
      return posts.map(p => {
        const mapped = { ...p, id: p._id.toString() };
        delete mapped._id;
        return mapped;
      });
    }, 45);

    return NextResponse.json({ posts: mappedPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
