import { useMemo, useState } from "react";
import { courts } from "../data/courts";
import { CourtCard } from "../components/CourtCard";

export default function CourtListPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courts;
    return courts.filter((c) =>
      [c.name, c.location, c.surface].some((f) =>
        String(f).toLowerCase().includes(q)
      )
    );
  }, [query]);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginTop: 0 }}>Tennis Courts</h1>
      <input
        type="search"
        placeholder="Search by name, location, surface..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #e5e7eb",
          marginBottom: 16,
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>
    </div>
  );
}
