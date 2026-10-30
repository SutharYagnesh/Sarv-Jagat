import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import { getGridFSBucket } from '@/lib/gridfs';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const uploadId = formData.get('uploadId');
    const chunkIndex = parseInt(formData.get('chunkIndex'), 10);
    const totalChunks = parseInt(formData.get('totalChunks'), 10);
    const filename = formData.get('filename') || 'catalog.pdf';
    const contentType = formData.get('contentType') || 'application/pdf';
    const chunkFile = formData.get('chunk');

    if (!uploadId || isNaN(chunkIndex) || isNaN(totalChunks) || !chunkFile) {
      return NextResponse.json({ error: 'Missing chunk upload parameters' }, { status: 400 });
    }

    await connectDB();
    const db = mongoose.connection.db;

    const arrayBuffer = await chunkFile.arrayBuffer();
    const chunkBuffer = Buffer.from(arrayBuffer);

    // Save chunk to temporary collection
    await db.collection('tempUploadChunks').insertOne({
      uploadId,
      chunkIndex,
      data: chunkBuffer,
      createdAt: new Date(),
    });

    // Check how many chunks have arrived for this upload
    const count = await db.collection('tempUploadChunks').countDocuments({ uploadId });

    if (count === totalChunks) {
      // All chunks arrived! Assemble and write to GridFS
      const allChunks = await db.collection('tempUploadChunks')
        .find({ uploadId })
        .sort({ chunkIndex: 1 })
        .toArray();

      const totalLength = allChunks.reduce((acc, c) => acc + (c.data.buffer ? c.data.buffer.byteLength : c.data.length), 0);
      const bucket = await getGridFSBucket();

      const uploadStream = bucket.openUploadStream(filename, {
        metadata: {
          contentType,
          uploadedAt: new Date(),
          size: totalLength,
        },
      });

      await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);

        for (const c of allChunks) {
          const buf = c.data.buffer ? Buffer.from(c.data.buffer) : Buffer.from(c.data);
          uploadStream.write(buf);
        }
        uploadStream.end();
      });

      // Clean up temporary chunks
      await db.collection('tempUploadChunks').deleteMany({ uploadId });

      const fileUrl = `/api/media/${uploadStream.id}/${encodeURIComponent(filename)}`;
      const sizeMb = (totalLength / (1024 * 1024)).toFixed(2);

      return NextResponse.json({
        complete: true,
        url: fileUrl,
        filename,
        size: `${sizeMb} MB`,
        id: uploadStream.id,
      });
    }

    return NextResponse.json({
      complete: false,
      chunkIndex,
      totalChunks,
      received: count,
    });
  } catch (error) {
    console.error('Error handling chunk upload:', error);
    return NextResponse.json({ error: error.message || 'Chunk upload failed' }, { status: 500 });
  }
}

