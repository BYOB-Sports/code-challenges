import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
//   fetchPlayers,
  getCourtById,
//   updatePlayers as updateCourts,
} from "../api/playerApi";
import { addReviewAndRecalculate, getReviewsForCourt } from "../api/ratingApi";

const placeholderImg = (id) =>
  `https://picsum.photos/seed/court_${id}/600/400`;

const CourtDetail = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(4.0);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // load court + reviews
  useEffect(() => {
    const load = async () => {
      const c = await getCourtById(id);
      setCourt(c);
      const r = await getReviewsForCourt(id);
      setReviews(r);
      if (c?.averageRating) {
        setRating(Math.round(c.averageRating * 10) / 10);
      }
    };
    load();
  }, [id]);

  // recompute display avg & count
  const avgDisplay = useMemo(() => {
    if (!reviews.length && court?.averageRating != null) {
      return court.averageRating.toFixed(1);
    }
    if (!reviews.length) return "N/A";
    const sum = reviews.reduce((a, r) => a + (Number(r.rating) || 0), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews, court]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      // Persist review & recalc average, returns updated courts array
      const { updatedCourts, newReviews } = await addReviewAndRecalculate(
        id,
        Number(rating),
        text.trim()
      );
      setReviews(newReviews);
      // also sync court object in state
      const updatedCourt = updatedCourts.find((c) => String(c.id) === String(id));
      setCourt(updatedCourt || null);
      setText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!court) {
    return <div className="helper">Loading court…</div>;
  }

  return (
    <div>
      <div className="detail-header">
        <h2>{court.name}</h2>
        <div className="detail-meta">
          {court.location} • {court.surface}
        </div>
        <img
          src={placeholderImg(id)}
          alt={court.name}
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            borderRadius: 12,
            border: "1px solid #e6e8eb",
            margin: "8px 0",
          }}
        />
        <div className="detail-rating">⭐ {avgDisplay}</div>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="rating">Your Rating: {Number(rating).toFixed(1)}</label>
          <input
            id="rating"
            type="range"
            min="1.0"
            max="7.0"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="review">Your Review</label>
          <textarea
            id="review"
            rows={3}
            placeholder="Tell others about the surface, lighting, crowd, etc."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <button className="button submit" type="submit" disabled={isSubmitting || !text.trim()}>
          {isSubmitting ? "Submitting…" : "Submit Review"}
        </button>

        <div className="helper">
          Reviews are stored locally in your browser for this demo.
        </div>
      </form>

      <div className="reviews">
        {reviews.map((r, idx) => (
          <div className="review" key={idx}>
            <div className="review-meta">
              ⭐ {Number(r.rating).toFixed(1)} • {new Date(r.date).toLocaleString()}
            </div>
            <div className="review-text">{r.comment}</div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="helper">No reviews yet. Be the first!</div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <Link className="button secondary" to="/">
          ← Back to Courts
        </Link>
      </div>
    </div>
  );
};

export default CourtDetail;
