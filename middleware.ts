import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Check if the current hostname is the writings subdomain
  if (hostname.startsWith('writings.')) {
    // If the path is exactly '/' on the subdomain, rewrite to '/writings'
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/writings', req.url));
    }
    
    // Otherwise, rewrite to '/writings/path'
    return NextResponse.rewrite(new URL(`/writings${url.pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip static files, images, api routes, etc.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
