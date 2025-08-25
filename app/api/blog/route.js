// In a real application, you would use a database for persistent storage.


import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

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
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `${Date.now()}-${image.name}`;
      const imagePath = path.join(process.cwd(), 'public', 'uploads', 'blog', filename);

      // Ensure the directory exists
      await fs.mkdir(path.dirname(imagePath), { recursive: true });
      await fs.writeFile(imagePath, buffer);
      imageUrl = `/uploads/blog/${filename}`;
    }

    // For now, we'll just log the data and return a success message.
    // In a real application, you would save this to a database.
    // For now, we'll add it to our in-memory array. 
    // inMemoryBlogPosts.push(newPost);
    return NextResponse.json({ success: false, error: "Direct file system operations are not supported on Vercel's read-only file system. Please integrate a Headless CMS or a database for persistent storage." }, { status: 500 });
  } catch (error) {
    console.error('Error processing blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
    return NextResponse.json({ success: false, error: "Direct file system operations are not supported on Vercel's read-only file system. Please integrate a Headless CMS or a database for persistent storage." }, { status: 500 });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}