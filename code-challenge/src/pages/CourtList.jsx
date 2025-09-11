// src/pages/CourtList.jsx
import { useState } from "react";
import { courts } from "../api/courts";
import CourtCard from "../components/CourtCard";

export default function CourtList() {
  const [query, setQuery] = useState("");

  const filtered = courts.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <input
        className="search"
        placeholder="Search courts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid">
        {filtered.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
        {filtered.length === 0 && <p>No courts found</p>}
      </div>
    </div>
  );
}
