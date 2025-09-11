import { useParams, useNavigate } from "react-router-dom";
import { courts as mockCourts } from "../api/courts";
import { loadCourts, saveCourts } from "../api/storage";
import { useState } from "react";
import ReviewForm from "../components/ReviewForm";

export default function CourtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courts, setCourts] = useState(() => loadCourts(mockCourts));
  const court = courts.find((c) => c.id === id);

  const addReview = (review) => {
    const newReview = {
      ...review,
      id: String(Date.now()),
      dateISO: new Date().toISOString(),
    };
    const updated = courts.map((c) =>
      c.id === court.id ? { ...c, reviews: [newReview, ...c.reviews] } : c
    );
    setCourts(updated);
    saveCourts(updated);
  };

  if (!court) {
    return (
      <div>
        <p>Court not found</p>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>← Back</button>
      <h1>{court.name}</h1>
      <p>
        {court.city} • {court.surface} •{" "}
        {court.indoor ? "Indoor" : "Outdoor"}{" "}
        {court.lights ? "• Lights" : ""}
      </p>

      <h2>Reviews</h2>
      {court.reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <ul>
          {court.reviews.map((r) => (
            <li key={r.id}>
              <strong>{r.rating} ★</strong> - {r.text}
            </li>
          ))}
        </ul>
      )}

      <h2>Leave a Review</h2>
      <ReviewForm onSubmit={addReview} />
    </div>
  );
}
