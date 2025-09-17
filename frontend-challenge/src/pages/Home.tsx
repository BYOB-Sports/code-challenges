import React, { useMemo, useState } from 'react'
import { Court } from '../types'
import SearchBar from '../ui/SearchBar'
import FilterBar from '../ui/FilterBar'
import CourtCard from '../ui/CourtCard'

export default function Home({ courts, onSelect }: { courts: Court[], onSelect: (id:string)=>void }){
  const [query, setQuery] = useState('')
  const [activeTags, setActiveTags] = useState<string[]>([])

  const tags = useMemo(()=>{
    const s = new Set<string>()
    courts.forEach(c => c.tags.forEach(t => s.add(t)))
    return Array.from(s)
  }, [courts])

  const filtered = useMemo(()=>{
    const q = query.trim().toLowerCase()
    return courts.filter(c=>{
      if (q && !c.name.toLowerCase().includes(q)) return false
      if (activeTags.length > 0 && !activeTags.every(t => c.tags.includes(t))) return false
      return true
    })
  }, [courts, query, activeTags])

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} placeholder="Search courts by name..." />
      <FilterBar tags={tags} active={activeTags} onToggle={(t)=>{
        setActiveTags(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t])
      }} />
      <div className="mt-4 space-y-3">
        {filtered.map(c => (
          <CourtCard key={c.id} court={c} onSelect={()=>onSelect(c.id)} />
        ))}
        {filtered.length === 0 && <div className="text-center text-gray-500 p-6">No courts found.</div>}
      </div>
    </div>
  )
}
