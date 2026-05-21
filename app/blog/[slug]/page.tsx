import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Eye, ArrowLeft, Calendar } from 'lucide-react'
import { getAllPublishedArticles, getArticleBySlugDB, getRelatedArticlesDB, incrementArticleViews } from '@/lib/db'
import { formatDate, formatViews } from '@/lib/utils'
import ReadingProgress from '@/components/blog/ReadingProgress'
import CommentBox from '@/components/blog/CommentBox'
import ArticleCard from '@/components/blog/ArticleCard'
import ShareButtons from '@/components/blog/ShareButtons'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlugDB(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
      type: 'article',
      publishedTime: article.publishedAt,
    },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  politics: 'bg-red-600',
  finance: 'bg-emerald-600',
  scams: 'bg-orange-500',
  viral: 'bg-purple-600',
  'ai-tech': 'bg-sky-500',
}

const CATEGORY_LABELS: Record<string, string> = {
  politics: 'Politics', finance: 'Finance', scams: 'Scams', viral: 'Viral', 'ai-tech': 'AI & Tech',
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlugDB(slug)
  if (!article) notFound()

  // Track real view — runs on every server render (force-dynamic)
  incrementArticleViews(article.id)

  const related = getRelatedArticlesDB(article)
  const catBg    = CATEGORY_COLORS[article.category] ?? 'bg-brand-red'
  const catLabel = CATEGORY_LABELS[article.category] ?? article.category
  // Use the just-incremented count so the page shows the updated number
  const displayViews = (article.views ?? 0) + 1

  return (
    <>
      <ReadingProgress />

      <article>
        {/* Hero image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden mt-22">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 pb-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <span className={`inline-block category-label font-black text-white mb-3 ${catBg}`}>
                {catLabel}
              </span>
              <h1 className="font-display text-2xl md:text-4xl font-black text-white leading-tight max-w-3xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Back nav */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-red text-sm mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            {/* Meta bar — date, read time, real views only */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b-2 border-brand-red/20">
              <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime} min read
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                  <Eye className="w-3.5 h-3.5" />
                  {formatViews(displayViews)} views
                </span>
              </div>
            </div>

            {/* Excerpt pullquote */}
            <p className="font-display text-lg text-slate-700 italic leading-relaxed mb-8 pl-5 border-l-4 border-brand-red">
              {article.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 hover:border-brand-red hover:text-brand-red transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Article body */}
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Sources */}
            {article.sources && article.sources.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-xs font-black uppercase tracking-[0.18em] text-slate-400 mb-4">Sources</h2>
                <div className="flex flex-col gap-2">
                  {article.sources.map((src, i) => {
                    const host = (() => { try { return new URL(src.url).hostname.replace('www.', '') } catch { return '' } })()
                    const isYT = host.includes('youtube') || host.includes('youtu.be')
                    const isFB = host.includes('facebook') || host.includes('fb.com')
                    const isIG = host.includes('instagram')
                    const isX  = host.includes('twitter') || host.includes('x.com')
                    const badge = isYT ? '▶' : isFB ? 'f' : isIG ? '◈' : isX ? '𝕏' : '↗'
                    return (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 hover:border-brand-red hover:bg-red-50 transition-all group"
                      >
                        <span className={`w-7 h-7 flex items-center justify-center text-xs font-black rounded shrink-0 ${
                          isYT ? 'bg-red-600 text-white' :
                          isFB ? 'bg-blue-600 text-white' :
                          isIG ? 'bg-purple-500 text-white' :
                          isX  ? 'bg-black text-white' :
                          'bg-slate-200 text-slate-600'
                        }`}>{badge}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-brand-red transition-colors truncate">{src.label}</p>
                          <p className="text-xs text-slate-400 truncate">{host}</p>
                        </div>
                        <svg className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-red ml-auto shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <ShareButtons title={article.title} slug={article.slug} />
            </div>

            {/* Comments */}
            <div className="mt-14">
              <CommentBox comments={article.comments} articleId={article.id} />
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="bg-cream py-14 border-t border-light-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide">Related Stories</h2>
                <div className="flex-1 h-px bg-light-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} variant="default" />
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  )
}
