import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function middleware(req) {
<<<<<<< HEAD
  const cookieStore = cookies();
  const session = cookieStore.get("session")?.value
  
=======
  const session = cookies().getAll()?.value;
>>>>>>> f593c3c2aea363d7dbee020c81aed61643b806ef
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