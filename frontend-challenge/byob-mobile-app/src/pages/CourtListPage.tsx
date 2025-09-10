import { useMemo, useState } from "react";
import { courts } from "../data/courts";
import { CourtCard } from "../components/CourtCard";
import styles from "./CourtListPage.module.css";
import { getAverageRating } from "../utils/storage";

export default function CourtListPage() {
  const [query, setQuery] = useState("");
  const [surfaceSort, setSurfaceSort] = useState<
    "none" | "hard" | "clay" | "grass" | "indoor"
  >("none");
  const [locationSort, setLocationSort] = useState<"none" | "az" | "za">(
    "none"
  );
  const [popularitySort, setPopularitySort] = useState<"none" | "high" | "low">(
    "none"
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courts;
    return courts.filter((c) =>
      [c.name, c.location, c.surface].some((f) =>
        String(f).toLowerCase().includes(q)
      )
    );
  }, [query]);

  const sorted = useMemo(() => {
    let list = [...filtered];
    if (surfaceSort !== "none") {
      list = list.filter((c) => c.surface === surfaceSort);
    }
    if (locationSort !== "none") {
      list.sort((a, b) => {
        const la = a.location.toLowerCase();
        const lb = b.location.toLowerCase();
        if (la < lb) return locationSort === "az" ? -1 : 1;
        if (la > lb) return locationSort === "az" ? 1 : -1;
        return 0;
      });
    }
    if (popularitySort !== "none") {
      list.sort((a, b) => {
        const ra = getAverageRating(a.id) || a.stars;
        const rb = getAverageRating(b.id) || b.stars;
        return popularitySort === "high" ? rb - ra : ra - rb;
      });
    }
    return list;
  }, [filtered, surfaceSort, locationSort, popularitySort]);

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
      <div className={styles.controls}>
        <select
          className={styles.select}
          value={surfaceSort}
          onChange={(e) => setSurfaceSort(e.target.value as any)}
        >
          <option value="none">All surfaces</option>
          <option value="hard">Hard</option>
          <option value="clay">Clay</option>
          <option value="grass">Grass</option>
          <option value="indoor">Indoor</option>
        </select>
        <select
          className={styles.select}
          value={locationSort}
          onChange={(e) => setLocationSort(e.target.value as any)}
        >
          <option value="none">Location: none</option>
          <option value="az">Location: A → Z</option>
          <option value="za">Location: Z → A</option>
        </select>
        <select
          className={styles.select}
          value={popularitySort}
          onChange={(e) => setPopularitySort(e.target.value as any)}
        >
          <option value="none">Popularity: none</option>
          <option value="high">Popularity: High → Low</option>
          <option value="low">Popularity: Low → High</option>
        </select>
      </div>
      {sorted.length === 0 ? (
        <div className={styles.empty}>
          <div>
            <h3>No courts found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {sorted.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>
      )}
    </div>
  );
}
