import { NextResponse } from 'next/server';
import { NextResponse } from 'next/server';
import { dbConnect, BlogPost } from '../../../lib/dbConnect';

// GET a specific blog post by ID
export async function GET(request, { params }) {
  await dbConnect();
  try {
    const { postId } = params;
    const post = await BlogPost.findOne({ $or: [{ id: postId }, { slug: postId }] }).lean();

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
  await dbConnect();
  try {
    const { postId } = params;
    const updatedPostData = await request.json();

    // Ensure author is an object if it's part of the update
    if (updatedPostData.author && typeof updatedPostData.author === 'string') {
      try {
        updatedPostData.author = JSON.parse(updatedPostData.author);
      } catch (e) {
        console.error('Failed to parse author string during update:', e);
        // Fallback or error handling
        updatedPostData.author = { name: updatedPostData.author, email: '', company: '', avatar: '/placeholder-user.jpg' };
      }
    }

    const post = await BlogPost.findOneAndUpdate(
      { $or: [{ id: postId }, { slug: postId }] },
      { ...updatedPostData, updatedAt: new Date().toISOString() },
      { new: true }
    ).lean();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a specific blog post
export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { postId } = params;
    const deletedPost = await BlogPost.findOneAndDelete({ $or: [{ id: postId }, { slug: postId }] }).lean();

    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedPost });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}