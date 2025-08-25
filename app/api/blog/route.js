import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Check if running in Vercel production environment
const isVercelProduction = process.env.VERCEL_ENV === 'production';

// Use file system for local development, KV for production
const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog', 'posts.json');
const KV_BLOG_KEY = 'blog_posts';

async function readBlogPosts() {
  try {
    if (isVercelProduction) {
      // Use Vercel KV in production
      const posts = await kv.get(KV_BLOG_KEY);
      return posts || [];
    } else {
      // Use file system in development
      const data = await fs.readFile(BLOG_POSTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist, return empty array
      return [];
    }
    console.error('Error reading blog posts:', error);
    throw error;
  }
}

async function writeBlogPosts(posts) {
  try {
    if (isVercelProduction) {
      // Use Vercel KV in production
      await kv.set(KV_BLOG_KEY, posts);
    } else {
      // Use file system in development
      await fs.writeFile(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
    }
  } catch (error) {
    console.error('Error writing blog posts:', error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    const blogData = {};

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

    let imageUrl = null;
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

    const newPost = { ...blogData, imageUrl, id: Date.now().toString() }; // Assign a unique ID

    // Save to the JSON file
    const posts = await readBlogPosts();
    posts.push(newPost);
    await writeBlogPosts(posts);

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
    
    const posts = await readBlogPosts();
    
    // Filter out unpublished posts if not explicitly requested
    const filteredPosts = includeUnpublished 
      ? posts 
      : posts.filter(post => post.status === 'published');
      
    return NextResponse.json({ posts: filteredPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
