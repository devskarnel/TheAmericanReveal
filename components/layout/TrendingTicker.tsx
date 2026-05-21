'use client'

import { Radio } from 'lucide-react'
import { TICKER_ITEMS } from '@/data/articles'

export default function TrendingTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="w-full bg-navy-2 border-b border-white/8 overflow-hidden">
      <div className="flex items-center h-9">
        {/* Live label */}
        <div className="shrink-0 flex items-center gap-2 px-4 h-full bg-brand-red z-10">
          <Radio className="w-3 h-3 text-white animate-pulse-glow" />
          <span className="text-white text-[10px] font-black uppercase tracking-[0.15em]">Breaking</span>
        </div>

        {/* Ticker */}
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {items.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-[11px] font-medium text-ink-500 px-6 border-r border-white/6 last:border-0 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
