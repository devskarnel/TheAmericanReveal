import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getArticleById, updateArticle, deleteArticle } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const article = getArticleById(id)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(article)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const updated = updateArticle(id, body)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  revalidatePath('/')
  revalidatePath(`/blog/${updated.slug}`)
  return NextResponse.json(updated)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const ok = deleteArticle(id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
