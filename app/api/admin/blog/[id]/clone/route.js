import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';

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
      order: (source.order || 0) + 1,
      publishedAt: new Date(),
    };

    const newPost = await Blog.create(duplicateData);
    const mapped = { ...newPost.toObject(), id: newPost._id.toString() };
    delete mapped._id;

    return NextResponse.json(mapped, { status: 201 });
  } catch (error) {
    console.error('Error cloning blog post:', error);
    return NextResponse.json({ error: error.message || 'Failed to clone blog post' }, { status: 500 });
  }
}

