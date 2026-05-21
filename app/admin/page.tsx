'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus, Edit2, Trash2, Eye, TrendingUp, FileText,
  Users, Search, LogOut, CheckCircle, XCircle, Clock, RefreshCw
} from 'lucide-react'
import { formatDate, formatViews, CATEGORY_COLORS, cn } from '@/lib/utils'
import { logoutAction } from '@/app/actions/auth'
import type { Article } from '@/types'

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function fetchArticles() {
    setLoading(true)
    try {
      const res = await fetch('/api/articles', { cache: 'no-store' })
      const data = await res.json()
      setArticles(data)
    } catch (e) {
      console.error('Failed to load articles', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchArticles() }, [])

  async function handleDelete(id: string) {
    setDeleting(id)
    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' })
      setArticles((prev) => prev.filter((a) => a.id !== id))
    } catch (e) {
      console.error('Delete failed', e)
    } finally {
      setDeleting(null)
      setDeleteConfirm(null)
    }
  }

  const filtered = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'all' || a.category === categoryFilter
    return matchSearch && matchCat
  })

  const published = articles.filter(a => a.status === 'published').length
  const trending = articles.filter(a => a.trending).length
  const totalViews = articles.reduce((s, a) => s + (a.views ?? 0), 0)

  const STATS = [
    { label: 'Total Articles', value: String(articles.length), icon: FileText, color: 'text-brand-red', bg: 'bg-brand-red/10' },
    { label: 'Published', value: String(published), icon: Eye, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Trending', value: String(trending), icon: TrendingUp, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
    { label: 'Total Views', value: formatViews(totalViews), icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ]

  return (
    <div className="min-h-screen">
      {/* Admin nav */}
      <div className="glass border-b border-white/8 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <h1 className="text-base font-bold text-ink-100">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchArticles}
              className="p-2 rounded text-ink-700 hover:text-ink-300 glass transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              href="/admin/create"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-brand-red text-ink-100 text-sm font-semibold hover:bg-brand-red-light transition-colors"
            >
              <Plus className="w-4 h-4" /> New Article
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="p-2 rounded text-ink-700 hover:text-brand-red glass transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-ink-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-white/8 text-ink-100 placeholder-slate-600 focus:outline-none focus:border-brand-red/30 text-sm transition-colors"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl glass border border-white/8 text-ink-300 focus:outline-none focus:border-brand-red/30 text-sm bg-transparent"
          >
            <option value="all" className="bg-surface-800">All Categories</option>
            <option value="politics" className="bg-surface-800">Politics</option>
            <option value="finance" className="bg-surface-800">Finance</option>
            <option value="scams" className="bg-surface-800">Scams</option>
            <option value="viral" className="bg-surface-800">Viral</option>
            <option value="ai-tech" className="bg-surface-800">AI & Tech</option>
          </select>
        </div>

        {/* Articles table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between">
            <h2 className="font-semibold text-ink-300 text-sm">Articles ({filtered.length})</h2>
            {loading && <div className="w-4 h-4 border-2 border-white/20 border-t-brand-red rounded-full animate-spin" />}
          </div>

          <div className="divide-y divide-white/5">
            {loading && filtered.length === 0 ? (
              <div className="py-12 text-center text-ink-500 text-sm">Loading articles...</div>
            ) : filtered.length === 0 ? (
              <div className="py-12 text-center text-ink-500">No articles found.</div>
            ) : (
              filtered.map((article) => {
                const catColor = CATEGORY_COLORS[article.category]
                return (
                  <div
                    key={article.id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors group"
                  >
                    {/* Image */}
                    <div className="relative w-14 h-12 rounded-lg overflow-hidden shrink-0 hidden sm:block">
                      <Image src={article.featuredImage} alt="" fill className="object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={cn('category-badge border text-[10px]', catColor)}>
                          {article.category.replace('ai-tech', 'AI & Tech')}
                        </span>
                        {article.breaking && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 font-semibold">Breaking</span>
                        )}
                        {article.trending && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold">Trending</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-ink-300 line-clamp-1">{article.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-ink-700">
                        <span>{article.author?.name ?? 'Unknown'}</span>
                        <span>·</span>
                        <span>{formatDate(article.publishedAt)}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatViews(article.views ?? 0)}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="shrink-0 hidden md:flex items-center gap-1.5">
                      {article.status === 'published' ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-ink-500">
                          <Clock className="w-3.5 h-3.5" /> Draft
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="p-1.5 rounded-lg text-ink-500 hover:text-accent hover:bg-accent/8 transition-all"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/edit/${article.id}`}
                        className="p-1.5 rounded-lg text-ink-500 hover:text-ink-300 hover:bg-white/5 transition-all"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      {deleteConfirm === article.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(article.id)}
                            disabled={deleting === article.id}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-xs font-semibold disabled:opacity-50"
                          >
                            {deleting === article.id ? '...' : 'Confirm'}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-1.5 rounded-lg text-ink-500 hover:bg-white/5 transition-all"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(article.id)}
                          className="p-1.5 rounded-lg text-ink-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
