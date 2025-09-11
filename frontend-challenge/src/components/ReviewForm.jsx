import { useState } from "react";

export default function ReviewForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, comment });
    setName("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        className="border p-2 mb-2 w-full"
        placeholder="Your review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Review
      </button>
    </form>
  );
}
