import { useState } from "react";
import type { Review } from "../utils/types";

export default function ReviewForm({
  onAddReview,
}: {
  onAddReview: (r: Review) => void;
}) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAddReview({ text: t, date: new Date().toLocaleString() });
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-black/5 bg-gray-100 p-4 shadow-sm"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Leave a review..."
        className="w-full resize-y rounded-lg border border-gray-300 p-3 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
      />
      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="rounded-full bg-yellow-500 px-5 py-2 font-semibold text-white transition hover:bg-yellow-600 cursor-pointer"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}
