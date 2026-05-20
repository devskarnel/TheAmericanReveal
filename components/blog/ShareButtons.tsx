'use client'

import { useState } from 'react'
import { X, Globe, Link2, Share2, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://theamericanreveal.com/blog/${slug}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareWeb = () => {
    if (navigator.share) {
      navigator.share({ title, url })
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="flex items-center gap-1.5 text-sm text-slate-500">
        <Share2 className="w-4 h-4" /> Share
      </span>
      <button
        onClick={shareX}
        className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all"
      >
        <X className="w-4 h-4" /> X / Twitter
      </button>
      <button
        onClick={shareWeb}
        className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"
      >
        <Globe className="w-4 h-4" /> Share
      </button>
      <button
        onClick={copyLink}
        className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
      >
        {copied ? (
          <><Check className="w-4 h-4 text-green-400" /> Copied!</>
        ) : (
          <><Link2 className="w-4 h-4" /> Copy Link</>
        )}
      </button>
    </div>
  )
}
