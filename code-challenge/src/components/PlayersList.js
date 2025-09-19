import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchPlayers } from "../api/playerApi";

const placeholderImg = (i) =>
  `https://picsum.photos/seed/court_${i}/200/200`;

const CourtCard = ({ court, index }) => {
  return (
    <div className="card">
      <img src={placeholderImg(index)} alt={`${court.name}`} />
      <div style={{ flex: 1 }}>
        <h3>{court.name}</h3>
        <div className="meta">
          {court.location} • {court.surface}
        </div>
        <div className="rating">⭐ {court.averageRating.toFixed(1)}</div>
        <div className="actions">
          <Link className="button" to={`/court/${court.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const PlayersList = () => {
  const [courts, setCourts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const load = async () => {
      const data = await fetchPlayers(); // alias to fetch courts
      setCourts(data);
    };
    load();
  }, []);

  // Filter by name or location
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courts;
    return courts.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        (c.location || "").toLowerCase().includes(q) ||
        (c.surface || "").toLowerCase().includes(q)
      );
    });
  }, [courts, query]);

  const onSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val) setSearchParams({ q: val });
    else setSearchParams({});
  };

  return (
    <div>
      <input
        className="search-bar"
        placeholder="Search courts by name, location, or surface…"
        value={query}
        onChange={onSearch}
        type="search"
        inputMode="search"
      />

      <div className="card-grid">
        {filtered.map((court, idx) => (
          <CourtCard court={court} key={court.id} index={idx} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="helper">No courts match your search.</div>
      )}
    </div>
  );
};

export default PlayersList;
