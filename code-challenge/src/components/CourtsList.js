import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourts } from '../api/courtsApi';

const CourtsList = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getCourts();
      setCourts(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courts;
    return courts.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.surface.toLowerCase().includes(q)
    );
  }, [courts, query]);

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Tennis Courts</h1>
        <input
          className="search"
          placeholder="Search by name, city, or surface"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search courts"
        />
      </header>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : (
        <ul className="cards">
          {filtered.map(court => (
            <li key={court.id} className="card">
              <Link to={`/courts/${court.id}`} className="cardLink">
                <img
                  className="thumbImg"
                  src={court.imageUrl}
                  alt={`${court.name} court`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml;utf8,' +
                      encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#475569" font-family="Arial" font-size="24">Image unavailable</text></svg>`
                      );
                  }}
                />
                <div className="cardBody">
                  <h2 className="cardTitle">{court.name}</h2>
                  <p className="cardMeta">{court.location} • {court.surface}</p>
                  <p className="rating">
                    <span className="stars" aria-hidden="true">⭐ {court.averageRating.toFixed(1)}</span>
                    <span className="muted"> ({court.reviewsCount})</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourtsList;


