import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

// GET a specific blog post by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { postId } = await params;
    
    // Check if it's a valid object ID or a slug
    const query = postId.match(/^[0-9a-fA-F]{24}$/) ? { _id: postId } : { slug: postId };
    const post = await Blog.findOne(query).lean();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    post.id = post._id.toString();
    delete post._id;

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE a specific blog post
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { postId } = await params;

    const updatedPostData = await request.json();
    
    // Convert author to expected structure if needed
    if (updatedPostData.author && typeof updatedPostData.author === 'object' && updatedPostData.author.name) {
       // Keep it as is
    } else if (typeof updatedPostData.authorName === 'string') {
       updatedPostData.author = { name: updatedPostData.authorName };
    }

    // Map coverImage and images
    if (updatedPostData.coverImage && !updatedPostData.imageUrl) {
        updatedPostData.imageUrl = updatedPostData.coverImage;
    }
    if (!updatedPostData.imageUrl && updatedPostData.images && updatedPostData.images.length > 0) {
        updatedPostData.imageUrl = updatedPostData.images[0];
    }
    if (updatedPostData.imageUrl && (!updatedPostData.images || updatedPostData.images.length === 0)) {
        updatedPostData.images = [updatedPostData.imageUrl];
    }

    const post = await Blog.findByIdAndUpdate(postId, updatedPostData, { new: true }).lean();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    post.id = post._id.toString();
    delete post._id;

    invalidateCache(); // Clear all memory caches

    try {
      const { revalidatePath } = await import('next/cache');
      revalidatePath('/', 'layout');
      revalidatePath('/blog');
      if (post.slug) revalidatePath(`/blog/${post.slug}`);
    } catch (revalErr) {
      console.error('Revalidation error:', revalErr);
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a specific blog post
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { postId } = await params;

    const deletedPost = await Blog.findByIdAndDelete(postId).lean();

    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    deletedPost.id = deletedPost._id.toString();
    delete deletedPost._id;

    invalidateCache(); // Clear all memory caches

    try {
      const { revalidatePath } = await import('next/cache');
      revalidatePath('/', 'layout');
      revalidatePath('/blog');
      if (deletedPost.slug) revalidatePath(`/blog/${deletedPost.slug}`);
    } catch (revalErr) {
      console.error('Revalidation error:', revalErr);
    }

    return NextResponse.json({ success: true, deletedPost });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
