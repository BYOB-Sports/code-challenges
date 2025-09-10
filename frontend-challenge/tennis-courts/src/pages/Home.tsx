import { useEffect, useMemo, useState } from "react";
import CourtCard from "../components/CourtCard";
import SearchBar from "../components/SearchBar";
import { getCourts } from "../api/courts";

const allCourts = getCourts(50);

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return allCourts;
    return allCourts.filter((c) =>
      [c.title, c.address].some((f) => f?.toLowerCase().includes(term))
    );
  }, [query]);

  // Reset to first page when filter or page size changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  // Pagination math
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);

  const paged = useMemo(
    () => filtered.slice(startIndex, endIndex),
    [filtered, startIndex, endIndex]
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:px-8">
      <SearchBar
        value={query}
        onChange={setQuery}
        className="sticky top-4 z-10 bg-transparent"
      />

      {paged.length === 0 ? (
        <p className="text-neutral-500">No courts found for “{query}”.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {paged.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>

          <nav
            className="mt-4 flex items-center justify-center gap-2"
            aria-label="Pagination"
          >
            <button
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage(1)}
              disabled={clampedPage === 1}
            >
              « First
            </button>
            <button
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={clampedPage === 1}
            >
              ‹ Prev
            </button>

            <span className="px-2 text-sm text-neutral-700">
              Page <span className="font-semibold">{clampedPage}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>

            <button
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={clampedPage === totalPages}
            >
              Next ›
            </button>
            <button
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setPage(totalPages)}
              disabled={clampedPage === totalPages}
            >
              Last »
            </button>
          </nav>
        </>
      )}
    </div>
  );
}
