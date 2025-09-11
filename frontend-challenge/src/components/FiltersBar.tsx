import React from 'react';
import { SurfaceType } from '../types';
import RatingStars from './RatingStars';

export type Filters = {
  surfaces: SurfaceType[];
  indoorOnly: boolean;
  lightsOnly: boolean;
  minRating: number; // 0-5
};

type Props = {
  value: Filters;
  onChange: (next: Filters) => void;
};

const SURFACES: SurfaceType[] = ['hard', 'clay', 'grass', 'carpet'];

export default function FiltersBar({ value, onChange }: Props) {
  const toggleSurface = (s: SurfaceType) => {
    const active = new Set(value.surfaces);
    if (active.has(s)) active.delete(s); else active.add(s);
    onChange({ ...value, surfaces: Array.from(active) as SurfaceType[] });
  };

  const activeCount = (value.surfaces.length)
    + (value.indoorOnly ? 1 : 0)
    + (value.lightsOnly ? 1 : 0)
    + (value.minRating > 0 ? 1 : 0);

  const clearAll = () => {
    onChange({ surfaces: [], indoorOnly: false, lightsOnly: false, minRating: 0 });
  };

  return (
    <div className="filters">
      <div className="filters-header">
        <span className="muted">Filters</span>
        <div className="filters-actions">
          {activeCount > 0 && <span className="count-pill">{activeCount} selected</span>}
          {activeCount > 0 && (
            <button type="button" className="btn-link" onClick={clearAll} aria-label="Clear all filters">Clear</button>
          )}
        </div>
      </div>
      <div className="chips" role="group" aria-label="Surface">
        {SURFACES.map((s) => (
          <button
            key={s}
            type="button"
            className={`chip ${s} ${value.surfaces.includes(s) ? 'active' : ''}`}
            onClick={() => toggleSurface(s)}
          >
            {value.surfaces.includes(s) ? '✓ ' : ''}{s}
          </button>
        ))}
      </div>
      <div className="chips" role="group" aria-label="Amenities">
        <button
          type="button"
          className={`chip ${value.indoorOnly ? 'active' : ''}`}
          onClick={() => onChange({ ...value, indoorOnly: !value.indoorOnly })}
        >
          {value.indoorOnly ? '✓ ' : ''}indoor
        </button>
        <button
          type="button"
          className={`chip ${value.lightsOnly ? 'active' : ''}`}
          onClick={() => onChange({ ...value, lightsOnly: !value.lightsOnly })}
        >
          {value.lightsOnly ? '✓ ' : ''}lights
        </button>
      </div>
      <div className="rating-filter">
        <span className="muted">min rating</span>
        <RatingStars value={value.minRating} onChange={(v) => onChange({ ...value, minRating: v })} />
      </div>
    </div>
  );
}


