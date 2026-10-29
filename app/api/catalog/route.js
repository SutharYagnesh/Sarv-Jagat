import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Catalog from '@/lib/models/Catalog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    const catalogs = await Catalog.find({ status: 'Published' }).sort({ isComprehensive: -1, order: 1, createdAt: -1 }).lean();
    return NextResponse.json(catalogs);
  } catch (error) {
    console.error('Error fetching catalogs:', error);
    return NextResponse.json([], { status: 500 });
  }
}

