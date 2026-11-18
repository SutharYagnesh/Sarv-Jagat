import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { fetchWithCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { filename } = await params;
    if (!filename) {
      return NextResponse.redirect(new URL('/Sarv Jagat_Logo_Red_11.png', request.url), 307);
    }

    // Strip extension (.png, .jpg, .jpeg, .webp, etc.)
    const cleanName = filename.replace(/\.(png|jpe?g|webp|gif|svg)$/i, '');

    // Parse base slug and image index
    let baseSlug = cleanName;
    let imageIndex = 0;
    const imgMatch = cleanName.match(/-img-(\d+)$/i);
    if (imgMatch) {
      imageIndex = Math.max(0, parseInt(imgMatch[1], 10) - 1);
      baseSlug = cleanName.replace(/-img-\d+$/i, '');
    }

    // Fast in-memory cached product lookup
    const prod = await fetchWithCache(`seo_img_prod_${baseSlug}`, async () => {
      await connectDB();
      return await Product.findOne({ slug: baseSlug })
        .select('image images title')
        .lean();
    }, 300);

    let rawImageUrl = null;
    if (prod) {
      if (imageIndex > 0 && Array.isArray(prod.images) && prod.images.length >= imageIndex) {
        rawImageUrl = prod.images[imageIndex - 1] || prod.image;
      } else {
        rawImageUrl = prod.image || (Array.isArray(prod.images) && prod.images.length > 0 ? prod.images[0] : null);
      }
    }

    if (!rawImageUrl) {
      return NextResponse.redirect(new URL('/Sarv Jagat_Logo_Red_11.png', request.url), 307);
    }

    // Case 1: Remote external HTTPS image URL
    if (rawImageUrl.startsWith('http://') || rawImageUrl.startsWith('https://')) {
      const remoteRes = await fetch(rawImageUrl, { next: { revalidate: 86400 } });
      if (remoteRes.ok) {
        const contentType = remoteRes.headers.get('content-type') || 'image/png';
        const buffer = await remoteRes.arrayBuffer();
        return new Response(buffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
            'Content-Disposition': 'inline',
          },
        });
      }
    }

    // Case 2: Local relative image in public directory -> clean redirect
    if (rawImageUrl.startsWith('/')) {
      return NextResponse.redirect(new URL(rawImageUrl, request.url), 307);
    }

    return NextResponse.redirect(new URL('/Sarv Jagat_Logo_Red_11.png', request.url), 307);
  } catch (error) {
    console.error('Error serving product SEO image:', error);
    return NextResponse.redirect(new URL('/Sarv Jagat_Logo_Red_11.png', request.url), 307);
  }
}
