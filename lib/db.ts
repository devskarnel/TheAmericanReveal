import type { Article } from '@/types'
import { articles as seedArticles } from '@/data/articles'

// ─── In-memory store ──────────────────────────────────────────────────────────
// Module-level cache — survives warm function instances on Vercel.
// On cold starts (or local dev first boot) it loads from db.json if present,
// then falls back to seed articles.  All fs calls are lazy + fully wrapped so
// a read-only filesystem (Vercel) never crashes anything.
let _store: Article[] | null = null

function dbPath(): string {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path') as typeof import('path')
    return path.join(process.cwd(), 'data', 'db.json')
  } catch {
    return ''
  }
}

function readFile(): DB | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs') as typeof import('fs')
    const p = dbPath()
    if (!p || !fs.existsSync(p)) return null
    const raw = fs.readFileSync(p, 'utf-8')
    const parsed = JSON.parse(raw) as DB
    if (Array.isArray(parsed?.articles) && parsed.articles.length > 0) return parsed
  } catch {}
  return null
}

function writeFile(articles: Article[]): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs') as typeof import('fs')
    const p = dbPath()
    if (!p) return
    fs.writeFileSync(p, JSON.stringify({ articles }, null, 2), 'utf-8')
  } catch {}
}

interface DB { articles: Article[] }

function getStore(): Article[] {
  if (_store !== null) return _store
  const fromFile = readFile()
  _store = fromFile ? fromFile.articles : [...seedArticles]
  return _store
}

function setStore(articles: Article[]): void {
  _store = articles
  writeFile(articles)   // no-op on read-only filesystems
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getAllArticles(): Article[] {
  return getStore()
}

export function getArticleById(id: string): Article | undefined {
  return getStore().find(a => a.id === id)
}

export function getArticleBySlugDB(slug: string): Article | undefined {
  return getStore().find(a => a.slug === slug)
}

export function createArticle(data: Partial<Article>): Article {
  const articles = getStore()
  const article: Article = {
    ...data,
    id: data.id || String(Date.now()),
    comments: data.comments ?? [],
    views:    data.views   ?? 0,
    likes:    data.likes   ?? 0,
    featured: data.featured ?? false,
  } as Article
  setStore([article, ...articles])
  return article
}

export function updateArticle(id: string, data: Partial<Article>): Article | null {
  const articles = getStore()
  const idx = articles.findIndex(a => a.id === id)
  if (idx === -1) return null
  articles[idx] = { ...articles[idx], ...data, updatedAt: new Date().toISOString() }
  setStore([...articles])
  return articles[idx]
}

export function deleteArticle(id: string): boolean {
  const articles = getStore()
  const next = articles.filter(a => a.id !== id)
  if (next.length === articles.length) return false
  setStore(next)
  return true
}

export function getFeaturedArticlesDB(): Article[] {
  return getStore().filter(a => a.featured && a.status === 'published')
}

export function getTrendingArticlesDB(): Article[] {
  return getStore()
    .filter(a => a.trending && a.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, 6)
}

export function getBreakingNewsDB(): Article[] {
  return getStore().filter(a => a.breaking && a.status === 'published')
}

export function getArticlesByCategoryDB(category: string): Article[] {
  return getStore().filter(a => a.category === category && a.status === 'published')
}

export function getRelatedArticlesDB(article: Article): Article[] {
  return getStore()
    .filter(a => a.id !== article.id && a.category === article.category && a.status === 'published')
    .slice(0, 3)
}

export function getAllPublishedArticles(): Article[] {
  return getStore().filter(a => a.status === 'published')
}

export function incrementArticleViews(id: string): void {
  try {
    const articles = getStore()
    const idx = articles.findIndex(a => a.id === id)
    if (idx === -1) return
    articles[idx] = { ...articles[idx], views: (articles[idx].views ?? 0) + 1 }
    setStore([...articles])
  } catch {}
}
