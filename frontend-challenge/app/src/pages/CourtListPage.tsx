import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import CourtCard from '../components/CourtCard';
import { courtsData } from '../data/mockData';
import type { Court } from '../data/mockData';

export default function CourtListPage() {
  const [allCourts, setAllCourts] = useState<Court[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllCourts(courtsData);
      setIsLoading(false);
    }, 600); // simulate network latency
    return () => clearTimeout(timer);
  }, []);

  const filteredCourts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return allCourts;
    return allCourts.filter((court) => {
      const nameMatch = court.name.toLowerCase().includes(normalized);
      const locationMatch = court.location.toLowerCase().includes(normalized);
      return nameMatch || locationMatch;
    });
  }, [allCourts, query]);

  const featured = useMemo(() => {
    return [...allCourts]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [allCourts]);

  const isSearching = query.trim().length > 0;

  const hardTop = useMemo(() => {
    return allCourts
      .filter((c) => c.surface === 'Hard')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  }, [allCourts]);

  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0b1220] via-[#0e1629] to-[#0b1220]">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30 text-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-white">CourtFinder</h1>
            <label className="relative block">
              <span className="sr-only">Search courts</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-white/70"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 3.477 9.8l3.611 3.612a.75.75 0 1 0 1.06-1.061l-3.611-3.612A5.5 5.5 0 0 0 9 3.5Zm-4 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or location..."
                className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary backdrop-blur"
                />
            </label>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <motion.div
          className="mx-auto w-full max-w-2xl px-4 py-4"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-indigo-700"
              >
                Loading courts…
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-6"
              >
                {!isSearching && featured.length > 0 && (
                  <section>
                    <h2 className="mb-2 text-sm font-medium text-white/80">Featured Courts</h2>
                    <div className="-mx-4 overflow-x-auto pb-2 scrollbar-none">
                      <div className="mx-4 flex gap-3">
                        {featured.map((court) => (
                          <div key={court.id} className="min-w-[260px] max-w-[260px] flex-1 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] backdrop-blur-sm p-3">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/30">
                              <img src={court.imageUrl} alt={court.name} className="h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <p className="truncate text-sm font-semibold text-white" title={court.name}>{court.name}</p>
                              <span className="inline-flex items-center gap-1 text-xs text-yellow-400"><Star className="h-3 w-3" />{court.rating.toFixed(1)}</span>
                            </div>
                            <p className="truncate text-[11px] text-muted" title={court.location}>{court.location}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {!isSearching && hardTop.length > 0 && (
                  <section>
                    <h2 className="mb-2 text-sm font-medium text-white/80">Top Hard Courts</h2>
                    <div className="-mx-4 overflow-x-auto pb-2 scrollbar-none">
                      <div className="mx-4 flex gap-3">
                        {hardTop.map((court) => (
                          <div key={court.id} className="min-w-[220px] max-w-[220px] flex-1 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] backdrop-blur-sm p-3">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/30">
                              <img src={court.imageUrl} alt={court.name} className="h-full w-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <p className="truncate text-sm font-semibold text-white" title={court.name}>{court.name}</p>
                              <span className="inline-flex items-center gap-1 text-xs text-yellow-400"><Star className="h-3 w-3" />{court.rating.toFixed(1)}</span>
                            </div>
                            <p className="truncate text-[11px] text-muted" title={court.location}>{court.location}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                

                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-white/80">
                    {isSearching ? `Results for "${query.trim()}"` : 'Courts Near Boston, MA'}
                  </h2>
                  {isSearching && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="text-xs text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                      aria-label="Clear search"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <AnimatePresence>
                  {filteredCourts.map((court) => (
                    <motion.div
                      key={court.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <CourtCard court={court} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {filteredCourts.length === 0 && (
                  <p className="text-sm text-white/80">No courts match your search.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}


