import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

// Use file system for persistent storage
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

// GET a specific blog post by ID
export async function GET(request, { params }) {
  try {
    const { postId } = await params;
    const posts = await readBlogPosts();
    const post = posts.find(p => p.id === postId || p.slug === postId);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE a specific blog post
export async function PUT(request, { params }) {
  try {
    const { postId } = await params;
    const posts = await readBlogPosts();
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const updatedPostData = await request.json();
    
    // Update the post with new data
    posts[postIndex] = {
      ...posts[postIndex],
      ...updatedPostData,
      updatedAt: new Date().toISOString()
    };

    await writeBlogPosts(posts);

    return NextResponse.json({ success: true, post: posts[postIndex] });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a specific blog post
export async function DELETE(request, { params }) {
  try {
    const { postId } = await params;
    const posts = await readBlogPosts();
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Remove the post from the array
    const deletedPost = posts.splice(postIndex, 1)[0];
    await writeBlogPosts(posts);

    return NextResponse.json({ success: true, deletedPost });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}