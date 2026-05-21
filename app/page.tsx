import type { Metadata } from 'next'
import TrendingTicker from '@/components/layout/TrendingTicker'
import HeroSection from '@/components/home/HeroSection'
import TrendingSection from '@/components/home/TrendingSection'
import HotTopicsGrid from '@/components/home/HotTopicsGrid'
import CategoriesSection from '@/components/home/CategoriesSection'
import NewsletterSection from '@/components/blog/NewsletterSection'
import ArticleCard from '@/components/blog/ArticleCard'
import {
  getAllPublishedArticles,
  getFeaturedArticlesDB,
  getTrendingArticlesDB,
  getBreakingNewsDB,
} from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'The American Reveal — Unfiltered US News, Scams & Political Scandals',
}

export default function HomePage() {
  const featured = getFeaturedArticlesDB()
  const trending = getTrendingArticlesDB()
  const breaking = getBreakingNewsDB()
  const allPublished = getAllPublishedArticles()
  const nonTrending = allPublished.filter((a) => !a.trending)
  const latestArticles = allPublished.slice(0, 8)

  return (
    <div>
      {/* Ticker — sits right below fixed navbar (navbar = 8px strip + 56px main = 64px total) */}
      <div className="pt-22">
        <TrendingTicker />
      </div>

      {/* Hero */}
      <HeroSection featured={featured} breaking={breaking} />

      {/* Trending section (light cream) */}
      <TrendingSection articles={trending} />

      {/* Categories explorer (dark navy) */}
      <CategoriesSection />

      {/* Investigations / Hot Topics (light cream) */}
      <HotTopicsGrid articles={nonTrending} />

      {/* Newsletter (red) */}
      <NewsletterSection />

      {/* Latest Articles (white) */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide">
              Latest Stories
            </h2>
            <div className="flex-1 h-px bg-light-border" />
            <span className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">All Sections</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} variant="default" index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
