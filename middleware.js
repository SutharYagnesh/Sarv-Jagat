import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request) {
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '').toLowerCase();
  const path = request.nextUrl.pathname;

  // 1. Canonical redirect from apex sarvjagat.com to www.sarvjagat.com (fixes Google Search Console redirect issues)
  if (host === 'sarvjagat.com') {
    const canonicalUrl = new URL(request.url);
    canonicalUrl.host = 'www.sarvjagat.com';
    canonicalUrl.protocol = 'https:';
    return NextResponse.redirect(canonicalUrl, 301);
  }

  // 2. Admin RBAC protection
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.role) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const role = payload.role;

    // Users management & Company settings: strictly Main Admin
    if ((path.startsWith('/admin/users') || path.startsWith('/admin/settings')) && role !== 'Main Admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Blogger role: only access to Blog and Dashboard
    if (role === 'Blogger') {
      if (
        path.startsWith('/admin/products') ||
        path.startsWith('/admin/categories') ||
        path.startsWith('/admin/catalog') ||
        path.startsWith('/admin/settings') ||
        path.startsWith('/admin/users')
      ) {
        return NextResponse.redirect(new URL('/admin/blog', request.url));
      }
    }

    // Product Manager role: only access to Products and Dashboard
    if (role === 'Product Manager') {
      if (
        path.startsWith('/admin/blog') ||
        path.startsWith('/admin/categories') ||
        path.startsWith('/admin/catalog') ||
        path.startsWith('/admin/settings') ||
        path.startsWith('/admin/users')
      ) {
        return NextResponse.redirect(new URL('/admin/products', request.url));
      }
    }

    // Manager role: access to Products, Categories, Blog, Catalog (restricted from Users and Settings)
    if (role === 'Manager') {
      if (path.startsWith('/admin/users') || path.startsWith('/admin/settings')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)',
  ],
};
