import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 7) return formatDate(dateString)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function readingTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export const CATEGORY_COLORS: Record<string, string> = {
  politics: 'bg-red-500/20 text-red-400 border-red-500/30',
  finance: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  scams: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  viral: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'ai-tech': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
}

export const CATEGORY_GLOW: Record<string, string> = {
  politics: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]',
  finance: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
  scams: 'shadow-[0_0_20px_rgba(249,115,22,0.2)]',
  viral: 'shadow-[0_0_20px_rgba(139,92,246,0.2)]',
  'ai-tech': 'shadow-[0_0_20px_rgba(0,212,255,0.2)]',
}
