import { NextRequest, NextResponse } from 'next/server'

const ADMIN_COOKIE = 'tar_admin_auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only intercept admin routes
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Always allow the login page through (avoid redirect loop)
  if (pathname === '/admin/login') {
    // If already authenticated, redirect away from login to dashboard
    const authenticated = request.cookies.get(ADMIN_COOKIE)?.value === 'authenticated'
    if (authenticated) return NextResponse.redirect(new URL('/admin', request.url))
    return NextResponse.next()
  }

  // All other /admin/* routes require the auth cookie
  const authenticated = request.cookies.get(ADMIN_COOKIE)?.value === 'authenticated'
  if (!authenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
