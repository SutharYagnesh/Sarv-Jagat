import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request) {
  const rawHost = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '').toLowerCase();
  const host = rawHost.split(':')[0];
  const proto = request.headers.get('x-forwarded-proto');
  const path = request.nextUrl.pathname;
  const lowerPath = path.toLowerCase();

  // 1. Canonical redirect from apex sarvjagat.com or insecure http to https://www.sarvjagat.com
  // Eliminates GSC "Redirect error" by ensuring clean 1-hop 301 redirect with no internal port leaking
  if (host === 'sarvjagat.com' || (host === 'www.sarvjagat.com' && proto === 'http')) {
    const canonicalUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://www.sarvjagat.com');
    canonicalUrl.port = '';
    return NextResponse.redirect(canonicalUrl.toString(), 301);
  }

  // 2. Prevent 404 for legacy/homepage aliases (/home, /Home, /index, /index.html)
  if (
    lowerPath === '/home' ||
    lowerPath === '/home/' ||
    lowerPath === '/index' ||
    lowerPath === '/index/' ||
    lowerPath === '/index.html'
  ) {
    return NextResponse.redirect(new URL('/', 'https://www.sarvjagat.com'), 301);
  }

  // 3. Admin RBAC protection
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

    // Google Merchant tab: strictly Main Admin and Merchant Manager ONLY
    if (path.startsWith('/admin/merchant') && role !== 'Main Admin' && role !== 'Merchant Manager') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Merchant Manager role: only access to Google Merchant and Dashboard
    if (role === 'Merchant Manager') {
      if (
        path.startsWith('/admin/products') ||
        path.startsWith('/admin/categories') ||
        path.startsWith('/admin/blog') ||
        path.startsWith('/admin/catalog') ||
        path.startsWith('/admin/dealers') ||
        path.startsWith('/admin/settings') ||
        path.startsWith('/admin/users')
      ) {
        return NextResponse.redirect(new URL('/admin/merchant', request.url));
      }
    }

    // Blogger role: only access to Blog and Dashboard
    if (role === 'Blogger') {
      if (
        path.startsWith('/admin/products') ||
        path.startsWith('/admin/categories') ||
        path.startsWith('/admin/catalog') ||
        path.startsWith('/admin/dealers') ||
        path.startsWith('/admin/merchant') ||
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
        path.startsWith('/admin/dealers') ||
        path.startsWith('/admin/merchant') ||
        path.startsWith('/admin/settings') ||
        path.startsWith('/admin/users')
      ) {
        return NextResponse.redirect(new URL('/admin/products', request.url));
      }
    }

    // Manager role: access to Products, Categories, Blog, Catalog, Dealers (restricted from Merchant, Users, Settings)
    if (role === 'Manager') {
      if (
        path.startsWith('/admin/merchant') ||
        path.startsWith('/admin/users') ||
        path.startsWith('/admin/settings')
      ) {
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
