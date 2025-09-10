import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courts } from "../data/mockCourts";
import type { Court, Review } from "../data/mockCourts";
import { Stars } from "../components/Stars";

export const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const court = courts.find((c) => c.id === Number(id)) as Court;

  const [reviews, setReviews] = useState<Review[]>(court.reviews);
  const [newReview, setNewReview] = useState<Review>({
    user: "",
    comment: "",
    rating: 3,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviews([newReview, ...reviews]);
    setNewReview({ user: "", comment: "", rating: 3 });
  };

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <h1>{court.name}</h1>
      <p><strong>City:</strong> {court.location}</p>
      <p><strong>Address:</strong> {court.address}</p>
      <p style={{ fontStyle: "italic", color: "#ccc" }}>{court.description}</p>
      <Stars rating={court.rating} />

      <h3>Reviews</h3>
      <div className="reviews-container">
        {reviews.length ? (
          reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-header">
                <strong>{r.user}</strong>
                <span className="review-rating">{r.rating}⭐</span>
              </div>
              <p>{r.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="add-review-form">
        <input
          type="text"
          placeholder="Your name"
          value={newReview.user}
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
          required
        />
        <textarea
          placeholder="Your comment"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          required
        />
        <select
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: Number(e.target.value) })
          }
        >
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? "s" : ""}
              </option>
            ))}
          </div>
        </select>
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
};
