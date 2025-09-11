import { useState } from "react";
import CourtCard from "../components/CourtCard";
import { courts } from "../data/courts";

export default function CourtListPage({ onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = courts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        className="border p-2 mb-4 w-full rounded"
        placeholder="Search courts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid gap-4">
        {filtered.map((court) => (
          <CourtCard key={court.id} court={court} onClick={() => onSelect(court)} />
        ))}
      </div>
    </div>
  );
}
