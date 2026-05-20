'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import ArticleCard from '@/components/blog/ArticleCard'
import type { Article } from '@/types'

interface HeroSectionProps {
  featured: Article[]
  breaking: Article[]
}

export default function HeroSection({ featured, breaking }: HeroSectionProps) {
  const main = featured[0]
  const secondary = featured.slice(1, 3)

  if (!main) return null

  return (
    <section className="bg-navy pt-22 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-0">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="flex items-center gap-2 px-3 py-1 bg-brand-red">
            <AlertTriangle className="w-3 h-3 text-white" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.15em]">Top Stories</span>
          </div>
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-ink-700 text-[10px] uppercase tracking-widest font-semibold">May 21, 2026</span>
        </motion.div>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Main story */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            <ArticleCard article={main} variant="featured" />
          </motion.div>

          {/* Secondary stories */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {secondary.map((article, i) => (
              <ArticleCard key={article.id} article={article} variant="featured" index={i + 1} />
            ))}
          </div>
        </div>
      </div>

      {/* Breaking strip */}
      {breaking.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 border-t border-white/8 bg-navy-2"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {breaking.slice(0, 3).map((article, i) => (
                <ArticleCard key={article.id} article={article} variant="horizontal" index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
