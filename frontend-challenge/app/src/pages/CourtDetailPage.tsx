import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courtsData } from '../data/mockData';
import { Layers, Grid3x3, CheckCircle2 } from 'lucide-react';

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
    <div className="relative inline-block h-5 w-[100px] align-middle" aria-label={`Rated ${value} out of 5`}>
      <div className="absolute inset-0 flex leading-none text-gray-300">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} className="block h-5 w-5 shrink-0" />
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${percentage}%` }}>
        <div className="flex leading-none text-yellow-400">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} className="block h-5 w-5 shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CourtDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const court = courtsData.find((c) => c.id === id);

  if (!court) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-rose-50">
        <header className="sticky top-0 z-10 border-b border-white/20 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-sm">
          <div className="mx-auto w-full max-w-2xl px-4 py-3 flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <span aria-hidden>←</span> Back
            </Link>
            <h1 className="text-base font-semibold text-white">Court not found</h1>
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl px-4 py-6">
          <p className="text-sm text-gray-600">We couldn't find that court.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b1220] via-[#0e1629] to-[#0b1220]">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30 text-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Go back to list"
          >
            <span aria-hidden>←</span> Back
          </Link>
          <h1 className="text-base font-semibold text-white">{court.name}</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full bg-gray-100">
              <img
                src={court.imageUrl}
                alt={`${court.name} large view`}
                className="h-auto w-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = `/images/outdoor-tennis-court-facility-in-the-evening.jpg`;
                }}
              />
            </div>

            <div className="px-4 py-5">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-slate-200">{court.location}</p>
                <div className="mt-1 flex items-center gap-2">
                  <RatingStars value={court.rating} />
                  <span className="text-sm font-semibold text-white">{court.rating.toFixed(1)}</span>
                  <span className="text-xs text-slate-400">({court.reviews.length} reviews)</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                    Surface: {court.surface}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                    Courts: {court.numberOfCourts}
                  </span>
                </div>
                <section className="mt-3">
                  <h2 className="text-base font-semibold text-slate-900">Court Info</h2>
                  <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] backdrop-blur-sm p-3 text-sm text-slate-200">
                      <div className="flex items-center gap-2"><Layers className="h-4 w-4 text-primary" /><span className="font-medium">Surface</span></div>
                      <div className="mt-1 text-slate-300">{court.surface}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] backdrop-blur-sm p-3 text-sm text-slate-200">
                      <div className="flex items-center gap-2"><Grid3x3 className="h-4 w-4 text-fuchsia-400" /><span className="font-medium">Courts</span></div>
                      <div className="mt-1 text-slate-300">{court.numberOfCourts}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] backdrop-blur-sm p-3 text-sm text-slate-200 sm:col-span-1 col-span-2">
                      <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /><span className="font-medium">Amenities</span></div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {court.amenities.map((a, idx) => (
                          <span key={idx} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <div className="mt-4">
                  <h2 className="text-base font-semibold text-slate-900">Reviews</h2>
                  {court.reviews.length === 0 ? (
                    <p className="mt-2 text-sm text-slate-400">No reviews yet.</p>
                  ) : (
                    <div className="mt-2 grid grid-cols-1 gap-3">
                      {court.reviews.map((r) => (
                        <div key={r.id} className="rounded-lg border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] backdrop-blur-sm p-3 text-sm text-slate-200">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium text-white">{r.user}</span>
                            <div className="flex items-center gap-2">
                              <RatingStars value={r.rating} />
                              <span className="text-xs text-slate-400">{r.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="mt-1 text-slate-300">{r.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}


