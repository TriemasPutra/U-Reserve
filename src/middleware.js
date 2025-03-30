import { NextResponse } from 'next/server'
import { decrypt } from "@/lib/crypt"

export function middleware(request) {
  const role = request.cookies.get('role')?.value;
  const decryptedRole = decrypt(role);
  const url = request.nextUrl.clone();
  if (decryptedRole !== 'S' && decryptedRole !== 'A' && url.pathname !== '/login') {
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  } else if (decryptedRole === 'S') {
    url.pathname = "/user";
    return NextResponse.rewrite(url);
  } else if (decryptedRole === 'A') {
    url.pathname = "/admin";
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)"
}