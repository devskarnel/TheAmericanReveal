import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye, ArrowRight, AlertTriangle } from 'lucide-react'
import { cn, timeAgo, formatViews } from '@/lib/utils'
import type { Article } from '@/types'

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  politics:  { bg: 'bg-red-600',     text: 'text-red-600',     border: 'border-red-600' },
  finance:   { bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600' },
  scams:     { bg: 'bg-orange-500',  text: 'text-orange-500',  border: 'border-orange-500' },
  viral:     { bg: 'bg-purple-600',  text: 'text-purple-600',  border: 'border-purple-600' },
  'ai-tech': { bg: 'bg-sky-500',     text: 'text-sky-500',     border: 'border-sky-500' },
}

const CATEGORY_LABELS: Record<string, string> = {
  politics: 'Politics',
  finance: 'Finance',
  scams: 'Scams',
  viral: 'Viral',
  'ai-tech': 'AI & Tech',
}

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'featured' | 'compact' | 'horizontal'
  index?: number
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const cat = CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.politics
  const catLabel = CATEGORY_LABELS[article.category] ?? article.category

  /* ── HORIZONTAL (dark bg sections) ── */
  if (variant === 'horizontal') {
    return (
      <Link
        href={`/blog/${article.slug}`}
        className="group flex gap-3 p-3.5 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/14 transition-all duration-150"
      >
        <div className="relative w-20 h-16 shrink-0 overflow-hidden">
          <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={cn('category-label font-bold', cat.text)}>{catLabel}</span>
          <h3 className="text-[13px] font-bold text-ink-300 mt-1 line-clamp-2 group-hover:text-white transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="text-[11px] text-ink-700 mt-1">{timeAgo(article.publishedAt)}</p>
        </div>
      </Link>
    )
  }

  /* ── COMPACT (numbered sidebar) ── */
  if (variant === 'compact') {
    return (
      <Link
        href={`/blog/${article.slug}`}
        className="group flex items-start gap-3 py-3 border-b border-white/6 last:border-0 hover:pl-1 transition-all duration-150"
      >
        <span className="shrink-0 mt-0.5 text-brand-red font-mono text-xs font-bold w-5">
          {String((article as Article & { _index?: number })._index ?? 1).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <h3 className="text-[13px] font-semibold text-ink-300 line-clamp-2 group-hover:text-white transition-colors leading-snug">
            {article.title}
          </h3>
          <span className="text-[11px] text-ink-700 mt-0.5 block">{timeAgo(article.publishedAt)}</span>
        </div>
      </Link>
    )
  }

  /* ── FEATURED (large hero card, dark bg) ── */
  if (variant === 'featured') {
    return (
      <div className="group relative overflow-hidden cursor-pointer">
        <Link href={`/blog/${article.slug}`}>
          <div className="relative h-80 md:h-105 overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              priority
              className="object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/50 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                {article.breaking && (
                  <span className="badge-breaking">
                    <AlertTriangle className="w-2.5 h-2.5" /> Breaking
                  </span>
                )}
                <span className={cn('category-label font-black', cat.bg, 'text-white px-2 py-0.5')}>
                  {catLabel}
                </span>
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-ink-100 transition-colors line-clamp-3">
                {article.title}
              </h2>
              <p className="text-ink-500 text-[13px] mb-3 line-clamp-2 max-w-xl">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-ink-700">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readingTime} min</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatViews(article.views ?? 0)}</span>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] text-ink-500 group-hover:text-white group-hover:gap-2 transition-all">
                  Read Story <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  /* ── DEFAULT (light section cards) ── */
  return (
    <div className="group">
      <Link
        href={`/blog/${article.slug}`}
        className="block h-full bg-white border border-light-border hover:shadow-[0_6px_24px_rgba(11,27,48,0.10)] transition-all duration-200 overflow-hidden"
      >
        {/* Category top border */}
        <div className={cn('h-1', cat.bg)} />

        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          {article.breaking && (
            <div className="absolute top-3 left-3">
              <span className="badge-breaking text-[9px]">
                <AlertTriangle className="w-2.5 h-2.5" /> Breaking
              </span>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <span className={cn('category-label font-black text-white', cat.bg)}>
              {catLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display font-bold text-slate-900 text-[14px] leading-snug mb-2 line-clamp-2 group-hover:text-brand-red transition-colors">
            {article.title}
          </h3>
          <p className="text-slate-500 text-[12px] line-clamp-2 mb-3">{article.excerpt}</p>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-light-border">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readingTime}m</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatViews(article.views ?? 0)}</span>
            </div>
            <span>{timeAgo(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
