import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

// In a real application, you would use a database for persistent storage.
// For demonstration purposes, we'll use an in-memory array.
export let inMemoryBlogPosts = [];

// Check if running in Vercel production environment
const isVercelProduction = process.env.VERCEL_ENV === 'production';

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

    // Add to in-memory array
    inMemoryBlogPosts.push(newPost);

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
    
    // Filter out unpublished posts if not explicitly requested
    const filteredPosts = includeUnpublished 
      ? inMemoryBlogPosts 
      : inMemoryBlogPosts.filter(post => post.status === 'published');
      
    return NextResponse.json({ posts: filteredPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
