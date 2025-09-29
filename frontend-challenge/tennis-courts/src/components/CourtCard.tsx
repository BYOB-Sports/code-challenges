import React from "react";
import { useNavigate } from "react-router-dom";
import { Court } from "../data/courts";

interface CourtCardProps {
  court: Court;
}

export default function CourtCard({ court }: CourtCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded overflow-hidden shadow cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/court/${court.id}`)}
    >
      <img
        src={court.image}
        alt={court.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold">{court.name}</h2>
        <p className="text-sm text-gray-600">{court.location}</p>
        <p className="mt-2">Rating: {court.rating}⭐</p>
      </div>
    </div>
  );
}
