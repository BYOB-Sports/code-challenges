import { useMemo, useState } from "react";
import { courts } from "../data/courts";
import { CourtCard } from "../components/CourtCard";
import styles from "./CourtListPage.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.title}>Tennis Courts</h1>
      <input
        type="search"
        className={styles.search}
        placeholder="Search by name, location, surface..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={styles.grid}>
        {filtered.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>
    </div>
  );
}
