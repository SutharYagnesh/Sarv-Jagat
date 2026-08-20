import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Catalog from '@/lib/models/Catalog';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    await connectDB();
    const catalog = await Catalog.findByIdAndUpdate(id, data, { new: true });
    if (!catalog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(catalog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const catalog = await Catalog.findByIdAndDelete(id);
    if (!catalog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
