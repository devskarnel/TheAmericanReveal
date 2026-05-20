'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import { searchArticles } from '@/data/articles'
import { cn, CATEGORY_COLORS, timeAgo } from '@/lib/utils'
import type { Article } from '@/types'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

const POPULAR_SEARCHES = ['Dark Money', 'AI Fraud', 'Crypto Scam', 'Congress Corruption', 'Tesla']

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  useEffect(() => {
    if (query.trim().length > 1) {
      setResults(searchArticles(query).slice(0, 6))
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-100 flex items-start justify-center pt-20 px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <Search className="w-5 h-5 text-accent shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles, topics, keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-ink-100 placeholder-ink-700 text-base outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-ink-500 hover:text-ink-500 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="px-2 py-1 rounded text-xs text-ink-500 border border-white/10 hover:border-white/20 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-125 overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-2">
                  <p className="text-xs text-ink-500 px-3 py-2 uppercase tracking-wider">Results</p>
                  {results.map((article) => (
                    <Link
                      key={article.id}
                      href={`/blog/${article.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
                        <Image src={article.featuredImage} alt="" fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={cn('category-badge border text-[10px]', CATEGORY_COLORS[article.category])}>
                          {article.category.replace('ai-tech', 'AI & Tech')}
                        </span>
                        <p className="text-sm text-ink-300 font-medium mt-0.5 line-clamp-1 group-hover:text-accent transition-colors">
                          {article.title}
                        </p>
                        <p className="text-xs text-ink-500">{timeAgo(article.publishedAt)}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-ink-500 group-hover:text-accent transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : query.length > 1 ? (
                <div className="py-12 text-center">
                  <p className="text-ink-500">No results for &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                <div className="p-4">
                  <div className="mb-4">
                    <p className="text-xs text-ink-500 px-1 pb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3" /> Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 rounded-lg text-xs text-ink-500 glass hover:text-accent hover:border-accent/30 transition-all"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
