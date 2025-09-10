// CourtCard.tsx
import { Link } from "react-router-dom";
import type { Court } from "../utils/types";

export default function CourtCard({ court }: { court: Court }) {
  return (
    <Link to={`/court/${court.id}`} state={{ court }} className="block">
      <article
        role="button"
        className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-lg md:grid-cols-[360px_1fr_auto]"
      >
        <figure className="relative aspect-[16/10] w-full md:w-[360px] md:aspect-auto">
          <img
            src={court.imageUrl}
            alt={court.title}
            className="h-full w-full object-cover md:h-full md:w-[360px]"
            loading="lazy"
          />
        </figure>

        {/* Content */}
        <div className="flex min-w-0 flex-col gap-3 px-5 py-5 md:px-8 md:py-6">
          <h3 className="truncate text-2xl font-extrabold text-neutral-900">
            {court.title}
          </h3>

          <p className="truncate text-lg text-neutral-500">{court.address}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-neutral-700">
            <span className="text-lg font-semibold">{court.courtCount}</span>
            <span className="text-lg font-semibold">{court.setting}</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-700">
            <span className="text-xl font-semibold">
              {court.rating.toFixed(1)}
            </span>
            <span className="text-lg text-neutral-400">
              ({court.ratingCount})
            </span>
          </div>
        </div>

        {/* Right column: build label + actions */}
        <div className="flex items-start justify-between gap-3 px-5 py-5 md:flex-col md:items-end md:justify-between md:px-6 md:py-6">
          <p className="whitespace-nowrap text-lg font-bold text-neutral-900">
            {court.buildLabel ?? "Build None"}
          </p>

          <div className="flex items-center gap-3">
            <button
              aria-label="Favorite"
              className="rounded-full border border-yellow-500/60 px-4 py-2 text-yellow-600 transition hover:bg-yellow-50"
            >
              ♥
            </button>
            <button
              aria-label="Share"
              className="rounded-full border border-yellow-500/60 px-4 py-2 text-yellow-600 transition hover:bg-yellow-50"
            >
              ⇄
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
