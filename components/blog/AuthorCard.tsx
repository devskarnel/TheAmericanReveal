import Image from 'next/image'
import { X, BookOpen } from 'lucide-react'
import type { Author } from '@/types'

export default function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 ring-2 ring-white/10">
          <Image src={author.avatar} alt={author.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-ink-100 text-lg">{author.name}</h3>
          <p className="text-accent text-sm font-medium mb-2">{author.role}</p>
          <p className="text-ink-500 text-sm leading-relaxed">{author.bio}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-ink-500 text-sm">
          <BookOpen className="w-4 h-4" />
          <span>{author.articles} articles</span>
        </div>
        {author.twitter && (
          <a
            href={`https://twitter.com/${author.twitter.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-ink-500 hover:text-accent text-sm transition-colors"
          >
            <X className="w-4 h-4" />
            <span>{author.twitter}</span>
          </a>
        )}
      </div>
    </div>
  )
}
