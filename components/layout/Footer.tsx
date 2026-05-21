import Link from 'next/link'
import { X, Globe, Rss, Mail, ArrowRight, Radio } from 'lucide-react'
import { CATEGORIES } from '@/data/articles'

const footerLinks = {
  Categories: CATEGORIES.map((c) => ({ label: c.name, href: `/category/${c.id}` })),
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Advertise', href: '/advertise' },
  ],
  Topics: [
    { label: 'Breaking News', href: '/?filter=breaking' },
    { label: 'Trending Now', href: '/?filter=trending' },
    { label: 'Investigations', href: '/?filter=investigations' },
    { label: 'Analysis', href: '/?filter=analysis' },
    { label: 'Opinion', href: '/?filter=opinion' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy text-ink-300">
      {/* Top border */}
      <div className="h-1 bg-brand-red" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="flex flex-col gap-0.5">
                <span className="w-7 h-1 bg-brand-red rounded-sm block" />
                <span className="w-5 h-1 bg-brand-red/60 rounded-sm block" />
                <span className="w-3 h-1 bg-brand-red/30 rounded-sm block" />
              </div>
              <div className="leading-none">
                <span className="block text-brand-red text-[10px] font-bold uppercase tracking-[0.22em]">The American</span>
                <span className="block text-white text-[17px] font-black uppercase tracking-[0.08em] font-display">Reveal</span>
              </div>
            </Link>

            <p className="text-ink-700 text-sm leading-relaxed max-w-xs mb-6">
              Independent investigative journalism exposing political corruption, financial fraud, and consumer scams — the stories the mainstream media won&apos;t touch.
            </p>

            <div className="flex items-center gap-2.5 mb-6">
              {[
                { icon: X, href: '#', label: 'X / Twitter' },
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Rss, href: '#', label: 'RSS Feed' },
                { icon: Mail, href: '#', label: 'Email Newsletter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-ink-700 hover:text-white hover:border-brand-red hover:bg-brand-red/10 transition-all duration-150"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <Radio className="w-3 h-3 text-brand-red animate-pulse-glow" />
              <span className="text-ink-700">Live coverage 24/7</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white text-[11px] font-black uppercase tracking-[0.18em] mb-5 pb-2 border-b border-white/10">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-1.5 text-sm text-ink-700 hover:text-white transition-colors duration-150"
                    >
                      <ArrowRight className="w-3 h-3 text-brand-red opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-700 text-xs">
            © 2026 The American Reveal. All rights reserved. Independent journalism, always.
          </p>
          <div className="flex items-center gap-4 text-xs text-ink-700">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/admin" className="hover:text-brand-red transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
