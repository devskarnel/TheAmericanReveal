import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_COOKIE = 'tar_admin_auth'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get(ADMIN_COOKIE)?.value === 'authenticated'

  // Not an admin route — pass through
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Login page: let unauthenticated users in; redirect authenticated away
  if (pathname === '/admin/login') {
    if (isAuthenticated) return NextResponse.redirect(new URL('/admin', request.url))
    return NextResponse.next()
  }

  // All other /admin/* routes require the cookie
  if (!isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
