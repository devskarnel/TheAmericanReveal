'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import SearchModal from '@/components/blog/SearchModal'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Politics', href: '/category/politics' },
  { label: 'Finance', href: '/category/finance' },
  { label: 'Scams', href: '/category/scams' },
  { label: 'Viral', href: '/category/viral' },
  { label: 'AI & Tech', href: '/category/ai-tech' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-shadow duration-200',
          scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.35)]' : ''
        )}
      >
        {/* Top strip */}
        <div className="bg-brand-red">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-3 h-3 text-white animate-pulse-glow" />
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.15em]">Live Coverage</span>
              <span className="hidden sm:block text-white/50 text-[10px] mx-1">|</span>
              <span className="hidden sm:block text-white/70 text-[10px]">Independent Investigative Journalism</span>
            </div>
            <div className="text-white/70 text-[10px] font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <nav className="bg-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">

              {/* Brand */}
              <Link href="/" className="flex items-center gap-3 group shrink-0">
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

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-3.5 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors duration-150',
                      pathname === link.href
                        ? 'text-white'
                        : 'text-ink-500 hover:text-ink-300'
                    )}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-red"
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded text-ink-500 hover:text-white transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>

                <Link
                  href="/admin"
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 border border-brand-red text-brand-red text-[12px] font-bold uppercase tracking-wider hover:bg-brand-red hover:text-white transition-all duration-150"
                >
                  Admin
                </Link>

                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden p-2 rounded text-ink-500 hover:text-white transition-colors"
                  aria-label="Menu"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="md:hidden bg-navy-2 border-t border-white/8 overflow-hidden"
              >
                <div className="px-4 py-3 space-y-0.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors',
                        pathname === link.href
                          ? 'text-white border-l-2 border-brand-red pl-4 bg-white/5'
                          : 'text-ink-500 hover:text-white hover:pl-4 hover:border-l-2 hover:border-white/20'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-2 mt-2 border-t border-white/8">
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-brand-red uppercase tracking-wide"
                    >
                      Admin Panel
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
