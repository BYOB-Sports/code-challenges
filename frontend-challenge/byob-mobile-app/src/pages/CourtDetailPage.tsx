import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourtById } from "../data/courts";
import { StarRating } from "../components/StarRating";
import { addReview, getAverageRating, getReviews } from "../utils/storage";
import styles from "./CourtDetailPage.module.css";

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

  const reviews = getReviews(court!.id);
  const avg = getAverageRating(court!.id) || court!.stars;

  function submitReview(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1 || rating > 5) return;
    addReview(court!.id, rating, comment.trim());
    setRating(0);
    setComment("");
    setVersion((v) => v + 1);
  }

  return (
    <div key={version} className={styles.container}>
      <div className={styles.grid}>
        <div>
          <div className={styles.hero}>
            <img
              src={court!.imagePath}
              alt={court!.name}
              className={styles.image}
            />
          </div>
          <Link to="/" className={styles.back}>
            ← Back
          </Link>
          <h1 className={styles.title}>{court!.name}</h1>
          <p className={styles.subtitle}>
            {court!.location} ·{" "}
            <span className={styles.capitalize}>{court!.surface}</span>
          </p>
          <div className={styles.ratingRow}>
            <StarRating value={Math.round(avg)} readOnly />
            <span className={styles.timestamp}>{avg.toFixed(1)} avg</span>
          </div>
        </div>

        <div>
          <h2 className={styles.sectionTitle}>Leave a review</h2>
          <form onSubmit={submitReview} className={styles.form}>
            <StarRating value={rating} onChange={setRating} size={28} />
            <textarea
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className={styles.textarea}
            />
            <button
              type="submit"
              disabled={rating === 0}
              className={`${styles.submit} ${
                rating === 0 ? styles.disabled : ""
              }`}
            >
              Submit
            </button>
          </form>
        </div>

        <div>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className={styles.reviews}>
              {reviews.map((r) => (
                <div key={r.id} className={styles.review}>
                  <div className={styles.ratingRow}>
                    <StarRating value={r.rating} readOnly size={18} />
                    <span className={styles.timestamp}>
                      {new Date(r.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className={styles.noComment}>
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
