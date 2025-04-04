import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ["/", "/auth/login", "/auth/register", "/auth/forgot-password", "/about"]
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`),
  )

  // If the path is public or it's an API route, allow access
  if (isPublicPath || request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Check for authentication token in cookies
  const sessionToken = request.cookies.get("next-auth.session-token")

  // If not authenticated, redirect to login
  if (!sessionToken) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // For protected routes, we'll let the page component handle the authorization
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except for static files, images, etc.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

