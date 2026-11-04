import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { fetchWithCache, invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const cacheKey = `admin_products_${category || 'all'}_${search ? search.trim().toLowerCase() : 'all'}`;
    const products = await fetchWithCache(cacheKey, async () => {
      await connectDB();
      let query = {};
      if (category && category !== 'all') query.category = category;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { modelNumber: { $regex: search, $options: 'i' } },
        ];
      }

      return await Product.find(query)
        .select('-description -specifications')
        .sort({ order: 1, createdAt: -1 })
        .lean();
    }, 45);

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectDB();
    const product = await Product.create(data);
    invalidateCache('admin_products');
    invalidateCache('homepage');
    invalidateCache('public_products');
    invalidateCache('catalog');
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
