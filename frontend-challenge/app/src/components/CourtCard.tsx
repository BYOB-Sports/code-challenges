import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Layers, Grid3x3, Bookmark } from 'lucide-react';
import type { Court } from '../data/mockData';

type CourtCardProps = {
  court: Court;
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
    </svg>
  );
}

function RatingStars({ value }: { value: number }) {
  const percentage = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <div className="relative inline-block" aria-label={`Rated ${value} out of 5`}>
      <div className="flex text-gray-300">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} className="h-5 w-5" />
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${percentage}%` }}>
        <div className="flex text-yellow-400">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} className="h-5 w-5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CourtCard({ court }: CourtCardProps) {
  return (
    <Link
      to={`/court/${court.id}`}
      className="block w-full text-left overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] backdrop-blur-sm shadow-sm transition-transform transition-shadow duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`${court.name} in ${court.location}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/30">
        <img
          src={court.imageUrl}
          alt={`${court.name} court view`}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.onerror = null;
            target.src = `/images/outdoor-tennis-court-facility-in-the-evening.jpg`;
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <button
          aria-label="Save court"
          className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          type="button"
          tabIndex={-1}
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{court.name}</h3>
        <p className="mt-0.5 text-xs text-muted">{court.location}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-slate-200">
          <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-yellow-400" /> {court.rating.toFixed(1)}</span>
          <span className="inline-flex items-center gap-1.5"><Layers className="h-4 w-4 text-primary" /> {court.surface}</span>
          <span className="inline-flex items-center gap-1.5"><Grid3x3 className="h-4 w-4 text-fuchsia-400" /> {court.numberOfCourts} Courts</span>
        </div>
      </div>
    </Link>
  );
}


