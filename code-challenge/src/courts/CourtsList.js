import React, { useMemo, useState } from 'react';
import ShineBorder from '../components/ShineBorder';
import courts from './mockCourts';
import { readReviewsByCourtId } from './storage';

function filterCourts(query, filters) {
  const normalized = query.trim().toLowerCase();
  let list = courts;
  if (normalized) {
    list = list.filter((c) => (
      c.name.toLowerCase().includes(normalized) ||
      c.city.toLowerCase().includes(normalized) ||
      c.state.toLowerCase().includes(normalized) ||
      c.surface.toLowerCase().includes(normalized)
    ));
  }
  if (filters.surface && filters.surface !== 'Any') {
    list = list.filter((c) => c.surface === filters.surface);
  }
  if (filters.indoor && filters.indoor !== 'any') {
    list = list.filter((c) => (filters.indoor === 'indoor' ? c.isIndoor : !c.isIndoor));
  }
  if (filters.lights && filters.lights !== 'any') {
    list = list.filter((c) => (filters.lights === 'lights' ? c.hasLights : !c.hasLights));
  }
  if (typeof filters.minCourts === 'number' && filters.minCourts > 0) {
    list = list.filter((c) => c.courtsCount >= filters.minCourts);
  }
  return list;
}

const courtImages = [
  'https://plus.unsplash.com/premium_photo-1663039984787-b11d7240f592?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://unsplash.com/photos/iiWhddT4SB4/download?force=true&w=1200',
  'https://unsplash.com/photos/pSr9S6po7Ps/download?force=true&w=1200',
  'https://unsplash.com/photos/yoIt3Wxe0sI/download?force=true&w=1200',
  'https://unsplash.com/photos/otO3MXSXe4w/download?force=true&w=1200'
];

