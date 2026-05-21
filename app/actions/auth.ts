'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_COOKIE = 'tar_admin_auth'
const USERNAME = 'Admin'
const PASSWORD = 'American0011'

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (username === USERNAME && password === PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    })
    redirect('/admin')
  }

  return { error: 'Invalid username or password.' }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
  redirect('/admin/login')
}
