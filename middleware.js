import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const isSuperAdmin = payload.role === 'Super Admin' || payload.role === 'Main Admin';
    const isContentAdmin = payload.role === 'Content Admin';

    // Users page is strictly for Super Admins
    if (path.startsWith('/admin/users') && !isSuperAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Content Admins can only edit and publish blogs and categories
    if (isContentAdmin) {
      const allowedPaths = ['/admin', '/admin/blogs', '/admin/categories'];
      const isAllowed = allowedPaths.some(allowed => path === allowed || path.startsWith(`${allowed}/`));
      
      if (!isAllowed) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
