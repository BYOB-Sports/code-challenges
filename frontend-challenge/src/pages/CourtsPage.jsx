import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { courts } from "../data/courts";

export default function CourtsPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return courts.filter(
      (court) =>
        court.name.toLowerCase().includes(search.toLowerCase()) ||
        court.location.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="p-4 max-w-md mx-auto font-sans bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-center mb-6 tracking-tight bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
        🎾 Tennis Courts
      </h1>

      {/* Sticky Search input */}
      <div className="sticky top-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pb-4 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 transition-all"
            aria-label="Search courts"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            🔍
          </span>
        </div>
      </div>

      {/* Courts list */}
      {filtered.length === 0 && !search ? (
        // Skeleton placeholders
        <ul className="space-y-4 mt-4">
          {[...Array(3)].map((_, i) => (
            <li
              key={i}
              className="rounded-2xl p-5 shadow-md bg-white dark:bg-gray-800 animate-pulse"
            >
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </li>
          ))}
        </ul>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 italic">
          No courts found. Try another search 🎾
        </p>
      ) : (
        <ul className="space-y-4 mt-4">
          {filtered.map((court) => (
            <li
              key={court.id}
              className="rounded-2xl shadow-lg bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 p-5 transition active:scale-95 hover:shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <Link to={`/court/${court.id}`}>
                <p className="font-semibold text-lg">{court.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  📍 {court.location}
                </p>
                <p className="text-sm italic text-blue-500 mt-1">
                  {court.surface}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
