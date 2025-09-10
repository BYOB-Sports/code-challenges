import { useState } from "react";

export default function useReviews(courtId) {
  const [reviews, setReviews] = useState([]);
  const addReview = (review) => {
    setReviews((prev) => [{ ...review, id: Date.now() }, ...prev]);
  };
  return { reviews, addReview };
}
