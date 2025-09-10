import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function CourtDetailPage() {
  const { id } = useParams();
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
    <div className="detail">
      {/* Hero / summary */}
      <div className="hero">
        <div className="photo" aria-hidden />
        <div className="grid">
          <div className="card">
            <h1 style={{ margin: 0, fontSize: 22 }}>{court.name}</h1>
            <div className="meta" style={{ marginTop: 4 }}>
              {court.city} • {court.courts} courts • {court.lights ? "Lights" : "No lights"}
            </div>
            <div style={{ marginTop: 8 }}>
              <RatingStars value={avg} />
            </div>
            <div className="tags" style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span className="badge ball">{court.surface}</span>
              <a
                className="badge"
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  court.name + " " + court.city
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps →
              </a>
            </div>
          </div>

          <div className="card">
            <h3 className="h" style={{ fontSize: 16 }}>Amenities</h3>
            <ul style={{ margin: "6px 0 0 16px" }}>
              <li>Surface: {court.surface}</li>
              <li>Lights: {court.lights ? "Yes" : "No"}</li>
              <li>Courts: {court.courts}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section style={{ marginTop: 12 }}>
        <h2 className="h" style={{ fontSize: 18 }}>Reviews</h2>
        <ReviewForm onAdd={add} />
        {reviews.length === 0 ? (
          <div className="card">No reviews yet. Be the first!</div>
        ) : (
          <ul className="list">
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
    </div>
  );
}
