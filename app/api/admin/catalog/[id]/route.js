import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Catalog from '@/lib/models/Catalog';
import { deleteGridFSFile } from '@/lib/gridfs';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    await connectDB();

    const existing = await Catalog.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Catalog not found' }, { status: 404 });
    }

    // If PDF URL is changing and old one was stored in GridFS, clean up the old file
    if (data.pdfUrl && existing.pdfUrl && data.pdfUrl !== existing.pdfUrl) {
      if (existing.pdfUrl.includes('/api/media/')) {
        await deleteGridFSFile(existing.pdfUrl);
      }
    }

    if (data.isComprehensive) {
      await Catalog.updateMany({ _id: { $ne: id } }, { isComprehensive: false });
    }

    const updated = await Catalog.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const catalog = await Catalog.findById(id);
    if (!catalog) {
      return NextResponse.json({ error: 'Catalog not found' }, { status: 404 });
    }

    // Purge the physical PDF file and chunks from MongoDB GridFS database
    if (catalog.pdfUrl && catalog.pdfUrl.includes('/api/media/')) {
      await deleteGridFSFile(catalog.pdfUrl);
    }

    await Catalog.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Catalog and database media file deleted permanently' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
