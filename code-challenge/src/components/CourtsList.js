import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import courts from '../data/courts';

const CourtsList = () => {
  const [query, setQuery] = useState('');
  const [surface, setSurface] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courts.filter(c => {
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
      const matchesSurface = !surface || c.surface === surface;
      return matchesQuery && matchesSurface;
    });
  }, [query, surface]);

  const uniqueSurfaces = useMemo(() => Array.from(new Set(courts.map(c => c.surface))), []);

  return (
    <div className="courts-list" style={{ padding: '16px' }}>
      <h2 style={{ marginBottom: 12 }}>Courts</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search by name or city"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <select value={surface} onChange={e => setSurface(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #ccc' }}>
          <option value="">All</option>
          {uniqueSurfaces.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {filtered.map(court => (
          <li key={court.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <Link to={`/courts/${court.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 600 }}>{court.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{court.city} • {court.surface} • {court.isIndoor ? 'Indoor' : 'Outdoor'}</div>
                <div style={{ marginTop: 6, fontSize: 12 }}>⭐ {court.rating} • {court.hasLights ? 'Lights' : 'No lights'}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourtsList;


