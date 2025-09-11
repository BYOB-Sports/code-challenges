import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import CourtCard from '../components/CourtCard';
import { loadCourts } from '../lib/storage';
import type { Court } from '../data/courts';

export default function CourtsListPage() {
  const [q, setQ] = useState('');
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    setCourts(loadCourts());
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return courts;
    return courts.filter(c =>
      c.name.toLowerCase().includes(s) ||
      c.city.toLowerCase().includes(s) ||
      c.surface.toLowerCase().includes(s)
    );
  }, [q, courts]);

  return (
    <>
      <header className="header"><h1 className="h1">Tennis Courts</h1></header>
      <div className="container">
        <SearchBar value={q} onChange={setQ} />
        <div className="spacer" />
        <section className="grid" aria-label="Courts list">
          {filtered.map(c => <CourtCard key={c.id} court={c} />)}
          {!filtered.length && <div className="meta">No courts match your search.</div>}
        </section>
      </div>
    </>
  );
}
