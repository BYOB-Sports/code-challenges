import React, { useState } from "react";
import "../index.css";

export default function ReviewForm({ onSubmit }) {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!review.trim() || rating === 0) return;
        onSubmit({ text: review, rating });
        setReview("");
        setRating(0);
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={star <= rating ? "star filled" : "star"}
                        onClick={() => setRating(star)}
                    >
            ★
</span>
                ))}
            </div>
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Leave a review..."
            />
            <button type="submit" disabled={rating === 0 || !review.trim()}>
                Submit Review
            </button>
        </form>
    );
}