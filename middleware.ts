import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PREFIXES = ['/wedding', '/invite', '/api', '/_next', '/uploads', '/'];

function isPublicPath(pathname: string) {
  // allow exact root and public prefixes
  if (pathname === '/') return true;
  for (const p of PUBLIC_PREFIXES) {
    if (p === '/') continue;
    if (pathname.startsWith(p)) return true;
  }
  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public invitation pages (paths that start with /wedding or /invite) and auth endpoints
  if (pathname === '/login' || pathname === '/signup' || pathname === '/admin/login' || pathname.startsWith('/wedding') || pathname.startsWith('/invite') || pathname.startsWith('/uploads') || pathname.startsWith('/_next') || pathname === '/' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Allow API requests to flow to server (APIs must still enforce auth server-side)
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Protected areas: admin, couple, settings, create, edit, analytics, users, dashboard
  const protectedPrefixes = ['/admin', '/couple', '/settings', '/create', '/edit', '/analytics', '/users', '/dashboard'];
  const needsProtection = protectedPrefixes.some(p => pathname.startsWith(p));
  if (!needsProtection) return NextResponse.next();

  const cookieUser = req.cookies.get('session_user')?.value;
  const cookieRole = req.cookies.get('session_role')?.value;
  const cookieWedding = req.cookies.get('session_wedding')?.value;

  if (!cookieUser) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Admin-only routes
  if (pathname.startsWith('/admin')) {
    if (cookieRole !== 'super_admin') {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Couple routes: ensure role is couple and if slug present, matches session_wedding
  if (pathname.startsWith('/couple')) {
    if (cookieRole !== 'couple') {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    // check slug
    const parts = pathname.split('/').filter(Boolean);
    // expected /couple/:slug
    if (parts.length >= 2) {
      const slug = parts[1];
      if (cookieWedding && cookieWedding !== slug) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/couple/:path*', '/settings/:path*', '/create/:path*', '/edit/:path*', '/analytics/:path*', '/users/:path*', '/dashboard/:path*']
};
