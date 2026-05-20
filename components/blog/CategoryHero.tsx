'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

const CATEGORY_CONFIG: Record<string, { accentClass: string; description: string }> = {
  politics:  { accentClass: 'border-l-4 border-red-600',     description: 'Political scandals, election coverage, congressional investigations, and government accountability.' },
  finance:   { accentClass: 'border-l-4 border-emerald-600', description: 'Wall Street fraud, market manipulation, investment scams, and financial system investigations.' },
  scams:     { accentClass: 'border-l-4 border-orange-600',  description: 'Consumer fraud, healthcare scams, digital deception, and financial crime exposés.' },
  viral:     { accentClass: 'border-l-4 border-purple-600',  description: 'The stories everyone is talking about — viral moments, social media trends, and cultural flashpoints.' },
  'ai-tech': { accentClass: 'border-l-4 border-sky-600',     description: 'AI developments, tech company investigations, emerging technology, and digital safety.' },
}

export default function CategoryHero({ category, articleCount }: { category: Category; articleCount: number }) {
  const config = CATEGORY_CONFIG[category.id] ?? CATEGORY_CONFIG.politics

  return (
    <section className="relative py-16 bg-surface-800 border-b border-white/8">
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-ink-700 hover:text-ink-300 text-sm mb-7 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          All Categories
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`pl-5 ${config.accentClass}`}
        >
          <div className="text-4xl mb-3">{category.icon}</div>
          <h1 className="text-3xl md:text-4xl font-black text-ink-100 uppercase tracking-tight mb-3">
            {category.name}
          </h1>
          <p className="text-ink-500 text-base max-w-xl mb-4">{config.description}</p>
          <span className="text-xs text-ink-700 px-2.5 py-1 glass rounded border border-white/8">
            {articleCount} articles
          </span>
        </motion.div>
      </div>
    </section>
  )
}
