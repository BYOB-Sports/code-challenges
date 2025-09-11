import { Link } from "react-router-dom";
import type { Court } from "../data/courts";
import RatingStars from "./RatingStars";
import { MapPin } from "lucide-react";

export default function CourtCard({ court }: { court: Court }) {
  return (
    <Link
      to={`/court/${court.id}`}
      className="block rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition transform active:scale-[0.98] bg-white dark:bg-gray-800"
    >
      {/* Hero image */}
      <div className="relative h-44 sm:h-56 w-full">
        <img
          src={court.images[0]}
          alt={court.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="text-lg font-semibold">{court.name}</h3>
          <p className="text-xs flex items-center gap-1 opacity-90">
            <MapPin className="h-3.5 w-3.5" /> {court.location}
          </p>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/80 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-sm shadow-card">
          <RatingStars value={court.rating} />
          <span className="text-gray-800 dark:text-gray-200 text-xs">
            ({court.reviews.length})
          </span>
        </div>
      </div>

      {/* Info bar */}
      <div className="px-3 py-2 bg-white dark:bg-gray-900 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
        <div className="flex gap-2">
          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
            {court.surface}
          </span>
          {court.indoor && (
            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
              Indoor
            </span>
          )}
          {court.lights && (
            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
              Lights
            </span>
          )}
        </div>
        <span className="font-medium text-brand-green whitespace-nowrap">
          {court.distanceKm} km
        </span>
      </div>
    </Link>
  );
}