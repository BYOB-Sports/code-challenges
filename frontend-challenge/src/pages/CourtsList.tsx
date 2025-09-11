import { useMemo, useState } from "react";
import { courts } from "../data/courts";
import CourtCard from "../components/CourtCard";
import CourtCardSkeleton from "../components/CourtCardSkeleton";
import SearchBar from "../components/SearchBar";
import useFakeLoading from "../hooks/useFakeLoading";
import useDarkMode from "../hooks/useDarkMode";
import { Sun, Moon } from "lucide-react";

const surfaces: Array<"All" | "Hard" | "Clay" | "Grass"> = ["All", "Hard", "Clay", "Grass"];

export default function CourtsList() {
  const [query, setQuery] = useState("");
  const [surface, setSurface] = useState<typeof surfaces[number]>("All");
  const [sort, setSort] = useState<"rating" | "distance">("rating");
  const { isDark, setIsDark } = useDarkMode();

  const loading = useFakeLoading(1200);

  const filtered = useMemo(() => {
    let list = courts.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.location.toLowerCase().includes(query.toLowerCase())
    );
    if (surface !== "All") list = list.filter((c) => c.surface === surface);
    list.sort((a, b) =>
      sort === "rating" ? b.rating - a.rating : a.distanceKm - b.distanceKm
    );
    return list;
  }, [query, surface, sort]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-green-light to-white dark:from-gray-900 dark:to-black font-sans">
     
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        
          <h1 className="text-2xl font-bold flex items-center gap-2 text-brand-green-dark dark:text-brand-green-light">
            🎾 <span>Tennis Courts</span>
          </h1>

         
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-800" />
            )}
          </button>
        </div>

      
        <div className="max-w-md mx-auto px-4 pb-3">
          <SearchBar value={query} onChange={setQuery} />

          <div className="mt-3 flex items-center justify-between">
          
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {surfaces.map((s) => (
                <button
                  key={s}
                  onClick={() => setSurface(s)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    surface === s
                      ? "bg-brand-green text-white shadow-card"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

         
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden text-sm shadow-sm">
              <button
                onClick={() => setSort("rating")}
                className={`px-3 py-1.5 ${
                  sort === "rating"
                    ? "bg-brand-green text-white"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"
                }`}
              >
           
              </button>
              <button
                onClick={() => setSort("distance")}
                className={`px-3 py-1.5 ${
                  sort === "distance"
                    ? "bg-brand-green text-white"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300"
                }`}
              >
                📍 Close
              </button>
            </div>
          </div>
        </div>
      </header>

     
      <main className="max-w-md mx-auto px-4 py-4 flex flex-col gap-4 pb-28">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <CourtCardSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            <div className="text-6xl mb-2">🎾</div>
            <p className="font-medium">No courts found</p>
            <p className="text-sm">Try a different search or filter.</p>
          </div>
        ) : (
          filtered.map((court) => <CourtCard key={court.id} court={court} />)
        )}
      </main>
    </div>
  );
}