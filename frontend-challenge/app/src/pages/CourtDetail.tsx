import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COURTS } from "../data/courts";
import { addReview, getReviewsForCourt } from "../utils/storage";
import type { Review } from "../types";

export default function CourtDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const court = useMemo(()=>COURTS.find(c=>c.id===id), [id]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const reviews = useMemo(()=>id ? getReviewsForCourt(id) : [], [id]);

  if (!court) {
    return (
      <div className="page">
        <header className="topbar"><button onClick={()=>nav(-1)}>&larr;</button><h1>Not found</h1></header>
        <div className="empty">Court not found.</div>
      </div>
    );
  }

  const submit = () => {
    if (!id || !comment.trim()) return;
    const rev: Review = { courtId: id, rating, comment: comment.trim(), createdAt: Date.now() };
    addReview(rev);
    setComment("");
    window.location.reload();
  };

  return (
    <div className="page">
      <header className="topbar">
        <button onClick={()=>nav(-1)} aria-label="Back" className="back">&larr;</button>
        <h1>{court.name}</h1>
      </header>

      <section className="detail">
        <div className="meta-rows">
          <div><strong>Location:</strong> {court.city}, {court.state}</div>
          <div><strong>Surface:</strong> {court.surface}</div>
          <div><strong>Court count:</strong> {court.courts}</div>
          <div><strong>Lights:</strong> {court.lights ? "Yes" : "No"}</div>
          <div><strong>Indoor:</strong> {court.indoor ? "Yes" : "No"}</div>
          <div><strong>Rating:</strong> ⭐ {court.rating} ({court.ratingCount})</div>
        </div>
      </section>

      <section className="reviews">
        <h2>Reviews</h2>
        {reviews.length === 0 && <div className="empty">Be the first to review.</div>}
        <ul className="review-list">
          {reviews.map((r,i)=>(
            <li key={i}>
              <div className="stars">⭐ {r.rating}</div>
              <div className="comment">{r.comment}</div>
              <div className="ts">{new Date(r.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>

        <div className="review-form">
          <label>
            Rating
            <input type="range" min={1} max={5} step={1} value={rating}
              onChange={e=>setRating(parseInt(e.target.value))}/>
            <span className="stars">⭐ {rating}</span>
          </label>
          <textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={e=>setComment(e.target.value)}
            rows={4}
          />
          <button onClick={submit} className="primary">Submit review</button>
        </div>
      </section>
    </div>
  );
}
