import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME } from './lib/auth-constants';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  // Protected routes specified in Proposal.md: /booking, /checkout, /my-ticket
  const isProtectedPath = pathname.startsWith('/booking') || pathname.startsWith('/checkout') || pathname.startsWith('/my-ticket');
  
  if (isProtectedPath) {
    const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);
    
    // If not authenticated, redirect to /login with callbackUrl
    if (!sessionCookie || !sessionCookie.value) {
      const callbackUrl = encodeURIComponent(`${pathname}${search}`);
      const loginUrl = new URL(`/login?callbackUrl=${callbackUrl}`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/booking/:path*',
    '/checkout/:path*',
    '/checkout',
    '/my-ticket/:path*',
    '/my-ticket',
  ],
};
