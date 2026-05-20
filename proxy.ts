import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_COOKIE = 'tar_admin_auth'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow login page through
  if (pathname === '/admin/login') return NextResponse.next()

  // Protect all /admin routes
  if (pathname.startsWith('/admin')) {
    const auth = request.cookies.get(ADMIN_COOKIE)
    if (!auth || auth.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