function Icon({ name }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', className: 'icon' };
  if (name === 'bulb') {
    return (
      <svg {...common}>
        <path d="M9 18h6M12 2c3.314 0 6 2.686 6 6 0 2.094-.974 3.472-2.136 4.658-.803.822-1.364 1.812-1.63 2.918H9.766c-.266-1.106-.827-2.096-1.63-2.918C6.974 11.472 6 10.094 6 8c0-3.314 2.686-6 6-6Z" />
      </svg>
    );
  }
  if (name === 'bulb-off') {
    return (
      <svg {...common}>
        <path d="M9 18h6" />
        <path d="M3 3l18 18" />
        <path d="M12 2c3.314 0 6 2.686 6 6 0 2.094-.974 3.472-2.136 4.658-.803.822-1.364 1.812-1.63 2.918H9.766c-.266-1.106-.827-2.096-1.63-2.918C6.974 11.472 6 10.094 6 8c0-3.314 2.686-6 6-6Z" />
      </svg>
    );
  }
  if (name === 'indoor') {
    return (
      <svg {...common}>
        <path d="M3 10l9-6 9 6v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z" />
        <path d="M9 20v-6a3 3 0 1 1 6 0v6" />
      </svg>
    );
  }
  if (name === 'outdoor') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    );
  }
  if (name === 'courts') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="7" height="14" rx="1" />
        <rect x="14" y="5" width="7" height="14" rx="1" />
        <path d="M6.5 5v14M17.5 5v14" />
      </svg>
    );
  }
  if (name === 'pin') {
    return (
      <svg {...common}>
        <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  if (name === 'filter') {
    return (
      <svg {...common}>
        <path d="M3 5h18M6 12h12M10 19h4" />
      </svg>
    );
  }
  return null;
}

function StarIcon({ filled, half, idSuffix }) {
  const gradId = `starGrad-${idSuffix}`;
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="icon">
      {half && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 3.5l2.944 5.964 6.586.957-4.765 4.646 1.125 6.56L12 18.934 6.11 21.627l1.125-6.56L2.47 10.42l6.586-.957L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill={filled ? 'currentColor' : half ? `url(#${gradId})` : 'none'}
      />
    </svg>
  );
}

function getCourtStats(courtId) {
  const reviews = readReviewsByCourtId(courtId);
  if (!reviews.length) return { avg: null, count: 0 };
  const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
  const avg = sum / reviews.length;
  return { avg, count: reviews.length };
}

function sortCourts(list, sortBy) {
  const copy = list.slice();
  if (sortBy === 'rating-high' || sortBy === 'rating-low') {
    copy.sort((a, b) => {
      const sa = getCourtStats(a.id).avg || 0;
      const sb = getCourtStats(b.id).avg || 0;
      return sortBy === 'rating-high' ? sb - sa : sa - sb;
    });
  } else if (sortBy === 'courts-high') {
    copy.sort((a, b) => b.courtsCount - a.courtsCount);
  } else if (sortBy === 'courts-low') {
    copy.sort((a, b) => a.courtsCount - b.courtsCount);
  } else {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  return copy;
}

export default function CourtsList({ onSelect }) {
  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ surface: 'Any', indoor: 'any', lights: 'any', minCourts: 0 });
  const [sortBy, setSortBy] = useState('alpha');
  const filtered = useMemo(() => filterCourts(query, filters), [query, filters]);
  const sorted = useMemo(() => sortCourts(filtered, sortBy), [filtered, sortBy]);

  return (
    <div className="courts-list">
      <div className="header">
        <h1>Tennis Courts</h1>
        <p className="subtitle">Find and review courts near you</p>
      </div>
      <div className="search">
        <div className="shine-container">
          <ShineBorder borderWidth={2} duration={24} />
          <input
            type="text"
            inputMode="search"
            placeholder="Search by name, city, state, or surface"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="toolbar">
        <div className="left">
          <div className="sort-select-container"> <span>Sort: </span></div>
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort courts">
            <option value="alpha">A → Z</option>
            <option value="rating-high">Rating: High</option>
            <option value="rating-low">Rating: Low</option>
            <option value="courts-high">Courts count: High</option>
            <option value="courts-low">Courts count: Low</option>
          </select>
        </div>
        <div className="right">
          <button className="filter-btn" aria-label="Open filters" onClick={() => setIsFilterOpen(true)}>
            <Icon name="filter" />
          </button>
        </div>
      </div>
      <ul className="cards" aria-label="courts">
        {sorted.map((c) => (
          <li key={c.id} className="card" onClick={() => onSelect && onSelect(c.id)}>
            <div className="card-image">
              <img
                src={courtImages[(Number(c.id) - 1) % courtImages.length]}
                alt={`${c.name}`}
                loading="lazy"
              />
            </div>
            <div className="card-content">
              <div className="card-header">
                <h2 className="card-title name-only">{c.name}</h2>
                <span className="pill">{c.surface}</span>
              </div>
              <div className="row middle">
                <span className="location"><Icon name="pin" /> {c.city}, {c.state}</span>
              </div>
              <div className="row bottom">
                {(() => {
                  const { avg, count } = getCourtStats(c.id);
                  const value = avg || 0;
                  const full = Math.floor(value);
                  const hasHalf = value - full >= 0.25 && value - full < 0.75 ? 1 : 0; // treat ~.5 as half
                  const roundedUp = value - full >= 0.75 ? 1 : 0;
                  return (
                    <div className="rating" aria-label="Average rating">
                      <span className="stars">
                        {[1,2,3,4,5].map((i) => {
                          const idx = i - 1;
                          const filled = idx < full || (idx === full && !hasHalf && roundedUp === 1);
                          const half = idx === full && hasHalf === 1;
                          return <StarIcon key={i} filled={filled} half={half} idSuffix={`${c.id}-${i}`} />;
                        })}
                      </span>
                      <span className="rating-text">({avg ? avg.toFixed(1) : '—'}) {count}</span>
                    </div>
                  );
                })()}
                <div className="features-right">
                  <span className="meta-count icon-tip" data-tip={`${c.courtsCount} courts`} aria-label={`${c.courtsCount} courts`}><Icon name="courts" /> {c.courtsCount}</span>
                  <span className={`icon-tip ${c.isIndoor ? 'yes' : 'no'}`} data-tip={c.isIndoor ? 'Indoor' : 'Outdoor'} aria-label={c.isIndoor ? 'Indoor' : 'Outdoor'}>
                    <Icon name={c.isIndoor ? 'indoor' : 'outdoor'} />
                  </span>
                  <span className={`icon-tip ${c.hasLights ? 'yes' : 'no'}`} data-tip={c.hasLights ? 'Lights' : 'No Lights'} aria-label={c.hasLights ? 'Lights' : 'No Lights'}>
                    <Icon name={c.hasLights ? 'bulb' : 'bulb-off'} />
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p className="empty">No courts match your search.</p>}
      {isFilterOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Filter courts">
          <div className="modal-card">
            <div className="modal-head">
              <h3>Filters</h3>
              <button className="close" onClick={() => setIsFilterOpen(false)} aria-label="Close filters">×</button>
            </div>
            <div className="modal-body">
              <label className="field">
                <span>Surface</span>
                <select value={filters.surface} onChange={(e) => setFilters((f) => ({ ...f, surface: e.target.value }))}>
                  {['Any','Hard','Clay','Grass'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Court type</span>
                <div className="seg">
                  {[
                    { v: 'any', label: 'Any' },
                    { v: 'indoor', label: 'Indoor' },
                    { v: 'outdoor', label: 'Outdoor' }
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      className={`seg-btn ${filters.indoor === o.v ? 'active' : ''}`}
                      onClick={() => setFilters((f) => ({ ...f, indoor: o.v }))}
                    >{o.label}</button>
                  ))}
                </div>
              </label>
              <label className="field">
                <span>Lights</span>
                <div className="seg">
                  {[
                    { v: 'any', label: 'Any' },
                    { v: 'lights', label: 'Lights' },
                    { v: 'no-lights', label: 'No lights' }
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      className={`seg-btn ${filters.lights === o.v ? 'active' : ''}`}
                      onClick={() => setFilters((f) => ({ ...f, lights: o.v }))}
                    >{o.label}</button>
                  ))}
                </div>
              </label>
              <label className="field">
                <span>Min courts</span>
                <input type="number" min="0" value={filters.minCourts}
                  onChange={(e) => setFilters((f) => ({ ...f, minCourts: Number(e.target.value) || 0 }))} />
              </label>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={() => setFilters({ surface: 'Any', indoor: 'any', lights: 'any', minCourts: 0 })}>Reset</button>
              <button className="btn btn-primary" onClick={() => setIsFilterOpen(false)}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


