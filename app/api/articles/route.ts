import { NextResponse } from 'next/server'
import { getAllArticles, createArticle } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET() {
  const articles = getAllArticles()
  return NextResponse.json(articles)
}

export async function POST(request: Request) {
  const body = await request.json()
  const article = createArticle(body)
  revalidatePath('/')
  return NextResponse.json(article, { status: 201 })
}
