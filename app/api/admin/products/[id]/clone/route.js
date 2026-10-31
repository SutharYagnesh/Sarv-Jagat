import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';

export const dynamic = 'force-dynamic';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const source = await Product.findById(id).lean();
    if (!source) {
      return NextResponse.json({ error: 'Source product not found' }, { status: 404 });
    }

    // Generate unique slug
    let baseSlug = `${source.slug || 'product'}-copy`;
    let candidateSlug = baseSlug;
    let counter = 1;

    while (await Product.findOne({ slug: candidateSlug })) {
      counter++;
      candidateSlug = `${baseSlug}-${counter}`;
    }

    // Determine order: place copy right after original or at beginning
    const targetOrder = (source.order || 0) + 1;

    const duplicateData = {
      title: `${source.title} (Copy)`,
      slug: candidateSlug,
      category: source.category,
      modelNumber: source.modelNumber ? `${source.modelNumber}-COPY` : 'COPY',
      powerRating: source.powerRating || '0',
      pressureRating: source.pressureRating || '0',
      airFlow: source.airFlow || '0',
      price: source.price || 0,
      images: Array.isArray(source.images) ? [...source.images] : [],
      videos: Array.isArray(source.videos) ? [...source.videos] : [],
      youtubeLink: source.youtubeLink || '',
      description: source.description || source.title,
      specifications: Array.isArray(source.specifications) ? [...source.specifications] : [],
      seoTitle: source.seoTitle ? `${source.seoTitle} (Copy)` : `${source.title} (Copy)`,
      seoDescription: source.seoDescription || source.description || source.title,
      seoKeywords: Array.isArray(source.seoKeywords) ? [...source.seoKeywords] : [],
      order: targetOrder,
      status: 'Draft',
    };

    const newProduct = await Product.create(duplicateData);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error cloning product:', error);
    return NextResponse.json({ error: error.message || 'Failed to clone product' }, { status: 500 });
  }
}

