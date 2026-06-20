import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';

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
        if (isVercelProduction) {
          // Use Vercel Blob Storage in production
          const { put } = await import('@vercel/blob');
          const filename = `${Date.now()}-${image.name}`;
          const blob = await put(filename, image, {
            access: 'public',
          });
          imageUrl = blob.url;
        } else {
          // Use local file system in development
          const buffer = Buffer.from(await image.arrayBuffer());
          const filename = `${Date.now()}-${image.name}`;
          const imagePath = path.join(process.cwd(), 'public', 'uploads', 'blog', filename);

          // Ensure the directory exists
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

    const newPost = await Blog.create(blogData);

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error processing blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    
    const query = includeUnpublished ? {} : { status: 'published' };
    const posts = await Blog.find(query).sort({ publishedAt: -1 }).lean();
    
    // Map _id to id for frontend
    const mappedPosts = posts.map(p => {
       const mapped = { ...p, id: p._id.toString() };
       delete mapped._id;
       return mapped;
    });
      
    return NextResponse.json({ posts: mappedPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
