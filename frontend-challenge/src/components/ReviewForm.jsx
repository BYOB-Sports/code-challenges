import React, { useState } from "react";

export default function ReviewForm({ onAddReview, boxStyle }) {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();
    if (user && comment) {
      onAddReview({ user, comment, rating });
      setUser("");
      setComment("");
      setRating(5);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ ...boxStyle, marginBottom: "18px" }}>
      <h4 style={{ margin: "0 0 8px 0", color: "#2196f3", fontWeight: 700, fontSize: "1.1em" }}>Leave a Review</h4>
      <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={e => setUser(e.target.value)}
        style={{
          width: "95%",
          marginBottom: "8px",
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid #bcdffb",
          fontFamily: "'Baloo 2', sans-serif"
        }}
      />
      <textarea
        placeholder="Share your experience at this court..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        style={{
          width: "95%",
          marginBottom: "8px",
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid #bcdffb",
          background: "#f0f0f0",
          color: "#333",
          fontFamily: "'Baloo 2', sans-serif"
        }}
      />
      <div style={{ marginBottom: "8px", fontWeight: 700 }}>
        Rating:{" "}
        {[1,2,3,4,5].map(star => (
          <span
            key={star}
            style={{
              cursor: "pointer",
              color: star <= rating ? "#ccc" : "#2196f3",
              fontSize: "1.5em",
              transition: "color 0.2s"
            }}
            onClick={() => setRating(star)}
            onMouseOver={() => setRating(star)}
            onMouseOut={() => {}}
          >
            ★
          </span>
        ))}
      </div>
      <button type="submit" style={{
        padding: "8px 16px",
        background: "#2196f3",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontWeight: 700,
        fontFamily: "'Baloo 2', sans-serif"
      }}>
        Submit Review →
      </button>
    </form>
  );
}

