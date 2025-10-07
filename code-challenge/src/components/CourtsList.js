import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import courts from '../api/courts';

const CourtsList = () => {
  const [query, setQuery] = useState('');
  const [surface, setSurface] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courts.filter(c => {
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
      const matchesSurface = !surface || c.surface === surface;
      return matchesQuery && matchesSurface;
    });
  }, [query, surface]);

  const uniqueSurfaces = useMemo(() => Array.from(new Set(courts.map(c => c.surface))), []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="courts-list" style={{ padding: '16px' }}>
      <h2 style={{ marginBottom: 12 }}>Courts</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12, width: '100%', maxWidth: '100vw', padding: '0 4px' }}>
        <input
          type="text"
          placeholder="Search by name or city"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ width: '100%', maxWidth: 'calc(100vw - 32px)', padding: 10, borderRadius: 8, border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
        />
        <div ref={dropdownRef} style={{ position: 'relative', width: '100%', maxWidth: 'calc(100vw - 32px)' }}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 8,
              border: '1px solid #ccc',
              boxSizing: 'border-box',
              fontSize: '16px',
              textAlign: 'left',
              backgroundColor: 'white',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{surface || 'All surfaces'}</span>
            <span style={{ fontSize: '12px' }}>{isDropdownOpen ? '▲' : '▼'}</span>
          </button>
          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: 8,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              <button
                type="button"
                onClick={() => {
                  setSurface('');
                  setIsDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: 10,
                  border: 'none',
                  backgroundColor: surface === '' ? '#f3f4f6' : 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                All surfaces
              </button>
              {uniqueSurfaces.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSurface(s);
                    setIsDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: 10,
                    border: 'none',
                    backgroundColor: surface === s ? '#f3f4f6' : 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '16px',
                    borderTop: '1px solid #e5e7eb'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
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


