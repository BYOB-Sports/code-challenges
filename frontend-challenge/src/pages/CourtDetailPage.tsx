
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courts, type Court } from "../data/courts";
import RatingStars from "../components/RatingStarts";
import ReviewForm, { type Review } from "../components/ReviewForm";

function useReviews(courtId: string) {
  const key = `reviews:${courtId}`;
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]") as Review[];
    } catch {
      return [];
    }
  });

  function add(r: Review) {
    const next = [r, ...reviews];
    setReviews(next);
    localStorage.setItem(key, JSON.stringify(next));
  }

  return { reviews, add };
}

function heroImageFor(court: Court) {
  const bySurface: Record<string, string> = {
    Hard: "/assets/hero-hard.jpg",
    Clay: "/assets/hero-clay.jpg",
    Grass: "/assets/hero-grass.jpg",
  };
  return bySurface[court.surface] || "/assets/hero-courts.avif";
}

export default function CourtDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const court: Court | undefined = useMemo(
    () => courts.find((c) => c.id === id),
    [id]
  );

  const { reviews, add } = useReviews(id!);

  if (!court) {
    return <div className="card">Court not found.</div>;
  }

  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : court.rating;

  return (
    <div className="detail" style={{ display: "grid", gap: 12 }}>
      {/* ---------- Breadcrumb / Back ---------- */}
      <div className="meta" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          className="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          style={{ padding: "6px 10px" }}
        >
          ← Back
        </button>
        <span aria-hidden>·</span>
        <span>{court.city}</span>
      </div>

      {/* ---------- HERO ---------- */}
      <section
        className="card"
        style={{
          overflow: "hidden",
          padding: 0,
          borderRadius: 16,
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            background: "#f3f4f6",
          }}
          aria-hidden
        >
          <img
            src={heroImageFor(court)}
            alt={`${court.name} hero`}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 12,
            padding: 16,
          }}
        >
          {/* Summary */}
          <div>
            <h1 style={{ margin: 0, fontSize: 24 }}>{court.name}</h1>
            <div className="meta" style={{ marginTop: 6 }}>
              {court.city} • {court.courts} courts • {court.lights ? "Lights" : "No lights"}
            </div>

            {/* Rating row */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <RatingStars value={avg} />
              <span className="meta">
                {avg.toFixed(1)} {reviews.length > 0 ? `(${reviews.length} review${reviews.length > 1 ? "s" : ""})` : "(no reviews yet)"}
              </span>
            </div>

            {/* Tags */}
            <div
              className="tags"
              style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}
            >
              <span className="badge ball">{court.surface}</span>
              {court.lights && <span className="badge">Lights</span>}
              <span className="badge">{court.courts} courts</span>
            </div>
          </div>

          {/* Actions */}
          <div
            className="card"
            style={{
              border: "1px dashed var(--border, #e5e7eb)",
              background: "linear-gradient(180deg,#fff, #fafafa)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <a
              className="button"
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                court.name + " " + court.city
              )}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Open in Google Maps"
            >
              Open in Maps →
            </a>
            <button
              className="button"
              onClick={() =>
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
              }
            >
              Write a review
            </button>
          </div>
        </div>
      </section>

      {/* ---------- INFO GRID ---------- */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 12,
        }}
      >
        {/* About / Description */}
        <article className="card" style={{ lineHeight: 1.6 }}>
          <h3 className="h" style={{ fontSize: 18, marginTop: 0 }}>
            About this court
          </h3>
          <p className="meta" style={{ marginTop: 6 }}>
            Discover available courts and plan matches with friends or local partners. Filter by
            surface, city, and amenities. Ratings are community-driven to help you find quality
            courts faster.
          </p>
        </article>

        {/* Amenities */}
        <article className="card">
          <h3 className="h" style={{ fontSize: 18, marginTop: 0 }}>
            Amenities
          </h3>
          <ul
            style={{
              margin: "8px 0 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <li>Surface: <strong>{court.surface}</strong></li>
            <li>Lights: <strong>{court.lights ? "Yes" : "No"}</strong></li>
            <li>Courts: <strong>{court.courts}</strong></li>
            <li>
              Location:{" "}
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  court.name + " " + court.city
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Maps
              </a>
            </li>
          </ul>
        </article>
      </section>

      {/* ---------- REVIEWS ---------- */}
      <section style={{ marginTop: 4 }}>
        <h2 className="h" style={{ fontSize: 20, margin: "8px 0" }}>
          Reviews
        </h2>

        <ReviewForm onAdd={add} />
        {reviews.length === 0 ? (
          <div className="card" style={{ textAlign: "center" }}>
            No reviews yet. Be the first!
          </div>
        ) : (
          <ul className="list" style={{ marginTop: 8 }}>
            {reviews.map((r) => (
              <li key={r.id} className="card">
                <div className="row">
                  <strong>{r.name}</strong>
                  <span className="meta">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <RatingStars value={r.rating} />
                </div>
                <p style={{ marginTop: 8, lineHeight: 1.5 }}>{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ---------- Responsive tweaks ---------- */}
      <style>{`
        @media (max-width: 960px) {
          .detail section.card > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .detail > section:nth-of-type(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
