'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Tag, ImagePlus, AlertTriangle, Flame, Link2, Plus, Trash2 } from 'lucide-react'
import { CATEGORIES, authors } from '@/data/articles'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { slugify } from '@/lib/utils'
import type { Category, Source } from '@/types'

export default function CreateArticlePage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Category>('politics')
  const [tags, setTags] = useState('')
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80')
  const [status, setStatus] = useState<'draft' | 'published'>('published')
  const [breaking, setBreaking] = useState(false)
  const [trending, setTrending] = useState(false)
  const [authorId, setAuthorId] = useState('1')
  const [sources, setSources] = useState<Source[]>([])
  const [srcLabel, setSrcLabel] = useState('')
  const [srcUrl, setSrcUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const addSource = () => {
    const url = srcUrl.trim()
    if (!url) return
    setSources(prev => [...prev, { label: srcLabel.trim() || url, url }])
    setSrcLabel('')
    setSrcUrl('')
  }
  const removeSource = (i: number) => setSources(prev => prev.filter((_, idx) => idx !== i))

  const handleSave = async () => {
    if (!title.trim()) { setError('Title is required'); return }
    if (!content.trim()) { setError('Content is required'); return }
    setError('')
    setSaving(true)

    const selectedAuthor = authors.find(a => a.id === authorId) ?? authors[0]
    const now = new Date().toISOString()

    const articleData = {
      title: title.trim(),
      slug: slugify(title),
      excerpt: excerpt.trim(),
      content,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      author: selectedAuthor,
      featuredImage,
      publishedAt: now,
      updatedAt: now,
      readingTime: Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, '').split(/\s+/).length / 200)),
      views: 0,
      likes: 0,
      comments: [],
      featured: false,
      breaking,
      trending,
      status,
      sources,
    }

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      })
      if (!res.ok) throw new Error('Failed to save')
      router.push('/admin')
    } catch (e) {
      setError('Failed to save article. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="glass border-b border-white/10 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-2 rounded-lg text-ink-500 hover:text-ink-300 glass transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-base font-bold text-white">New Article</h1>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="px-3 py-1.5 rounded-lg glass border border-white/10 text-ink-300 text-sm bg-transparent focus:outline-none"
            >
              <option value="draft" className="bg-surface-800">Draft</option>
              <option value="published" className="bg-surface-800">Published</option>
            </select>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-red text-white text-sm font-semibold hover:bg-brand-red-light transition-colors disabled:opacity-60"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Save className="w-4 h-4" /> Publish</>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + Excerpt */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Article Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a compelling headline..."
                className="w-full bg-transparent text-white text-xl font-bold placeholder-slate-600 focus:outline-none border-b border-white/10 pb-3"
              />
              <div>
                <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary shown in article previews..."
                  rows={3}
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-accent/40 text-sm resize-none"
                />
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-3 border-b border-white/10">
                <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Article Content *</span>
              </div>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Featured image */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider flex items-center gap-2">
                <ImagePlus className="w-3.5 h-3.5" /> Featured Image
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="Paste image URL..."
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-accent/40 text-xs"
              />
              {featuredImage && (
                <div className="relative h-36 rounded-xl overflow-hidden">
                  <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Author */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Author</label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-ink-100 focus:outline-none text-sm"
              >
                {authors.map(a => (
                  <option key={a.id} value={a.id} className="bg-surface-800">{a.name}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Category</label>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as Category)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      category === cat.id
                        ? 'bg-brand-red/15 border border-brand-red/40 text-brand-red'
                        : 'glass text-ink-300 hover:text-ink-100'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" /> Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma-separated tags..."
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-accent/40 text-sm"
              />
              {tags && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.split(',').map(t => t.trim()).filter(Boolean).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-xs text-ink-500 glass border border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Sources */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider flex items-center gap-2">
                <Link2 className="w-3.5 h-3.5" /> Sources
              </label>

              {/* Add row */}
              <input
                type="text"
                value={srcLabel}
                onChange={(e) => setSrcLabel(e.target.value)}
                placeholder="Label (e.g. CNN, YouTube…)"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-accent/40 text-xs"
              />
              <div className="flex gap-2">
                <input
                  type="url"
                  value={srcUrl}
                  onChange={(e) => setSrcUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSource()}
                  placeholder="https://…"
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-accent/40 text-xs"
                />
                <button
                  type="button"
                  onClick={addSource}
                  className="px-3 py-2 rounded-xl bg-brand-red/80 hover:bg-brand-red text-white text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* List */}
              {sources.length > 0 && (
                <div className="space-y-1.5 mt-1">
                  {sources.map((src, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8">
                      <span className="flex-1 text-xs text-ink-300 truncate">{src.label}</span>
                      <button type="button" onClick={() => removeSource(i)} className="text-ink-700 hover:text-red-400 transition-colors shrink-0">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Options</label>
              {[
                { id: 'breaking', label: 'Breaking News', icon: AlertTriangle, value: breaking, set: setBreaking, color: 'text-red-400' },
                { id: 'trending', label: 'Mark as Trending', icon: Flame, value: trending, set: setTrending, color: 'text-orange-400' },
              ].map(({ id, label, icon: Icon, value, set, color }) => (
                <label key={id} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => set(!value)}
                    className={`w-10 h-5 rounded-full transition-all duration-200 relative ${value ? 'bg-brand-red' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${value ? 'left-5.5' : 'left-0.5'}`} />
                  </div>
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <span className="text-sm text-ink-300 group-hover:text-ink-100 transition-colors">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
