import { NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/gridfs';
import { Readable } from 'stream';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const filename = file.name || 'document.pdf';
    const contentType = file.type || 'application/octet-stream';
    const isPdfOrVideo =
      contentType.includes('pdf') ||
      contentType.includes('video') ||
      filename.endsWith('.pdf') ||
      filename.endsWith('.mp4') ||
      filename.endsWith('.webm') ||
      filename.endsWith('.mov');

    // 1. For PDFs, Videos, or large media files: Upload directly to MongoDB Database (GridFS)
    if (isPdfOrVideo) {
      const bucket = await getGridFSBucket();
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadStream = bucket.openUploadStream(filename, {
        metadata: {
          contentType: contentType,
          uploadedAt: new Date(),
          size: buffer.length,
        },
      });

      await new Promise((resolve, reject) => {
        const readable = Readable.from(buffer);
        readable.pipe(uploadStream).on('finish', resolve).on('error', reject);
      });

      const fileUrl = `/api/media/${uploadStream.id}/${encodeURIComponent(filename)}`;
      const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);

      return NextResponse.json({
        url: fileUrl,
        filename,
        size: `${sizeMb} MB`,
        id: uploadStream.id,
      });
    }

    // 2. For images: Try Vercel Blob if configured, else store in MongoDB GridFS
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import('@vercel/blob');
        const blob = await put(filename, file, { access: 'public' });
        return NextResponse.json({ url: blob.url });
      } catch (blobError) {
        console.warn('Vercel Blob failed, falling back to database storage:', blobError.message);
      }
    }

    // Database GridFS fallback for all files
    const bucket = await getGridFSBucket();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        contentType: contentType,
        uploadedAt: new Date(),
        size: buffer.length,
      },
    });

    await new Promise((resolve, reject) => {
      const readable = Readable.from(buffer);
      readable.pipe(uploadStream).on('finish', resolve).on('error', reject);
    });

    const fileUrl = `/api/media/${uploadStream.id}/${encodeURIComponent(filename)}`;
    return NextResponse.json({ url: fileUrl, filename });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload file' }, { status: 500 });
  }
}
