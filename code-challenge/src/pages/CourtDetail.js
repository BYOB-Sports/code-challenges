import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import courts from "../data/courts";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

export default function CourtDetail() {
  const { id } = useParams();
  const court = courts.find((c) => c.id === Number(id));
  const [reviews, setReviews] = useState([]);

  const addReview = (review) => {
    setReviews([review, ...reviews]);
  };

  if (!court) return <p>Court not found</p>;

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Back
      </Link>
      <img src={court.image} alt={court.name} className="detail-image" />
      <h1 className="detail-title">{court.name}</h1>
      <p className="detail-location">{court.location}</p>
      <p className="detail-description">{court.description}</p>

      <ReviewForm onAddReview={addReview} />
      <ReviewList reviews={reviews} />
    </div>
  );
}
