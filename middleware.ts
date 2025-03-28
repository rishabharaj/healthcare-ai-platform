import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

export async function middleware(request: NextRequest) {
  const session = await auth()

  // Public paths that don't require authentication
  const publicPaths = ["/", "/auth/login", "/auth/register", "/auth/forgot-password", "/about"]
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`),
  )

  // If the path is public or it's an API route, allow access
  if (isPublicPath || request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // If not authenticated, redirect to login
  if (!session) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Doctor-only paths
  const doctorPaths = ["/dashboard/admin", "/patient-data", "/analytics"]
  const isDoctorPath = doctorPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`),
  )

  // If trying to access doctor-only path but not a doctor
  if (isDoctorPath && session.user.userType !== "doctor") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except for static files, images, etc.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

