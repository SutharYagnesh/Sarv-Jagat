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

    const filename = file.name || 'upload-file';
    const contentType = file.type || 'application/octet-stream';

    // Store directly in MongoDB GridFS (zero external dependency, unlimited capacity, high performance)
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
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload file' }, { status: 500 });
  }
}
