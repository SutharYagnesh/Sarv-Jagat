import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import { getGridFSBucket } from '@/lib/gridfs';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    if (!slug || slug.length === 0) {
      return new Response('File not found', { status: 404 });
    }

    const fileIdStr = slug[0];
    if (!mongoose.Types.ObjectId.isValid(fileIdStr)) {
      return new Response('Invalid file ID', { status: 400 });
    }

    const fileId = new mongoose.Types.ObjectId(fileIdStr);
    await connectDB();
    const db = mongoose.connection.db;

    const fileDoc = await db.collection('mediaFiles.files').findOne({ _id: fileId });
    if (!fileDoc) {
      return new Response('File not found in database', { status: 404 });
    }

    const contentType = fileDoc.metadata?.contentType || (fileDoc.filename.endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream');
    const fileSize = fileDoc.length;
    const bucket = await getGridFSBucket();

    // Check for HTTP Range Header (vital for Videos & multi-page PDFs)
    const range = request.headers.get('range');

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;

      const downloadStream = bucket.openDownloadStream(fileId, {
        start,
        end: end + 1,
      });

      // Convert Node readable stream to Web ReadableStream
      const webStream = new ReadableStream({
        start(controller) {
          downloadStream.on('data', (chunk) => controller.enqueue(chunk));
          downloadStream.on('end', () => controller.close());
          downloadStream.on('error', (err) => controller.error(err));
        },
        cancel() {
          downloadStream.destroy();
        },
      });

      return new Response(webStream, {
        status: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': String(chunksize),
          'Content-Type': contentType,
          'Content-Disposition': `inline; filename="${encodeURIComponent(fileDoc.filename)}"`,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // Full file stream
    const downloadStream = bucket.openDownloadStream(fileId);
    const webStream = new ReadableStream({
      start(controller) {
        downloadStream.on('data', (chunk) => controller.enqueue(chunk));
        downloadStream.on('end', () => controller.close());
        downloadStream.on('error', (err) => controller.error(err));
      },
      cancel() {
        downloadStream.destroy();
      },
    });

    return new Response(webStream, {
      status: 200,
      headers: {
        'Content-Length': String(fileSize),
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${encodeURIComponent(fileDoc.filename)}"`,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error streaming media file:', error);
    return new Response('Error retrieving media file', { status: 500 });
  }
}

