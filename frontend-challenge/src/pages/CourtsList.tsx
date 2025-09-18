// src/pages/CourtsList.tsx
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_COURTS } from '../lib/data'
import { CourtCard } from '../components/CourtCard'
import { SearchBar } from '../components/SearchBar'
import type { Court } from '../lib/types'

type SortKey = 'rating_desc' | 'name_asc'

function filterCourts(q: string, surface: string | null): Court[] {
  const s = q.trim().toLowerCase()
  let list = ALL_COURTS
  if (s) {
    list = list.filter(c =>
      c.name.toLowerCase().includes(s) ||
      c.city.toLowerCase().includes(s) ||
      c.state.toLowerCase().includes(s)
    )
  }
  if (surface && surface !== 'all') {
    list = list.filter(c => c.surface === surface)
  }
  return list
}

const PAGE_SIZE = 20

export function CourtsList() {
  const [q, setQ] = useState('')
  const [surface, setSurface] = useState<string | null>('all')
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [sort, setSort] = useState<SortKey>('rating_desc') // <-- add this

  const filtered = useMemo(() => filterCourts(q, surface), [q, surface])

  // apply sorting before slicing
  const sorted = useMemo(() => {
    const copy = [...filtered]
    if (sort === 'rating_desc') copy.sort((a, b) => b.avgRating - a.avgRating)
    else if (sort === 'name_asc') copy.sort((a, b) => a.name.localeCompare(b.name))
    return copy
  }, [filtered, sort])

  const visible = sorted.slice(0, limit)
  const canLoadMore = visible.length < sorted.length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Courts</h1>
        <Link to="/" className="text-sm text-slate-400">Home</Link>
      </div>

      <SearchBar value={q} onChange={(v)=> { setQ(v); setLimit(PAGE_SIZE) }} />

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {['all','hard','clay','grass'].map(s => (
          <button
            key={s}
            onClick={()=> { setSurface(s); setLimit(PAGE_SIZE) }}
            className={`px-3 py-2 rounded-full text-sm border ${
              surface === s
                ? 'bg-indigo-600 border-indigo-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <p>{filtered.length} result(s)</p>
        <label className="inline-flex items-center gap-2">
          <span>Sort</span>
          <select
            value={sort}
            onChange={e=> { setSort(e.target.value as SortKey); setLimit(PAGE_SIZE) }}
            className="rounded-xl bg-slate-900 border border-slate-800 px-2 py-1"
          >
            <option value="rating_desc">Top rated</option>
            <option value="name_asc">Name (A–Z)</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {visible.map(c => <CourtCard key={c.id} c={c} />)}
      </div>

      {canLoadMore && (
        <div className="pt-2">
          <button
            onClick={() => setLimit(l => l + PAGE_SIZE)}
            className="w-full rounded-2xl px-4 py-3 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
