import { useMemo, useState } from "react";
import { COURTS } from "../data/courts";
import CourtCard from "../Components/CourtCard";
import CourtDrawer from "../Components/CourtDrawer";
import { Court } from "../types";

import './Styles.css';

export default function Home() {
    const [query, setQuery] = useState("");

    const [surface, setSurface] = useState<string>("All");

    const [sort, setSort] = useState<"rating" | "name">("rating");

    const [court, setCourt] = useState<Court | null>(null);

    const results = useMemo(() => {
        const text = query.trim().toLowerCase();
        let list = COURTS.filter(c =>
            !text ||
            c.name.toLowerCase().includes(text) ||
            c.city.toLowerCase().includes(text) ||
            c.surface.toLowerCase().includes(text)
        );
        if (surface !== "All") list = list.filter(c => c.surface === surface);
        if (sort === "rating") list = list.slice().sort((a, b) => b.rating - a.rating);
        if (sort === "name") list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
        return list;
    }, [query, surface, sort]);

    return (
        <div className="page-wrap">
            <header className="sticky-header">
                <h1>Tennis Courts</h1>
                <div className="search-bar">
                    <input
                        className="search-input"
                        placeholder="Name, City, Surface..."
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="row">
                        <select className="search-select" value={surface} onChange={(e) => setSurface(e.target.value)}>
                            <option>All</option>
                            <option>Hard</option>
                            <option>Clay</option>
                            <option>Grass</option>
                            <option>Carpet</option>
                        </select>
                        <select className="search-select" value={sort} onChange={(e) => setSort(e.target.value as any)}>
                            <option value="rating">Sort by Rating</option>
                            <option value="name">Sort by Name</option>
                        </select>
                    </div>
                </div>
            </header>

            <div className="court-list">
                {
                    results.length === 0 ?
                        <div className="empty">No courts found.</div>
                        :
                        <div className="row">
                            {results.map(c => <CourtCard key={c.id} court={c} onSelectCourt={(c) => setCourt(c)} />)}
                        </div>
                }
            </div>

            <CourtDrawer court={court} isOpen={court != null} onClose={() => setCourt(null)} />

        </div>
    );
}