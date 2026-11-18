import fs from 'fs/promises';
import path from 'path';
import connectDB from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { fetchWithCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

function getFallbackBuffer() {
  const primaryPath = path.join(process.cwd(), 'public', 'sj-screw-assemble.png');
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

    // Parse base slug and image index
    let baseSlug = cleanName;
    let imageIndex = 0;
    const imgMatch = cleanName.match(/-img-(\d+)$/i);
    if (imgMatch) {
      imageIndex = Math.max(0, parseInt(imgMatch[1], 10) - 1);
      baseSlug = cleanName.replace(/-img-\d+$/i, '');
    }

    // Fast in-memory cached blog lookup
    const post = await fetchWithCache(`seo_img_blog_${baseSlug}`, async () => {
      await connectDB();
      return await Blog.findOne({ slug: baseSlug })
        .select('imageUrl images title')
        .lean();
    }, 300);

    let rawImageUrl = null;
    if (post) {
      if (imageIndex > 0 && Array.isArray(post.images) && post.images.length >= imageIndex) {
        rawImageUrl = post.images[imageIndex - 1] || post.imageUrl;
      } else {
        rawImageUrl = post.imageUrl || (Array.isArray(post.images) && post.images.length > 0 ? post.images[0] : null);
      }
    }

    if (!rawImageUrl) {
      const fb = await getFallbackBuffer();
      return new Response(fb, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // Case 1: Remote Vercel Blob or external HTTPS image URL
    if (rawImageUrl.startsWith('http://') || rawImageUrl.startsWith('https://')) {
      const remoteRes = await fetch(rawImageUrl, { next: { revalidate: 86400 } });
      if (remoteRes.ok) {
        const contentType = remoteRes.headers.get('content-type') || 'image/jpeg';
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
      let localContentType = 'image/jpeg';
      if (/\.png$/i.test(localFilePath)) localContentType = 'image/png';
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
    console.error('Error serving blog SEO image:', error);
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

