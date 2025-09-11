import { useParams } from "react-router-dom";
import { courts as mockCourts } from "../data/courts";
import { useState } from "react";
import ReviewForm from "../components/ReviewForm";

export default function CourtDetailPage() {
  const { id } = useParams();
  const court = mockCourts.find((c) => c.id === parseInt(id));
  const [reviews, setReviews] = useState(court?.reviews || []);

  if (!court) return <p>Court not found</p>;

  const addReview = (review) => setReviews([...reviews, review]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{court.name}</h1>
      <p>{court.location}</p>

      <h2 className="text-xl mt-4">Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet</p>}
      {reviews.map((r, idx) => (
        <div key={idx} className="border p-2 my-2 rounded">
          <strong>{r.name}</strong>
          <p>{r.comment}</p>
        </div>
      ))}

      <ReviewForm onSubmit={addReview} />
    </div>
  );
}
