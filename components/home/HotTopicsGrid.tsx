'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, Clock } from 'lucide-react'
import { cn, timeAgo } from '@/lib/utils'
import type { Article } from '@/types'

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  politics:  { bg: 'bg-red-600',     text: 'text-white' },
  finance:   { bg: 'bg-emerald-600', text: 'text-white' },
  scams:     { bg: 'bg-orange-500',  text: 'text-white' },
  viral:     { bg: 'bg-purple-600',  text: 'text-white' },
  'ai-tech': { bg: 'bg-sky-500',     text: 'text-white' },
}

const CATEGORY_LABELS: Record<string, string> = {
  politics: 'Politics', finance: 'Finance', scams: 'Scams', viral: 'Viral', 'ai-tech': 'AI & Tech',
}

interface HotTopicsGridProps {
  articles: Article[]
}

export default function HotTopicsGrid({ articles }: HotTopicsGridProps) {
  const items = articles.slice(0, 6)

  return (
    <section className="bg-cream py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide">
            Investigations
          </h2>
          <div className="flex-1 h-px bg-light-border" />
          <span className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">Deep Dives</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((article, i) => {
            const cat = CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.politics
            const catLabel = CATEGORY_LABELS[article.category] ?? article.category

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3 }}
                className="group"
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="block bg-white border border-light-border hover:shadow-[0_6px_24px_rgba(11,27,48,0.10)] transition-all duration-200 h-full overflow-hidden"
                >
                  {/* Category top bar */}
                  <div className={cn('h-1', cat.bg)} />

                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={cn('category-label font-black', cat.bg, cat.text)}>
                        {catLabel}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/70">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{(article.views / 1000).toFixed(0)}K</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime}m</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display font-bold text-slate-900 text-[14px] leading-snug line-clamp-2 group-hover:text-brand-red transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-[12px] line-clamp-2 mb-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-light-border text-[11px] text-slate-400">
                      <span>{timeAgo(article.publishedAt)}</span>
                      <span className="font-medium text-slate-600">{article.author.name}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
