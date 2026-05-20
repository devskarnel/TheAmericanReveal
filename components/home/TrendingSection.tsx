'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ArticleCard from '@/components/blog/ArticleCard'
import type { Article } from '@/types'
import { timeAgo } from '@/lib/utils'

interface TrendingSectionProps {
  articles: Article[]
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  const grid = articles.slice(0, 4)
  const sidebar = articles.slice(4, 8)

  return (
    <section className="bg-cream py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-brand-red" />
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide">
              Trending Now
            </h2>
          </div>
          <div className="flex-1 h-px bg-light-border" />
          <span className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">Most Read · 24hrs</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Article grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {grid.map((article, i) => (
              <ArticleCard key={article.id} article={article} variant="default" index={i} />
            ))}
          </div>

          {/* Numbered sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-light-border p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-4 pb-3 border-b border-light-border">
                Top Stories
              </p>
              <div className="divide-y divide-light-border">
                {sidebar.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/blog/${article.slug}`}
                      className="group flex items-start gap-3 py-3.5 hover:pl-1 transition-all duration-150"
                    >
                      <span className="shrink-0 text-brand-red font-mono text-xs font-black w-5 mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-bold text-slate-800 line-clamp-2 group-hover:text-brand-red transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-1">{timeAgo(article.publishedAt)}</p>
                      </div>
                      {article.featuredImage && (
                        <div className="relative w-14 h-12 shrink-0 overflow-hidden hidden sm:block">
                          <Image src={article.featuredImage} alt="" fill className="object-cover" />
                        </div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
