import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CourtCard from "../components/CourtCard";


type Review = { user: string; comment: string; rating: number }
type Court = { id: number; name: string; location: string; rating: number; reviews: Review[]; image?: string }

const PAGE_SIZE = 12

export default function CourtsList() {
  const [all, setAll] = useState<Court[]>([])
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/courts.json').then(r => r.json()).then((data: Court[]) => {
      setAll(data)
    })
  }, [])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return all
    return all.filter(c =>
      c.name.toLowerCase().includes(query) ||
      c.location.toLowerCase().includes(query)
    )
  }, [q, all])

  const visible = filtered.slice(0, page * PAGE_SIZE)

  return (
    <>
      <Header />
      <main className="container-default py-4">
        <SearchBar value={q} onChange={setQ} />
        <div className="grid grid-cols-1 gap-3 mt-4">
          {visible.map(c => (
            <Link key={c.id} to={`/court/${c.id}`}>
              <CourtCard court={c} />
            </Link>
          ))}
        </div>

        {visible.length < filtered.length && (
          <button
            className="mt-4 mb-10 w-full rounded-2xl border py-3 font-medium active:scale-[0.997]"
            onClick={() => setPage(p => p + 1)}
          >
            Load more
          </button>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-neutral-500 mt-8">No courts found.</p>
        )}
      </main>
    </>
  )
}
