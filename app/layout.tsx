import type { Metadata } from 'next'
import { Playfair_Display, Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'The American Reveal — Unfiltered US News, Scams & Political Scandals',
    template: '%s | The American Reveal',
  },
  description:
    "Independent investigative journalism exposing US political corruption, Wall Street fraud, consumer scams, and viral news — the stories the mainstream won't touch.",
  keywords: ['US News', 'Political Scandals', 'Market Scams', 'Breaking News', 'Investigations', 'American Politics', 'Consumer Fraud'],
  authors: [{ name: 'The American Reveal Editorial Team' }],
  creator: 'The American Reveal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'The American Reveal',
    title: 'The American Reveal — Unfiltered US News',
    description: 'Independent investigative journalism covering US political corruption, financial fraud, and the stories the mainstream media won\'t touch.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The American Reveal',
    creator: '@theamericanreveal',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
