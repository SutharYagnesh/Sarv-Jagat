import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dealer from '@/lib/models/Dealer';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const updated = await Dealer.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Dealer not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating dealer:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    const deleted = await Dealer.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Dealer not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Dealer deleted successfully' });
  } catch (error) {
    console.error('Error deleting dealer:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

