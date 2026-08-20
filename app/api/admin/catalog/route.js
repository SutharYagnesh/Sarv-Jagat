import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Catalog from '@/lib/models/Catalog';

export async function GET() {
  try {
    await connectDB();
    const catalogs = await Catalog.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(catalogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch catalogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectDB();
    
    // Auto increment order if not provided
    if (data.order === undefined) {
      const highestOrder = await Catalog.findOne().sort({ order: -1 }).select('order');
      data.order = highestOrder ? highestOrder.order + 1 : 0;
    }

    const catalog = await Catalog.create(data);
    return NextResponse.json(catalog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
