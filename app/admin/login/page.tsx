'use client'

import { useState, useTransition, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Lock, User, Eye, EyeOff, ArrowRight, AlertTriangle } from 'lucide-react'
import { loginAction } from '@/app/actions/auth'

function LoginForm() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/admin'

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const data = new FormData(e.currentTarget)
    data.set('from', from)
    startTransition(async () => {
      const result = await loginAction(data)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-surface-900">
      <div className="absolute inset-0 cyber-grid opacity-40" />

      <div className="relative w-full max-w-sm">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-brand-red mb-5">
            <Lock className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold text-ink-100 tracking-tight uppercase">
            The American Reveal
          </h1>
          <p className="text-ink-500 text-sm mt-1">Admin Access — Authorized Personnel Only</p>
        </div>

        <div className="glass-strong rounded-xl p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-900/20 border border-red-700/40 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-700" />
                <input
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-surface-700 border border-white/8 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-brand-red/50 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-700" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-surface-700 border border-white/8 text-ink-100 placeholder-ink-700 focus:outline-none focus:border-brand-red/50 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-700 hover:text-ink-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-brand-red text-white font-semibold text-sm hover:bg-brand-red-light transition-colors disabled:opacity-60 mt-1"
            >
              {isPending ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-ink-700 text-[11px] mt-6 uppercase tracking-widest">
          Secured · The American Reveal CMS
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-surface-900">
        <div className="w-6 h-6 border-2 border-white/20 border-t-brand-red rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
