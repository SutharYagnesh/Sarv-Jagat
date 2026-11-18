import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Category from '@/lib/models/Category';
import { invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    await connectDB();

    // Auto-generate sensible SEO defaults if not provided
    if (!data.seoTitle && data.name) {
      data.seoTitle = `${data.name} | Sarv Jagat - SJ`;
    }
    if (!data.seoDescription && (data.description || data.name)) {
      data.seoDescription = data.description || `Leading manufacturers, exporters and wholesale suppliers of premium ${data.name}. High efficiency industrial air compressor solutions by Sarv Jagat - SJ.`;
    }

    const previous = await Category.findById(id).lean();
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Invalidate memory caches
    invalidateCache('admin_categories');
    invalidateCache('homepage');
    invalidateCache('public_products');
    invalidateCache('public_products_page');
    invalidateCache('all_published_products_catalog');
    if (previous?.slug) {
      invalidateCache(`category_doc_${previous.slug}`);
      invalidateCache(`category_products_${previous.slug}`);
    }
    if (category.slug) {
      invalidateCache(`category_doc_${category.slug}`);
      invalidateCache(`category_products_${category.slug}`);
    }

    // Invalidate Next.js page static caches
    try {
      revalidatePath('/products');
      revalidatePath(`/products/category/${category.slug}`);
      if (previous?.slug && previous.slug !== category.slug) {
        revalidatePath(`/products/category/${previous.slug}`);
      }
      revalidatePath('/sitemap.xml');
      revalidatePath('/');
    } catch (e) {
      // Ignore during build or non-standard environments
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const category = await Category.findByIdAndDelete(id);
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });

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

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
