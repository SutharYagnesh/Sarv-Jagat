import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Catalog from '@/lib/models/Catalog';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const catalogs = await Catalog.find({}).sort({ isComprehensive: -1, order: 1, createdAt: -1 }).lean();
    return NextResponse.json(catalogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch catalogs' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectDB();

    if (data.isComprehensive) {
      // If setting this one as comprehensive main, unmark others
      await Catalog.updateMany({}, { isComprehensive: false });
    }

    const catalog = await Catalog.create(data);
    return NextResponse.json(catalog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

