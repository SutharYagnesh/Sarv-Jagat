import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const source = await Blog.findById(id).lean();
    if (!source) {
      return NextResponse.json({ error: 'Source blog post not found' }, { status: 404 });
    }

    // Generate unique slug
    let baseSlug = `${source.slug || 'post'}-copy`;
    let candidateSlug = baseSlug;
    let counter = 1;

    while (await Blog.findOne({ slug: candidateSlug })) {
      counter++;
      candidateSlug = `${baseSlug}-${counter}`;
    }

    // Place cloned post at the very top (smallest order number)
    const lowestPost = await Blog.findOne({}).sort({ order: 1 }).select('order').lean();
    const minOrder = (lowestPost && typeof lowestPost.order === 'number') ? lowestPost.order : 0;

    const duplicateData = {
      title: `${source.title} (Copy)`,
      slug: candidateSlug,
      excerpt: source.excerpt || '',
      content: source.content || '',
      author: source.author || { name: 'Admin' },
      category: source.category || '',
      tags: Array.isArray(source.tags) ? [...source.tags] : [],
      status: 'draft',
      imageUrl: source.imageUrl || '',
      images: Array.isArray(source.images) ? [...source.images] : [],
      instagramLink: source.instagramLink || '',
      videos: Array.isArray(source.videos) ? [...source.videos] : [],
      youtubeLink: source.youtubeLink || '',
      readTime: source.readTime || 5,
      order: Math.min(minOrder - 1, -1),
      publishedAt: new Date(),
    };

    const newPost = await Blog.create(duplicateData);
    const mapped = { ...newPost.toObject(), id: newPost._id.toString() };
    delete mapped._id;

    invalidateCache('blogs_');
    invalidateCache('homepage');
    invalidateCache('public_blog');

    return NextResponse.json(mapped, { status: 201 });
  } catch (error) {
    console.error('Error cloning blog post:', error);
    return NextResponse.json({ error: error.message || 'Failed to clone blog post' }, { status: 500 });
  }
}
