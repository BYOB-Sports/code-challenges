import { motion } from "framer-motion";
import React from "react";

function CourtCard({ court, onSelect }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2, boxShadow: "0 6px 30px rgba(40,60,120,0.11)" }}
      className="w-full text-left bg-white rounded-2xl shadow-md px-5 py-4 flex flex-col gap-1 items-start hover:shadow-xl transition-all border border-zinc-100"
      onClick={() => onSelect(court.id)}
      tabIndex={0}
    >
      <h2 className="font-semibold text-lg mb-0.5 text-zinc-900 truncate">
        {court.name}
      </h2>
      <span className="flex items-center gap-1 text-base text-yellow-500 font-bold">
        ★<span className="text-zinc-800">{court.avgRating}</span>
      </span>
      <span className="block text-gray-500 text-xs mt-1 font-medium">
        {court.location}
      </span>
      <span
        className={`px-3 py-0.5 text-xs rounded-full font-semibold
        ${
          court.surface === "Grass"
            ? "bg-green-100 text-green-700"
            : court.surface === "Clay"
            ? "bg-orange-100 text-orange-700"
            : "bg-blue-100 text-blue-700"
        }
        mt-2`}
      >
        {court.surface} Court
      </span>
    </motion.button>
  );
}
export default CourtCard;
