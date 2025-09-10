import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courts, Court } from "../data/courts";
import ReviewForm from "../components/ReviewForm";

export default function CourtDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const court = courts.find((c) => c.id === id) as Court;
  const [reviews, setReviews] = useState(court.reviews);

  const addReview = (review: string) => setReviews((prev) => [...prev, review]);

  return (
    <div className="p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-xl font-bold">{court.name}</h1>
      <p className="text-sm">{court.location}</p>

      <div className="mt-4">
        <h2 className="font-semibold">Reviews</h2>
        <ul className="list-disc list-inside">
          {reviews.map((r, idx) => (
            <li key={idx}>{r}</li>
          ))}
        </ul>
      </div>

      <ReviewForm onSubmit={addReview} />
    </div>
  );
}
