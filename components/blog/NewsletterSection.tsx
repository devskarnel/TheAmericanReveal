'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, ArrowRight, Shield, Zap } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="bg-brand-red py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-white/80" />
              <span className="text-white/70 text-[11px] font-bold uppercase tracking-[0.18em]">Free Daily Briefing</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight mb-3">
              Stories They Don&apos;t Want You to Read
            </h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Join 180,000+ Americans getting our daily briefing — political exposés, financial fraud alerts, and viral news delivered before the mainstream picks it up.
            </p>

            <div className="flex items-center gap-6 mt-6">
              {[
                { icon: Shield, text: 'No spam, ever' },
                { icon: Zap, text: 'Daily delivery' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/70 text-[12px]">
                  <Icon className="w-3.5 h-3.5" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-5 bg-white/10 border border-white/20 text-white"
              >
                <CheckCircle className="w-6 h-6 text-white shrink-0" />
                <div>
                  <p className="font-bold text-sm">You&apos;re in!</p>
                  <p className="text-white/70 text-xs">Check your inbox to confirm. First briefing arrives tomorrow.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3.5 bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50 text-sm transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-brand-red font-black text-sm uppercase tracking-wider hover:bg-white/90 transition-colors disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-brand-red/30 border-t-brand-red rounded-full animate-spin" />
                  ) : (
                    <>Subscribe Free <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
                <p className="text-white/50 text-[11px] text-center">
                  Unsubscribe anytime. No spam. 180,000+ readers.
                </p>
              </form>
            )}

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
              {[
                { value: '180K+', label: 'Subscribers' },
                { value: 'Daily', label: 'Briefings' },
                { value: '100%', label: 'Free' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="text-[11px] text-white/60 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
