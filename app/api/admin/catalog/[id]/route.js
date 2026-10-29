import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Catalog from '@/lib/models/Catalog';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    await connectDB();

    if (data.isComprehensive) {
      await Catalog.updateMany({ _id: { $ne: id } }, { isComprehensive: false });
    }

    const updated = await Catalog.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Catalog not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const deleted = await Catalog.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Catalog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Catalog deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

