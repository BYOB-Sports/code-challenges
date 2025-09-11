// src/pages/CourtsPage.tsx
import { useEffect, useMemo, useState, useRef } from "react";
import { searchCourts } from "../data/courts";
import CourtCard from "../components/CourtCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import FeatureCard from "../components/FeatureCard";

export default function CourtsPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [surface, setSurface] = useState("");
  const [minRating, setMinRating] = useState("");
  const [limit, setLimit] = useState(20); // progressive list
  const [loading, setLoading] = useState(true);

  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(
    () =>
      searchCourts(query, {
        city: city || undefined,
        surface: (surface as any) || undefined,
        minRating: minRating ? Number(minRating) : undefined,
      }),
    [query, city, surface, minRating]
  );

  useEffect(() => {
    setLimit(20);
  }, [query, city, surface, minRating]);

  function loadMore() {
    setLimit((v) => Math.min(v + 20, results.length));
  }

  function scrollToSearch() {
    searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (loading) return <Loader />;

  return (
    <div>
      {/* ---------- HERO / INTRO ---------- */}
      <section
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 16,
          alignItems: "center",
          margin: "8px 0 16px",
        }}
        aria-labelledby="hero-heading"
      >
        <div>
          <h1 id="hero-heading" style={{ fontSize: 28, margin: "0 0 8px" }}>
            Find, rate, and play at the best tennis courts near you 🎾
          </h1>
          <p className="meta" style={{ marginBottom: 12, lineHeight: 1.5 }}>
            We help players discover quality courts, connect with partners, and join weekend
            doubles & clinics. Browse public and private facilities, filter by surface and city,
            and see ratings from real players.
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="button" onClick={scrollToSearch} aria-label="Explore courts">
              Explore courts
            </button>
            <a
              className="button"
              href="#community"
              aria-label="Learn about the community"
              style={{ background: "transparent", border: "1px solid var(--border, #ddd)" }}
            >
              Our community
            </a>
          </div>

          {/* quick stats */}
          <ul
            className="meta"
            style={{
              display: "flex",
              gap: 16,
              marginTop: 12,
              padding: 0,
              listStyle: "none",
              flexWrap: "wrap",
            }}
            aria-label="Platform highlights"
          >
            <li>⭐ 1k+ player ratings</li>
            <li>📍 150+ courts indexed</li>
            <li>🏆 Weekly doubles & clinics</li>
          </ul>
        </div>

        {/* Hero image */}
        <div style={{ justifySelf: "end" }}>
          <img
            src="/assets/hero-courts.avif"
            alt="Players practicing on a well-lit tennis court"
            loading="lazy"
            width={520}
            height={300}
            style={{
              width: "100%",
              maxWidth: 520,
              height: "auto",
              borderRadius: 16,
              objectFit: "cover",
            }}
          />
        </div>
      </section>

      {/* ---------- FEATURE GRID: 2 per row, big cards ---------- */}
      <section
        id="community"
        aria-label="Community features"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 16,
          margin: "12px 0 16px",
        }}
      >
        <FeatureCard
          title="Partner to Practice"
          subtitle="Match with experienced players to level up faster."
          imgSrc="/assets/community.avif"
          imgAlt="Two tennis players rallying on a hard court"
        />
        <FeatureCard
          title="Get Rated by a Pro"
          subtitle="Join our clinic and receive an official skill rating."
          imgSrc="/assets/community.avif"
          imgAlt="Coach evaluating a player's serve"
        />
        <FeatureCard
          title="Community & Weekends"
          subtitle="Doubles every weekend + active groups across South Florida."
          imgSrc="/assets/community.avif"
          imgAlt="Group photo after weekend doubles"
        />
        <FeatureCard
          title="BYOB Events"
          subtitle="Happy hours, tournaments, and social meetups all season long."
          imgSrc="/assets/community.avif"
          imgAlt="Tennis social event by evening lights"
        />
      </section>

      {/* ---------- SEARCH & FILTERS ---------- */}
      <div ref={searchRef}>
        <h2 style={{ fontSize: 22, margin: "12px 0 8px" }}>Find courts</h2>
        <SearchBar
          query={query}
          onQuery={setQuery}
          city={city}
          onCity={setCity}
          surface={surface}
          onSurface={setSurface}
          minRating={minRating}
          onMinRating={setMinRating}
        />
      </div>

      {/* ---------- RESULTS ---------- */}
      <ul className="list" aria-live="polite" aria-busy={loading}>
        {results.slice(0, limit).map((c) => (
          <CourtCard key={c.id} court={c} />
        ))}
      </ul>

      {/* Empty state */}
      {results.length === 0 && (
        <div className="card" style={{ textAlign: "center" }}>
          No results. Try clearing filters.
        </div>
      )}

      {/* Load more */}
      {limit < results.length && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "12px 0 24px",
          }}
        >
          <button className="button" onClick={loadMore} aria-label="Load more courts">
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
