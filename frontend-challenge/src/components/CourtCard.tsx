import React from 'react'
import { Link } from 'react-router-dom'
import { RatingStars } from './RatingStars'
import type { Court } from '../lib/types'

export function CourtCard({ c }: { c: Court }) {
  return (
    <article className="card overflow-hidden">
      <Link to={`/court/${c.id}`} className="block -mx-4 -mt-4 mb-3">
        <img
          src={c.img}
          alt={`Photo of ${c.name}`}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold">{c.name}</h3>
          <p className="text-sm text-slate-400">{c.city}, {c.state}</p>
        </div>
        <div className="shrink-0">
          <RatingStars value={c.avgRating} />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="rounded-full bg-slate-800 px-2 py-1">{c.surface}</span>
        <span className="rounded-full bg-slate-800 px-2 py-1">{c.indoor ? 'indoor' : 'outdoor'}</span>
        {c.lights && <span className="rounded-full bg-slate-800 px-2 py-1">lights</span>}
        <span className="rounded-full bg-slate-800 px-2 py-1">{c.courts} courts</span>
      </div>
      <div className="mt-3">
        <Link
          to={`/court/${c.id}`}
          className="inline-flex items-center justify-center rounded-2xl px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View details
        </Link>
      </div>
    </article>
  )
}
