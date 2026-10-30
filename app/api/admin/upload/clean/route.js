import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Catalog from '@/lib/models/Catalog';
import Product from '@/lib/models/Product';
import Blog from '@/lib/models/Blog';
import { getGridFSBucket } from '@/lib/gridfs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;

    const files = await db.collection('mediaFiles.files').find({}).toArray();
    const totalBytes = files.reduce((acc, f) => acc + (f.length || 0), 0);
    const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);

    return NextResponse.json({
      count: files.length,
      totalBytes,
      totalMb: `${totalMb} MB`,
    });
  } catch (error) {
    console.error('Error fetching media storage stats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    const bucket = await getGridFSBucket();

    // 1. Gather all referenced GridFS IDs in catalogs, products, blogs
    const catalogs = await Catalog.find({}).select('pdfUrl coverImage').lean();
    const products = await Product.find({}).select('images videos').lean();
    const blogs = await Blog.find({}).select('imageUrl images videos').lean();

    const referencedIds = new Set();

    const extractId = (url) => {
      if (!url || typeof url !== 'string') return;
      const match = url.match(/\/api\/media\/([a-fA-F0-9]{24})/);
      if (match) referencedIds.add(match[1]);
    };

    catalogs.forEach((c) => {
      extractId(c.pdfUrl);
      extractId(c.coverImage);
    });

    products.forEach((p) => {
      (p.images || []).forEach(extractId);
      (p.videos || []).forEach(extractId);
    });

    blogs.forEach((b) => {
      extractId(b.imageUrl);
      (b.images || []).forEach(extractId);
      (b.videos || []).forEach(extractId);
    });

    // 2. Find all GridFS files
    const allFiles = await db.collection('mediaFiles.files').find({}).toArray();
    let deletedCount = 0;
    let freedBytes = 0;

    for (const f of allFiles) {
      const fileIdStr = f._id.toString();
      if (!referencedIds.has(fileIdStr)) {
        await bucket.delete(f._id);
        deletedCount++;
        freedBytes += f.length || 0;
      }
    }

    // Clean up temporary upload chunks older than 1 hour
    const oneHourAgo = new Date(Date.now() - 3600 * 1000);
    await db.collection('tempUploadChunks').deleteMany({ createdAt: { $lt: oneHourAgo } });

    const freedMb = (freedBytes / (1024 * 1024)).toFixed(2);

    return NextResponse.json({
      success: true,
      deletedCount,
      freedMb: `${freedMb} MB`,
      message: `Cleaned up ${deletedCount} unreferenced files (${freedMb} MB freed).`,
    });
  } catch (error) {
    console.error('Error cleaning media storage:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

