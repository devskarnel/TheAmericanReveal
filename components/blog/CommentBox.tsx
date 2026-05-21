'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, MessageSquare, Send } from 'lucide-react'
import { timeAgo } from '@/lib/utils'
import type { Comment } from '@/types'

interface CommentBoxProps {
  comments: Comment[]
  articleId: string
}

export default function CommentBox({ comments, articleId }: CommentBoxProps) {
  const [localComments, setLocalComments] = useState(comments)
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [likes, setLikes] = useState<Set<string>>(new Set())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !content.trim()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 600))
    setLocalComments((prev) => [
      {
        id: `local-${Date.now()}`,
        author: author.trim(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`,
        content: content.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
      },
      ...prev,
    ])
    setContent('')
    setSubmitting(false)
  }

  const toggleLike = (id: string) => {
    setLikes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-5 h-5 text-accent" />
        <h2 className="text-xl font-bold text-ink-100">
          {localComments.length} Comments
        </h2>
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-ink-300 uppercase tracking-wider">Leave a Comment</h3>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-accent/50 transition-colors text-sm"
        />
        <textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-accent/50 transition-colors text-sm resize-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-red text-white text-sm font-semibold hover:bg-brand-red-light transition-colors disabled:opacity-60"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" /> Post Comment
            </>
          )}
        </button>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {localComments.map((comment, i) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-start gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
                <Image src={comment.avatar} alt={comment.author} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-ink-300 text-sm">{comment.author}</span>
                  <span className="text-xs text-ink-500">{timeAgo(comment.createdAt)}</span>
                </div>
                <p className="text-ink-300 text-sm leading-relaxed">{comment.content}</p>
                <button
                  onClick={() => toggleLike(comment.id)}
                  className={`flex items-center gap-1.5 mt-3 text-xs transition-colors ${
                    likes.has(comment.id) ? 'text-red-400' : 'text-ink-500 hover:text-red-400'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" fill={likes.has(comment.id) ? 'currentColor' : 'none'} />
                  {comment.likes + (likes.has(comment.id) ? 1 : 0)}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
