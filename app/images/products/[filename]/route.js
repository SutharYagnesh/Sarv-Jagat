import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request) {
  // Images are now served from /api/media/[id]/[filename] via MongoDB GridFS
  // This endpoint redirects to the brand logo as a safe fallback
  return NextResponse.redirect(
    new URL('/Sarv%20Jagat_Logo_Red_11.png', request.url),
    { status: 308 }
  );
}
