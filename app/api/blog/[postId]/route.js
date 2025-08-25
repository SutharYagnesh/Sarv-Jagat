import { NextResponse } from 'next/server';
import { inMemoryBlogPosts } from '../route.js';

// Check if running in Vercel production environment
const isVercelProduction = process.env.VERCEL_ENV === 'production';

// GET a specific blog post by ID
export async function GET(request, { params }) {
  try {
    const { postId } = await params;
    const post = inMemoryBlogPosts.find(p => p.id === postId || p.slug === postId);

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
    const postIndex = inMemoryBlogPosts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const updatedPostData = await request.json();
    
    // Update the post with new data
    inMemoryBlogPosts[postIndex] = {
      ...inMemoryBlogPosts[postIndex],
      ...updatedPostData,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, post: inMemoryBlogPosts[postIndex] });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a specific blog post
export async function DELETE(request, { params }) {
  try {
    const { postId } = await params;
    const postIndex = inMemoryBlogPosts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Remove the post from the array
    const deletedPost = inMemoryBlogPosts.splice(postIndex, 1)[0];

    return NextResponse.json({ success: true, deletedPost });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}