import React, { useState } from 'react';

function CourtDetail({ court, onBack }) {
  const [reviews, setReviews] = useState(court.reviews || []);
  const [newReview, setNewReview] = useState('');

  const submitReview = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    setReviews(prev => [...prev, newReview.trim()]);
    setNewReview('');
  };

  return (
    <div className="court-detail">
      <button className="back-button" onClick={onBack}>
        ◀ Back to Courts
      </button>

      <h2>{court.name}</h2>
      <p>Location: {court.location}</p>
      <p>Surface: {court.surface}</p>
      <p>Average rating: {court.rating}</p>

      <div className="review-section">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="review-list">
            {reviews.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}

        <form className="review-form" onSubmit={submitReview}>
          <textarea
            placeholder="Write your review"
            value={newReview}
            onChange={e => setNewReview(e.target.value)}
            rows={3}
          />
          <button type="submit" className="submit-review">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourtDetail;
