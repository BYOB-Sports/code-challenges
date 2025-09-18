import { useMemo, useState } from "react";
import CourtCard from "../components/CourtCard.tsx";
import SearchBar from "../components/SearchBar.tsx";
import type { Court } from "../types.ts";

export default function CourtsList({
  courts,
  onOpen,
}: {
  courts: Court[];
  onOpen: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [surface, setSurface] = useState<"All" | "Hard" | "Clay" | "Grass">(
    "All"
  );

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return courts
      .filter((c) => surface === "All" || c.surface === surface)
      .filter(
        (c) =>
          qq === "" ||
          c.name.toLowerCase().includes(qq) ||
          c.borough.toLowerCase().includes(qq) ||
          c.surface.toLowerCase().includes(qq)
      )
      .sort((a, b) => b.rating - a.rating);
  }, [courts, q, surface]);

  return (
    <div className="container">
      <div className="header">
        <h1 className="h1">Tennis Courts</h1>
      </div>

      {/* Filters */}
      <div className="filters">
        <SearchBar value={q} onChange={setQ} />
        <select
          className="select"
          value={surface}
          onChange={(e) =>
            setSurface(e.target.value as "All" | "Hard" | "Clay" | "Grass")
          }
          aria-label="Filter by surface"
        >
          <option value="All">All</option>
          <option value="Hard">Hard</option>
          <option value="Clay">Clay</option>
          <option value="Grass">Grass</option>
        </select>
      </div>

      {/* Results */}
      <div className="grid" role="list">
        {filtered.map((c) => (
          <CourtCard key={c.id} c={c} onOpen={() => onOpen(c.id)} />
        ))}
        {filtered.length === 0 && (
          <p className="meta">No courts match your search.</p>
        )}
      </div>
    </div>
  );
}
