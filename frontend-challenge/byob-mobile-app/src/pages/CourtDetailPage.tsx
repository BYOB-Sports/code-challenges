import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourtById } from "../data/courts";
import { StarRating } from "../components/StarRating";
import { addReview, getAverageRating, getReviews } from "../utils/storage";

export default function CourtDetailPage() {
  const params = useParams();
  const court = useMemo(
    () => getCourtById(params.courtId as string),
    [params.courtId]
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [version, setVersion] = useState(0); // bump to refresh reviews after submit

  if (!court) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
        <p>Not found.</p>
        <Link to="/">Back</Link>
      </div>
    );
  }

  const reviews = getReviews(court.id);
  const avg = getAverageRating(court.id) || court.stars;

  function submitReview(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1 || rating > 5) return;
    addReview(court.id, rating, comment.trim());
    setRating(0);
    setComment("");
    setVersion((v) => v + 1);
  }

  return (
    <div key={version} style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        ← Back
      </Link>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
        <div>
          <div
            style={{
              aspectRatio: "16 / 9",
              overflow: "hidden",
              background: "#f3f4f6",
              borderRadius: 12,
            }}
          >
            <img
              src={court.imagePath}
              alt={court.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <h1 style={{ marginBottom: 4 }}>{court.name}</h1>
          <p style={{ marginTop: 0, color: "#374151" }}>
            {court.location} ·{" "}
            <span style={{ textTransform: "capitalize" }}>{court.surface}</span>
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StarRating value={Math.round(avg)} readOnly />
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              {avg.toFixed(1)} avg
            </span>
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: 8 }}>Leave a review</h2>
          <form onSubmit={submitReview} style={{ display: "grid", gap: 8 }}>
            <StarRating value={rating} onChange={setRating} size={28} />
            <textarea
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              style={{
                resize: "vertical",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
              }}
            />
            <button
              type="submit"
              disabled={rating === 0}
              style={{
                background: rating === 0 ? "#9ca3af" : "#111827",
                color: "#fff",
                border: 0,
                borderRadius: 8,
                padding: "10px 14px",
                cursor: rating === 0 ? "not-allowed" : "pointer",
              }}
            >
              Submit
            </button>
          </form>
        </div>

        <div>
          <h2 style={{ marginBottom: 8 }}>Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {reviews.map((r) => (
                <div
                  key={r.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <StarRating value={r.rating} readOnly size={18} />
                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                      {new Date(r.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ margin: "8px 0 0" }}>
                    {r.comment || "(No comment)"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
