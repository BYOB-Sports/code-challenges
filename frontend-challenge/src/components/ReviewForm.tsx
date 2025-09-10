import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: number;
};

export default function ReviewForm({ onAdd }: { onAdd: (r: Review) => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setPosting(true);
    onAdd({
      id: uuid(),
      name: name.trim() || "Anonymous",
      rating,
      text: text.trim(),
      createdAt: Date.now(),
    });
    setName("");
    setRating(5);
    setText("");
    setPosting(false);
  }

  return (
    <form onSubmit={submit} className="card" aria-label="leave a review">
      <label className="label">Your name</label>
      <input
        className="input"
        placeholder="Optional"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="label">Rating</label>
      <select
        className="select"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <label className="label">Review</label>
      <textarea
        className="textarea"
        placeholder="Share court quality, nets, lines, lighting, crowd, etc."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="button primary" disabled={posting}>
        {posting ? "Posting…" : "Post review"}
      </button>
    </form>
  );
}
