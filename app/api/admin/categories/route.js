import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/lib/models/Category';
import { fetchWithCache, invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await fetchWithCache('admin_categories', async () => {
      await connectDB();
      return await Category.find({}).sort({ order: 1 }).lean();
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
    const category = await Category.create(data);

    invalidateCache('admin_categories');
    invalidateCache('homepage');
    invalidateCache('public_products');

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
