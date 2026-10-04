// middleware.ts (วางไว้ที่ root ของโปรเจค ข้าง ๆ folder app/)
import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/booking", "/checkout"];

export function middleware(request: NextRequest) {
  const sessionUserId = request.cookies.get("session_userId")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected && !sessionUserId) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/booking/:path*", "/checkout/:path*"],
};