'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/data/articles'

const CATEGORY_CONFIG: Record<string, { accent: string; bg: string; hover: string }> = {
  politics:  { accent: 'text-red-400',    bg: 'bg-red-500/10',    hover: 'hover:bg-red-500/15 hover:border-red-500/30' },
  finance:   { accent: 'text-emerald-400',bg: 'bg-emerald-500/10',hover: 'hover:bg-emerald-500/15 hover:border-emerald-500/30' },
  scams:     { accent: 'text-orange-400', bg: 'bg-orange-500/10', hover: 'hover:bg-orange-500/15 hover:border-orange-500/30' },
  viral:     { accent: 'text-purple-400', bg: 'bg-purple-500/10', hover: 'hover:bg-purple-500/15 hover:border-purple-500/30' },
  'ai-tech': { accent: 'text-sky-400',    bg: 'bg-sky-500/10',    hover: 'hover:bg-sky-500/15 hover:border-sky-500/30' },
}

export default function CategoriesSection() {
  return (
    <section className="bg-navy py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xl font-black text-white uppercase tracking-wide">Explore Topics</h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat, i) => {
            const config = CATEGORY_CONFIG[cat.id] ?? CATEGORY_CONFIG.politics
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  href={`/category/${cat.id}`}
                  className={`group block p-5 border border-white/8 ${config.bg} ${config.hover} transition-all duration-200`}
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className={`font-black text-sm uppercase tracking-wide ${config.accent} mb-1`}>
                    {cat.name}
                  </h3>
                  <p className="text-ink-700 text-xs">{cat.count} articles</p>
                  <div className={`flex items-center gap-1 mt-3 text-xs ${config.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Explore <ArrowRight className="w-3 h-3" />
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
