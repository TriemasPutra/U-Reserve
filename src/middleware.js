import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value
  
  if (!session && req.url !== "/login") {
    console.log("session : ", session)
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url)
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|login).*)"
}