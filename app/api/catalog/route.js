import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Catalog from '@/lib/models/Catalog';

export const revalidate = 300;

export async function GET() {
  try {
    await connectDB();
    const catalogs = await Catalog.find({ status: { $regex: /^published$/i } })
      .sort({ isComprehensive: -1, order: 1, createdAt: -1 })
      .lean();
    return NextResponse.json(catalogs, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching catalogs:', error);
    return NextResponse.json([], { status: 500 });
  }
}
