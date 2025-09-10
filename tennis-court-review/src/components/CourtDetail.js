import { motion, AnimatePresence } from "framer-motion";
import React from "react";

function CourtDetail({ court, reviews }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl px-6 py-7 mt-4 mb-6">
      <h2 className="font-bold text-xl text-zinc-900">{court.name}</h2>
      <h3 className="text-blue-600 text-base font-medium mt-2">
        {court.location}
      </h3>
      <div className="flex items-center gap-4 mt-1 text-sm">
        <span className="bg-blue-50 text-blue-600 rounded-full px-3 py-1 font-medium">
          {court.surface} Surface
        </span>
        <span className="text-zinc-500 font-medium">★ {court.avgRating}</span>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold text-zinc-900 mb-2">Reviews</h4>
        {reviews.length === 0 && (
          <motion.p
            key="noreviews"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-zinc-400 italic"
          >
            No reviews yet. Be first!
          </motion.p>
        )}
        <AnimatePresence>
          {reviews.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.16 }}
              className="mb-3 rounded-xl bg-zinc-50 px-4 py-3"
            >
              <span className="flex items-center gap-2 font-bold text-blue-600">
                {r.user}
                <span className="font-normal text-yellow-500">
                  ★ {r.rating}
                </span>
              </span>
              <p className="pt-1 text-zinc-700">{r.comment}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
export default CourtDetail;
