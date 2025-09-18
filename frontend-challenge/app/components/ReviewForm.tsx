"use client";
import { Review } from "@/lib/types";
import React, { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (r: Review) => void;
  submitting?: boolean;
}) {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!author.trim()) return setError("Please enter your name");
    if (!email.trim()) return setError("Please enter your email");
    if (rating === 0) return setError("Please select a rating");
    if (!text.trim()) return setError("Please write a short review");

    const review: Review = {
      id: `r-${Date.now()}`,
      author: author.trim(),
      email: email.trim(),
      rating,
      text: title ? `${title} — ${text}` : text,
      createdAt: Date.now(), 
    };

    onSubmit(review);

    // reset
    setAuthor("");
    setEmail("");
    setTitle("");
    setText("");
    setRating(0);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 text-center">
      <h4 className="text-left text-xl lg:text-3xl font-semibold mb-4">
        We appreciate your feedback
      </h4>

      {/* Stars */}
      <div className="flex justify-start  mb-4 pt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1"
          >
            <Star
              className={`w-8 h-8 ${
                (hoverRating || rating) >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2.5 rounded-md border border-slate-300 text-sm mb-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Your name"
        disabled={submitting}
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2.5 rounded-md border border-slate-300 text-sm mb-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Your email"
        disabled={submitting}
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2.5 rounded-md border border-slate-300 text-sm mb-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        rows={3}
        placeholder="Share your experience..."
        disabled={submitting}
      />

      {error && (
        <div className="text-xs text-red-600 bg-red-50 p-2 rounded-md mb-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 transition-colors"
      >
        {submitting ? "Saving..." : "Submit Review"}
      </button>
    </form>
  );
}
