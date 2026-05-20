import fs from 'fs'
import path from 'path'
import type { Article } from '@/types'
import { articles as seedArticles } from '@/data/articles'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

interface DB {
  articles: Article[]
}

function readDB(): DB {
  try {
    if (fs.existsSync(DB_PATH)) {
      return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
    }
  } catch {}
  const db: DB = { articles: seedArticles }
  try { writeDB(db) } catch {}
  return db
}

function writeDB(db: DB) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8')
}

export function getAllArticles(): Article[] {
  return readDB().articles
}

export function getArticleById(id: string): Article | undefined {
  return readDB().articles.find(a => a.id === id)
}

export function getArticleBySlugDB(slug: string): Article | undefined {
  return readDB().articles.find(a => a.slug === slug)
}

export function createArticle(data: Partial<Article>): Article {
  const db = readDB()
  const article = {
    ...data,
    id: data.id || String(Date.now()),
    comments: data.comments ?? [],
    views: data.views ?? 0,
    likes: data.likes ?? 0,
    featured: data.featured ?? false,
  } as Article
  db.articles.unshift(article)
  writeDB(db)
  return article
}

export function updateArticle(id: string, data: Partial<Article>): Article | null {
  const db = readDB()
  const idx = db.articles.findIndex(a => a.id === id)
  if (idx === -1) return null
  db.articles[idx] = { ...db.articles[idx], ...data, updatedAt: new Date().toISOString() }
  writeDB(db)
  return db.articles[idx]
}

export function deleteArticle(id: string): boolean {
  const db = readDB()
  const prev = db.articles.length
  db.articles = db.articles.filter(a => a.id !== id)
  if (db.articles.length === prev) return false
  writeDB(db)
  return true
}

export function getFeaturedArticlesDB(): Article[] {
  return readDB().articles.filter(a => a.featured && a.status === 'published')
}

export function getTrendingArticlesDB(): Article[] {
  return readDB().articles
    .filter(a => a.trending && a.status === 'published')
    .sort((a, b) => b.views - a.views)
    .slice(0, 6)
}

export function getBreakingNewsDB(): Article[] {
  return readDB().articles.filter(a => a.breaking && a.status === 'published')
}

export function getArticlesByCategoryDB(category: string): Article[] {
  return readDB().articles.filter(a => a.category === category && a.status === 'published')
}

export function getRelatedArticlesDB(article: Article): Article[] {
  return readDB().articles
    .filter(a => a.id !== article.id && a.category === article.category && a.status === 'published')
    .slice(0, 3)
}

export function getAllPublishedArticles(): Article[] {
  return readDB().articles.filter(a => a.status === 'published')
}
