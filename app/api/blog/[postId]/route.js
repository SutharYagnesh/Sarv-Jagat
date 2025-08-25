import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog', 'posts.json');

async function readBlogPosts() {
  try {
    const data = await fs.readFile(BLOG_POSTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeBlogPosts(posts) {
  await fs.writeFile(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2));
}

export async function DELETE(request) {
  try {
    const { pathname } = new URL(request.url);
    const segments = pathname.split('/');
    const postId = segments[segments.length - 1];

    if (!postId) {
      return NextResponse.json({ success: false, error: 'Post ID is required' }, { status: 400 });
    }

    let blogPostsData = await readBlogPosts();
    const initialLength = blogPostsData.length;
    blogPostsData = blogPostsData.filter(post => post.id !== postId);

    if (blogPostsData.length === initialLength) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    await writeBlogPosts(blogPostsData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { pathname } = new URL(request.url);
    const segments = pathname.split('/');
    const postId = segments[segments.length - 1];

    if (!postId) {
      return NextResponse.json({ success: false, error: 'Post ID is required' }, { status: 400 });
    }

    const updatedPostData = await request.json();
    let blogPostsData = await readBlogPosts();
    const postIndex = blogPostsData.findIndex(post => post.id === postId);

    if (postIndex === -1) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    blogPostsData[postIndex] = { ...blogPostsData[postIndex], ...updatedPostData, updatedAt: new Date().toISOString() };
    await writeBlogPosts(blogPostsData);

    return NextResponse.json({ success: true, post: blogPostsData[postIndex] });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}