import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/lib/models/Category';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    await connectDB();
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const category = await Category.findByIdAndDelete(id);
    if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
