import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import Blog from '@/lib/models/Blog';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function getAuth(request) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export async function GET(request) {
  try {
    const auth = await getAuth(request);
    if (!auth || !['Main Admin', 'Merchant Manager'].includes(auth.role)) {
      return NextResponse.json({ error: 'Unauthorized: Only Main Admin and Merchant Manager can access Merchant controls' }, { status: 403 });
    }

    await connectDB();

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sarvjagat.com';
    const feedUrl = `${baseUrl}/google-merchant.xml`;

    const products = await Product.find({})
      .select('title slug category price merchantPrice includeInMerchant status images order')
      .sort({ order: 1, createdAt: -1 })
      .lean();

    const blogs = await Blog.find({})
      .select('title slug category merchantPrice includeInMerchant status imageUrl images publishedAt')
      .sort({ publishedAt: -1 })
      .lean();

    const stats = {
      feedUrl,
      totalProductsInFeed: products.filter(
        (p) => String(p.status).toLowerCase() === 'published' && p.includeInMerchant !== false
      ).length,
      totalBlogsInFeed: blogs.filter(
        (b) => String(b.status).toLowerCase() === 'published' && b.includeInMerchant !== false
      ).length,
      totalProducts: products.length,
      totalBlogs: blogs.length,
    };

    return NextResponse.json({
      stats,
      products: products.map((p) => ({
        ...p,
        includeInMerchant: p.includeInMerchant !== false,
      })),
      blogs: blogs.map((b) => ({
        ...b,
        includeInMerchant: b.includeInMerchant !== false,
      })),
    });
  } catch (error) {
    console.error('Error fetching merchant feed data:', error);
    return NextResponse.json({ error: 'Failed to fetch merchant feed data' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const auth = await getAuth(request);
    if (!auth || !['Main Admin', 'Merchant Manager'].includes(auth.role)) {
      return NextResponse.json({ error: 'Unauthorized: Only Main Admin and Merchant Manager can update Merchant settings' }, { status: 403 });
    }

    const { type, id, includeInMerchant, merchantPrice } = await request.json();
    if (!type || !id) {
      return NextResponse.json({ error: 'Item type and ID are required' }, { status: 400 });
    }

    await connectDB();

    const updateFields = {};
    if (typeof includeInMerchant === 'boolean') {
      updateFields.includeInMerchant = includeInMerchant;
    }
    if (merchantPrice !== undefined) {
      const num = Number(merchantPrice);
      updateFields.merchantPrice = isNaN(num) ? 0 : num;
    }

    if (type === 'product') {
      const updated = await Product.findByIdAndUpdate(id, { $set: updateFields }, { new: true }).lean();
      if (!updated) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      return NextResponse.json({ success: true, item: updated });
    } else if (type === 'blog') {
      const updated = await Blog.findByIdAndUpdate(id, { $set: updateFields }, { new: true }).lean();
      if (!updated) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      return NextResponse.json({ success: true, item: updated });
    } else {
      return NextResponse.json({ error: 'Invalid item type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating merchant feed item:', error);
    return NextResponse.json({ error: 'Failed to update merchant item' }, { status: 500 });
  }
}

