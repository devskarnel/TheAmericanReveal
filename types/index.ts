export type Category = 'politics' | 'finance' | 'scams' | 'viral' | 'ai-tech'

export interface Author {
  id: string
  name: string
  avatar: string
  bio: string
  role: string
  twitter?: string
  articles: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  count: number
}

export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  createdAt: string
  likes: number
}

export interface Source {
  label: string
  url: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: Category
  tags: string[]
  author: Author
  featuredImage: string
  publishedAt: string
  updatedAt: string
  readingTime: number
  views: number
  likes: number
  comments: Comment[]
  featured: boolean
  breaking: boolean
  trending: boolean
  status: 'draft' | 'published'
  sources?: Source[]
}

export interface Newsletter {
  email: string
}

export type SortOrder = 'latest' | 'trending' | 'popular'
