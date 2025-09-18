import { useEffect, useRef, useState } from "react";
import RatingStars from "../components/RatingStars.tsx";
import ReviewForm from "../components/ReviewForm.tsx";
import { addReview, getReviews } from "../storage.ts";
import type { Court, Review } from "../types.ts";

export default function CourtDetail({
  court,
  onBack,
}: {
  court: Court;
  onBack: () => void;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const reviewsTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReviews(getReviews(court.id));
  }, [court.id]);

  const handleSubmit = (rating: number, text: string, user: string) => {
    const r: Review = {
      id: Math.random().toString(36).slice(2, 10),
      courtId: court.id,
      createdAt: Date.now(),
      rating,
      text,
      user,
    };
    addReview(r);
    setReviews((prev) => [r, ...prev]);
  };

  const scrollToReviews = () =>
    setTimeout(
      () =>
        reviewsTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      80
    );

  return (
    <div className="container">
      <div className="header row">
        <button className="btn" onClick={onBack}>
          ← Back
        </button>
        <h1 className="h1" style={{ marginLeft: 8 }}>
          {court.name}
        </h1>
      </div>

      {/* Summary panel */}
      <div className="panel" style={{ marginBottom: 12 }}>
        <div className="card-row">
          <div>
            <div className="card-title">
              {court.surface} • {court.borough}
            </div>
            <div className="meta">
              {court.address} • {court.distanceKm} km
            </div>
          </div>
          <RatingStars value={court.rating} />
        </div>
        <div className="section">
          <span className="badge">
            {court.lights ? "Lights available" : "No lights"}
          </span>
        </div>
      </div>

      <div className="section-title">Leave a review</div>
      <ReviewForm onSubmit={handleSubmit} onPosted={scrollToReviews} />

      <div ref={reviewsTopRef} />

      <div className="section-title">Recent reviews</div>
      {reviews.length === 0 && (
        <p className="meta">No reviews yet—be the first!</p>
      )}

      <div className="grid">
        {reviews.map((r) => (
          <div key={r.id} className="card review-card">
            <div className="card-row">
              <strong>{r.user}</strong>
              <span className="meta">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="section">
              <RatingStars value={r.rating} />
            </div>
            <div className="meta">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
