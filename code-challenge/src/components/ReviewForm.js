import { useState } from "react";

export default function ReviewForm({ onAddReview }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddReview({ text, date: new Date().toLocaleString() });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <textarea
        placeholder="Leave a review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="review-textarea"
        rows="3"
      />
      <button type="submit" className="review-submit">
        Submit Review
      </button>
    </form>
  );
}
