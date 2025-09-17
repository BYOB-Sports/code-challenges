import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { COURTS } from "../data/courts";
import "./CourtDetailPage.css";

const CourtDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const court = COURTS.find((c) => c.id === Number(id));

  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(court.reviews || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() === "") return;

    const newReview = {
      text: reviewText.trim(),
      date: new Date().toLocaleString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setReviewText("");
  };

  if (!court) {
    return (
      <div style={{ padding: "16px" }}>
        <p>Court not found.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="court-header">
        <h2>{court.name}</h2>
        <p>📍 {court.location}</p>
        <p>🛠️ Surface: {court.surface}</p>
        <p>⭐ Rating: {court.rating}</p>
      </div>

      <hr className="section-divider" />

      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="review-textarea"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      <hr className="section-divider" />

      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((rev, idx) => (
            <li key={idx} className="review-item">
              <p>{rev.text}</p>
              <p className="review-date">{rev.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourtDetailPage;
