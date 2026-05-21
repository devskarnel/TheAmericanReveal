import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/data/articles'
import { getArticlesByCategoryDB } from '@/lib/db'
import ArticleCard from '@/components/blog/ArticleCard'
import NewsletterSection from '@/components/blog/NewsletterSection'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = CATEGORIES.find((c) => c.id === slug)
  if (!cat) return {}
  return {
    title: `${cat.name} News — The American Reveal`,
    description: `Latest ${cat.name} investigations, breaking news, and analysis.`,
  }
}

const CATEGORY_CONFIG: Record<string, { bg: string; accent: string; label: string }> = {
  politics:  { bg: 'bg-red-600',     accent: 'text-red-600',     label: 'Politics' },
  finance:   { bg: 'bg-emerald-600', accent: 'text-emerald-600', label: 'Finance' },
  scams:     { bg: 'bg-orange-500',  accent: 'text-orange-500',  label: 'Scams' },
  viral:     { bg: 'bg-purple-600',  accent: 'text-purple-600',  label: 'Viral News' },
  'ai-tech': { bg: 'bg-sky-500',     accent: 'text-sky-500',     label: 'AI & Tech' },
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const foundCat = CATEGORIES.find((c) => c.id === slug)
  if (!foundCat) notFound()
  const cat = foundCat as NonNullable<typeof foundCat>

  const articles = getArticlesByCategoryDB(slug)
  const config   = CATEGORY_CONFIG[slug] ?? CATEGORY_CONFIG.politics

  return (
    <div>
      {/* Category hero */}
      <div className="bg-navy pt-22 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end gap-4">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <span className={`category-label font-black text-white mb-2 inline-block ${config.bg}`}>
                Section
              </span>
              <h1 className={`font-display text-4xl font-black uppercase tracking-wide ${config.accent}`}>
                {config.label}
              </h1>
              <p className="text-ink-700 text-sm mt-1">{articles.length} articles · Independent investigations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div className="bg-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No articles in this category yet.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide">
                  All {config.label} Stories
                </h2>
                <span className="text-xs font-bold text-slate-400 px-2.5 py-1 bg-white border border-light-border">
                  {articles.length}
                </span>
                <div className="flex-1 h-px bg-light-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} variant="default" index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  )
}
