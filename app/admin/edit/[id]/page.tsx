'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Tag, ImagePlus, AlertTriangle, Flame, Link2, Plus, Trash2 } from 'lucide-react'
import { CATEGORIES, authors } from '@/data/articles'
import RichTextEditor from '@/components/admin/RichTextEditor'
import type { Article, Category, Source } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

export default function EditArticlePage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()

  const [article, setArticle] = useState<Article | null>(null)
  const [loadError, setLoadError] = useState('')
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Category>('politics')
  const [tags, setTags] = useState('')
  const [featuredImage, setFeaturedImage] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
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

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject('Not found'))
      .then((a: Article) => {
        setArticle(a)
        setTitle(a.title)
        setExcerpt(a.excerpt)
        setContent(a.content)
        setCategory(a.category)
        setTags(a.tags.join(', '))
        setFeaturedImage(a.featuredImage)
        setStatus(a.status)
        setBreaking(a.breaking)
        setTrending(a.trending)
        setAuthorId(a.author?.id ?? '1')
        setSources(a.sources ?? [])
      })
      .catch(() => setLoadError('Article not found'))
  }, [id])

  const handleSave = async () => {
    if (!title.trim()) { setError('Title is required'); return }
    setError('')
    setSaving(true)

    const selectedAuthor = authors.find(a => a.id === authorId) ?? authors[0]

    const updates = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      author: selectedAuthor,
      featuredImage,
      status,
      breaking,
      trending,
      sources,
      readingTime: Math.max(1, Math.ceil(content.replace(/<[^>]+>/g, '').split(/\s+/).length / 200)),
    }

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error('Failed to update')
      router.push('/admin')
    } catch {
      setError('Failed to update article. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-500 mb-4">{loadError}</p>
          <Link href="/admin" className="text-brand-red text-sm hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-brand-red rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="glass border-b border-white/10 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-2 rounded-lg text-ink-500 hover:text-ink-300 glass transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-base font-bold text-white">Edit Article</h1>
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
                <><Save className="w-4 h-4" /> Update</>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6 space-y-4">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-white text-xl font-bold placeholder-slate-600 focus:outline-none border-b border-white/10 pb-3"
              />
              <div>
                <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-accent/40 text-sm resize-none"
                />
              </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-3 border-b border-white/10">
                <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Content</span>
              </div>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider flex items-center gap-2">
                <ImagePlus className="w-3.5 h-3.5" /> Featured Image
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-ink-100 focus:outline-none focus:border-accent/40 text-xs"
              />
              {featuredImage && (
                <div className="relative h-36 rounded-xl overflow-hidden">
                  <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

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

            <div className="glass rounded-2xl p-5 space-y-2">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Category</label>
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
                  <span>{cat.icon}</span><span>{cat.name}</span>
                </button>
              ))}
            </div>

            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" /> Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-ink-100 focus:outline-none focus:border-accent/40 text-sm"
              />
            </div>

            {/* Sources */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider flex items-center gap-2">
                <Link2 className="w-3.5 h-3.5" /> Sources
              </label>
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
                <button type="button" onClick={addSource}
                  className="px-3 py-2 rounded-xl bg-brand-red/80 hover:bg-brand-red text-white text-xs transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
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

            <div className="glass rounded-2xl p-5 space-y-3">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wider">Options</label>
              {[
                { id: 'breaking', label: 'Breaking News', icon: AlertTriangle, value: breaking, set: setBreaking, color: 'text-red-400' },
                { id: 'trending', label: 'Trending', icon: Flame, value: trending, set: setTrending, color: 'text-orange-400' },
              ].map(({ id, label, icon: Icon, value, set, color }) => (
                <label key={id} className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => set(!value)}
                    className={`w-10 h-5 rounded-full transition-all relative ${value ? 'bg-brand-red' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${value ? 'left-5.5' : 'left-0.5'}`} />
                  </div>
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <span className="text-sm text-ink-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
