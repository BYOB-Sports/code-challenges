import React, { useState } from "react";
import { motion } from "framer-motion";

function ReviewForm({ onSubmit }) {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !comment) return;
    onSubmit({ user, rating, comment });
    setUser("");
    setRating(5);
    setComment("");
  };

  return (
    <motion.form
      className="mt-3 px-2 flex flex-col gap-3"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 70, duration: 0.3 }}
    >
      <input
        className="bg-zinc-100 rounded-lg px-4 py-2 text-zinc-900 placeholder-zinc-400 outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Your Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
        maxLength={30}
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="bg-zinc-100 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300"
      >
        {[5, 4, 3, 2, 1].map((num) => (
          <option key={num} value={num}>
            {num} ★
          </option>
        ))}
      </select>
      <textarea
        className="bg-zinc-100 rounded-lg px-4 py-2 text-zinc-900 placeholder-zinc-400 min-h-[48px] outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Write your review…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        maxLength={350}
      />
      <motion.button
        type="submit"
        whileTap={{ scale: 0.97 }}
        className="bg-blue-500 w-full py-2 mt-2 rounded-lg text-white font-semibold shadow-sm hover:bg-blue-600 active:scale-95 transition"
      >
        Post review
      </motion.button>
    </motion.form>
  );
}
export default ReviewForm;
