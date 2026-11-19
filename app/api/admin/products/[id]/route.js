import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    await connectDB();

    if (!data.image && data.images && data.images.length > 0) {
      data.image = data.images[0];
    }
    if (data.image && (!data.images || data.images.length === 0)) {
      data.images = [data.image];
    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    invalidateCache();

    try {
      const { revalidatePath } = await import('next/cache');
      revalidatePath('/', 'layout');
      revalidatePath('/products');
      if (product.slug) revalidatePath(`/products/${product.slug}`);
      revalidatePath('/products/category/[slug]', 'page');
    } catch (revalErr) {
      console.error('Revalidation error:', revalErr);
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findByIdAndDelete(id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    invalidateCache();

    try {
      const { revalidatePath } = await import('next/cache');
      revalidatePath('/', 'layout');
      revalidatePath('/products');
      if (product.slug) revalidatePath(`/products/${product.slug}`);
      revalidatePath('/products/category/[slug]', 'page');
    } catch (revalErr) {
      console.error('Revalidation error:', revalErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
