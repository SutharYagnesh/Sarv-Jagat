// In a real application, you would use a database for persistent storage.
// In a real application, you would use a database for persistent storage.
const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog', 'posts.json');

async function readBlogPosts() {
  try {
    const data = await fs.readFile(BLOG_POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist, return empty array
      return [];
    }
    throw error;
  }
}

async function writeBlogPosts(posts) {
  await fs.writeFile(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
}

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
    const newPost = { ...blogData, imageUrl, id: Date.now().toString() }; // Assign a unique ID

    const posts = await readBlogPosts();
    posts.push(newPost);
    await writeBlogPosts(posts);

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error processing blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await readBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}