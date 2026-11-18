import fs from 'fs/promises';
import path from 'path';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { fetchWithCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

function getFallbackBuffer() {
  const primaryPath = path.join(process.cwd(), 'public', 'uploads', 'product-10hp-8bar-1-1793802970199.png');
  return fs.readFile(primaryPath).catch(() => {
    const fallbackPath = path.join(process.cwd(), 'public', 'Sarv Jagat_Logo_Red_11.png');
    return fs.readFile(fallbackPath);
  });
}

export async function GET(request, { params }) {
  try {
    const { filename } = await params;
    if (!filename) {
      const fb = await getFallbackBuffer();
      return new Response(fb, {
        headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
      });
    }

    // Strip extension (.png, .jpg, .jpeg, .webp, etc.)
    const cleanName = filename.replace(/\.(png|jpe?g|webp|gif|svg)$/i, '');

    // Parse base slug and image index (e.g. "my-product-img-2" -> baseSlug: "my-product", index: 1)
    let baseSlug = cleanName;
    let imageIndex = 0;
    const imgMatch = cleanName.match(/-img-(\d+)$/i);
    if (imgMatch) {
      imageIndex = Math.max(0, parseInt(imgMatch[1], 10) - 1);
      baseSlug = cleanName.replace(/-img-\d+$/i, '');
    }

    // Fast in-memory cached product lookup
    const product = await fetchWithCache(`seo_img_prod_${baseSlug}`, async () => {
      await connectDB();
      return await Product.findOne({ slug: baseSlug })
        .select('images image title')
        .lean();
    }, 300);

    let rawImageUrl = null;
    if (product) {
      if (Array.isArray(product.images) && product.images.length > 0) {
        rawImageUrl = product.images[imageIndex] || product.images[0];
      } else if (product.image) {
        rawImageUrl = product.image;
      }
    }

    // If no product image found, serve corporate high-res logo
    if (!rawImageUrl) {
      const fb = await getFallbackBuffer();
      return new Response(fb, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
        },
      });
    }

    // Case 1: Remote Vercel Blob or external HTTPS image URL
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

    // Case 2: Local relative image in public directory
    const cleanLocalPath = rawImageUrl.replace(/^\//, '');
    const localFilePath = path.join(process.cwd(), 'public', cleanLocalPath);
    try {
      const fileBuffer = await fs.readFile(localFilePath);
      let localContentType = 'image/png';
      if (/\.jpe?g$/i.test(localFilePath)) localContentType = 'image/jpeg';
      else if (/\.webp$/i.test(localFilePath)) localContentType = 'image/webp';
      else if (/\.gif$/i.test(localFilePath)) localContentType = 'image/gif';

      return new Response(fileBuffer, {
        headers: {
          'Content-Type': localContentType,
          'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
          'Content-Disposition': 'inline',
        },
      });
    } catch {
      // Local file read failed, fallback
    }

    const fb = await getFallbackBuffer();
    return new Response(fb, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error serving product SEO image:', error);
    try {
      const fb = await getFallbackBuffer();
      return new Response(fb, {
        headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600' },
      });
    } catch {
      return new Response('Image not found', { status: 404 });
    }
  }
}

