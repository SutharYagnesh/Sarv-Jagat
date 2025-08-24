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

    // In a real application, you would save newPost to a database.
    // For now, let's simulate saving by reading existing posts and adding the new one.
    const blogPostsPath = path.join(process.cwd(), 'data', 'blog', 'posts.json');
    let existingPosts = [];
    try {
      const data = await fs.readFile(blogPostsPath, 'utf8');
      existingPosts = JSON.parse(data);
    } catch (readError) {
      if (readError.code === 'ENOENT') {
        console.warn('posts.json not found, creating a new one.');
      } else {
        throw readError; // Re-throw other errors
      }
    }

    existingPosts.push(newPost);
    await fs.writeFile(blogPostsPath, JSON.stringify(existingPosts, null, 2));

    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error processing blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogPostsPath = path.join(process.cwd(), 'data', 'blog', 'posts.json');
    let existingPosts = [];
    try {
      const data = await fs.readFile(blogPostsPath, 'utf8');
      existingPosts = JSON.parse(data);
    } catch (readError) {
      if (readError.code === 'ENOENT') {
        console.warn('posts.json not found, returning empty array.');
      } else {
        throw readError; // Re-throw other errors
      }
    }
    return NextResponse.json({ posts: existingPosts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}