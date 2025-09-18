import React from 'react'

export function RatingStars({ value }: { value: number }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  const items: ('full'|'half'|'empty')[] = [
    ...Array(full).fill('full'),
    ...(half ? ['half'] : []),
    ...Array(empty).fill('empty'),
  ]
  return (
    <div className="flex items-center" aria-label={`Rating ${value} out of 5`}>
      {items.map((t, i) => (
        <span key={i} className="inline-block text-lg leading-none mr-0.5" aria-hidden>
          {t === 'full' ? '★' : t === 'half' ? '☆' : '✩'}
        </span>
      ))}
      <span className="ml-2 text-sm text-slate-400">{value.toFixed(1)}</span>
    </div>
  )
}
