export function ArticleCardSkeleton() {
  return (
    <div className="rounded-2xl glass overflow-hidden animate-pulse">
      <div className="h-48 skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton rounded w-16" />
        <div className="h-4 skeleton rounded" />
        <div className="h-4 skeleton rounded w-4/5" />
        <div className="h-3 skeleton rounded w-2/3" />
      </div>
    </div>
  )
}

export function FeaturedSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden h-[480px] relative">
      <div className="absolute inset-0 skeleton" />
    </div>
  )
}

export function ArticleDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 skeleton rounded w-3/4" />
      <div className="h-4 skeleton rounded w-1/3" />
      <div className="h-96 skeleton rounded-2xl" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 skeleton rounded" style={{ width: `${85 + Math.random() * 15}%` }} />
        ))}
      </div>
    </div>
  )
}
