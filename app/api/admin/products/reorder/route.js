import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { items } = await request.json(); // Array of { id, order }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Invalid items array' }, { status: 400 });
    }

    await connectDB();

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } },
      },
    }));

    await Product.bulkWrite(bulkOps);

    return NextResponse.json({ success: true, count: items.length });
  } catch (error) {
    console.error('Error reordering products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

