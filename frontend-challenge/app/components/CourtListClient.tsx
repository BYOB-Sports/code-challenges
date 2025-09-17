import React, { JSX, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourtCard from "./CourtCard";
import COURTS from "@/lib/mockData";
import type { Court } from "@/lib/types";
import { Search, ChevronDown } from "lucide-react";
import Header from "./Header";

export default function CourtListClient(): JSX.Element {
  const [query, setQuery] = useState("");
  const [showOnlyWithReviews, setShowOnlyWithReviews] = useState(false);
  const [sort, setSort] = useState<"featured" | "rating">("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const COURTS_PER_PAGE = 9;
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items: Court[] = COURTS.slice();
    if (q) {
      items = items.filter((c) =>
        `${c.name} ${c.city} ${c.surface} ${c.address}`
          .toLowerCase()
          .includes(q)
      );
    }
    if (showOnlyWithReviews) {
      items = items.filter((c) => c.reviews && c.reviews.length > 0);
    }
    if (sort === "rating") {
      items = items.slice().sort((a, b) => b.rating - a.rating);
    }
    return items;
  }, [query, showOnlyWithReviews, sort]);

  const totalPages = Math.ceil(filtered.length / COURTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * COURTS_PER_PAGE,
    currentPage * COURTS_PER_PAGE
  );

  // 👇 Scroll to the top of the list when page changes
  useEffect(() => {
    const courtsSection = document.getElementById("explore-section");
    if (courtsSection) {
      courtsSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] sm:h-[75vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://en.reformsports.com/oxegrebi/2020/10/itf-profesyonel-tenis-kortu-olculeri.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="z-10 px-6 max-w-6xl w-full text-left">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg text-white">
            Find the Best Tennis Courts
          </h2>
          <p className="text-lg sm:text-xl mb-6 text-slate-200 drop-shadow max-w-md">
            Search, compare, and review tennis courts near you with ease.
          </p>
          <button
            onClick={() => {
              const section = document.getElementById("explore-section");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-10 mt-4 p-3 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      {/* Explore Section */}
      <div className="mt-10 flex-1 px-6 py-6 max-w-6xl w-full mx-auto">
        <section
          id="explore-section"
          className="mb-6 space-y-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          {/* Search */}
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                className="w-full pl-9 pr-9 p-3 rounded-xl bg-white border border-gray-200 placeholder:text-slate-400 text-sm"
                placeholder="Search by court, city or surface"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-500 hover:text-black transition"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="hidden sm:flex sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                id="reviews-only"
                type="checkbox"
                checked={showOnlyWithReviews}
                onChange={(e) => {
                  setShowOnlyWithReviews(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4"
              />
              <label htmlFor="reviews-only" className="text-sm text-slate-600">
                Only courts with reviews
              </label>
            </div>
          </div>
        </section>

        {/* Courts Grid */}
        <section id="courts" aria-live="polite">
          {filtered.length === 0 ? (
            <div className="bg-white p-4 rounded-xl shadow-sm text-sm text-slate-600">
              No courts found. Try a different search or clear filters.
            </div>
          ) : (
            <>
              <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {paginated.map((court) => (
                  <li key={court.id}>
                    <CourtCard court={court} />
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-14 mb-20">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full border disabled:opacity-40 hover:bg-slate-100"
                >
                  ◀
                </button>
                <span className="text-xs sm:text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full border disabled:opacity-40 hover:bg-slate-100"
                >
                  ▶
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
