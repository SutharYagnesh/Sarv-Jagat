import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import Blog from '@/lib/models/Blog';
import CompanyInfo from '@/lib/models/CompanyInfo';
import { verifyToken } from '@/lib/auth';
import { fetchWithCache, invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

async function getAuth(request) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}

const DEFAULT_MERCHANT_SETTINGS = {
  skuPrefix: 'SJ',
  suppliedSkuPrefix: 'SJ-SUP',
  handlingTimeMin: 1,
  handlingTimeMax: 3,
  transitTimeMin: 3,
  transitTimeMax: 7,
  ratingValue: '4.9',
  reviewCount: '85',
  reviewerName: 'Industrial Plant Engineer',
  reviewBody: 'High energy efficiency, robust build quality, and excellent continuous pneumatic air delivery. Highly recommended for heavy-duty industrial applications.',
};

export async function GET(request) {
  try {
    const auth = await getAuth(request);
    if (!auth || !['Main Admin', 'Merchant Manager'].includes(auth.role)) {
      return NextResponse.json(
        { error: 'Unauthorized: Only Main Admin and Merchant Manager can access Merchant controls' },
        { status: 403 }
      );
    }

    await connectDB();

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sarvjagat.com';
    const feedUrl = `${baseUrl}/google-merchant.xml`;

    const [products, blogs, companyInfo] = await Promise.all([
      Product.find({})
        .select('title slug category price merchantPrice includeInMerchant status images order')
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      Blog.find({})
        .select('title slug category merchantPrice includeInMerchant status imageUrl images publishedAt')
        .sort({ publishedAt: -1 })
        .lean(),
      CompanyInfo.findOne().lean(),
    ]);

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

    const merchantSettings = companyInfo?.merchantSettings || DEFAULT_MERCHANT_SETTINGS;

    return NextResponse.json({
      stats,
      settings: merchantSettings,
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
      return NextResponse.json(
        { error: 'Unauthorized: Only Main Admin and Merchant Manager can update Merchant settings' },
        { status: 403 }
      );
    }

    const body = await request.json();
    await connectDB();

    // 1. Update Global Merchant / Schema Settings
    if (body.type === 'settings') {
      const updatedCompany = await CompanyInfo.findOneAndUpdate(
        {},
        { $set: { merchantSettings: body.settings } },
        { new: true, upsert: true }
      ).lean();

      invalidateCache('company_info');
      invalidateCache('all_published_products_catalog');

      return NextResponse.json({ success: true, settings: updatedCompany.merchantSettings });
    }

    // 2. Update Individual Item (Product or Blog)
    const { type, id, includeInMerchant, merchantPrice } = body;
    if (!type || !id) {
      return NextResponse.json({ error: 'Item type and ID are required' }, { status: 400 });
    }

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
      invalidateCache('all_published_products_catalog');
      return NextResponse.json({ success: true, item: updated });
    } else if (type === 'blog') {
      const updated = await Blog.findByIdAndUpdate(id, { $set: updateFields }, { new: true }).lean();
      if (!updated) return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      invalidateCache('blog_post_');
      return NextResponse.json({ success: true, item: updated });
    } else {
      return NextResponse.json({ error: 'Invalid item type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating merchant feed item:', error);
    return NextResponse.json({ error: 'Failed to update merchant item' }, { status: 500 });
  }
}
