import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — The American Reveal',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-900 pt-22">
      {children}
    </div>
  )
}
