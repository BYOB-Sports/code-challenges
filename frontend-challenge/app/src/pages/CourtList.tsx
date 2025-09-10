import { useMemo, useState } from "react";
import { COURTS } from "../data/courts";
import CourtCard from "../components/CourtCard";

export default function CourtList() {
  const [q, setQ] = useState("");
  const [surface, setSurface] = useState<string>("All");
  const [sort, setSort] = useState<"rating"|"name">("rating");

  const results = useMemo(() => {
    const text = q.trim().toLowerCase();
    let list = COURTS.filter(c =>
      !text ||
      c.name.toLowerCase().includes(text) ||
      c.city.toLowerCase().includes(text) ||
      c.surface.toLowerCase().includes(text)
    );
    if (surface !== "All") list = list.filter(c => c.surface === surface);
    if (sort === "rating") list = list.slice().sort((a,b)=>b.rating - a.rating);
    if (sort === "name") list = list.slice().sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  }, [q, surface, sort]);

  return (
    <div className="page">
      <header className="topbar">
        <h1>Tennis Courts</h1>
      </header>

      <div className="controls">
        <input
          className="search"
          placeholder="Search by name, city, surface..."
          value={q}
          onChange={(e)=>setQ(e.target.value)}
        />
        <div className="row">
          <select value={surface} onChange={(e)=>setSurface(e.target.value)}>
            <option>All</option>
            <option>Hard</option>
            <option>Clay</option>
            <option>Grass</option>
            <option>Carpet</option>
          </select>
          <select value={sort} onChange={(e)=>setSort(e.target.value as any)}>
            <option value="rating">Sort: Rating</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>
      </div>

      <div className="list">
        {results.map(c => <CourtCard key={c.id} court={c} />)}
        {results.length === 0 && <div className="empty">No courts found.</div>}
      </div>
    </div>
  );
}
