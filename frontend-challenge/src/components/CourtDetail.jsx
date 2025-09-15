import React from "react";
import ReviewForm from "./ReviewForm";
import "../index.css";

export default function CourtDetail({ court, onBack, addReview }) {
    return (
        <div className="court-detail">
            <button className="back-btn" onClick={onBack}>
                ← Back
            </button>
            <img src={court.imageUrl} alt={court.name} className="detail-image" />
               <h1>{court.name}</h1>
                <p className="location">{court.location}</p>
                <p className="description">{court.description}</p>
            <div className="court-info-inline">
            <ReviewForm onSubmit={(review) => addReview(court.id, review)} />
    </div>

            <h2>Reviews</h2>
            {court.reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <ul className="review-list">
                    {court.reviews.map((r, idx) => (
                        <li key={idx}>
                            <span>{r.text}</span>
                            <span className="review-stars">
                {Array.from({ length: r.rating }, () => "★")}
</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}