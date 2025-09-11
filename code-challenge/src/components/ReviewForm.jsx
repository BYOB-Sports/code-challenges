// src/components/ReviewForm.jsx
import { useState } from "react";

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit({ rating: Number(rating), text: trimmed });
    setText("");
    setRating(5);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} ★
            </option>
          ))}
        </select>
      </label>

      <label>
        Review:
        <textarea
          placeholder="Share your experience..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
