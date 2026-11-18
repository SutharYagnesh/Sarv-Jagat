import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Category from '@/lib/models/Category';
import { fetchWithCache, invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await fetchWithCache('admin_categories', async () => {
      await connectDB();
      return await Category.find({}).sort({ order: 1, createdAt: 1 }).lean();
    }, 120);

    return NextResponse.json(categories, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectDB();
    
    // Auto-generate sensible SEO defaults if not explicitly provided
    if (!data.seoTitle && data.name) {
      data.seoTitle = `${data.name} | Sarv Jagat - SJ`;
    }
    if (!data.seoDescription && (data.description || data.name)) {
      data.seoDescription = data.description || `Leading manufacturers, exporters and wholesale suppliers of premium ${data.name}. High efficiency industrial air compressor solutions by Sarv Jagat - SJ.`;
    }

    const category = await Category.create(data);

    // Invalidate memory caches
    invalidateCache('admin_categories');
    invalidateCache('homepage');
    invalidateCache('public_products');
    invalidateCache('public_products_page');
    invalidateCache('all_published_products_catalog');
    if (category.slug) {
      invalidateCache(`category_doc_${category.slug}`);
      invalidateCache(`category_products_${category.slug}`);
    }

    // Invalidate Next.js page static caches
    try {
      revalidatePath('/products');
      revalidatePath(`/products/category/${category.slug}`);
      revalidatePath('/sitemap.xml');
      revalidatePath('/');
    } catch (e) {
      // Ignore during build or non-standard environments
    }

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
