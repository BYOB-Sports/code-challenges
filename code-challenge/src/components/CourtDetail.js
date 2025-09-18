import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import courtsData from '../data/courtsData';
import './CourtDetail.css';

function CourtDetail() {
  const { id } = useParams();
  const court = courtsData.find(c => c.id === parseInt(id));
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(`reviews_${id}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.sort((a, b) => new Date(b.date) - new Date(a.date));
      setReviews(parsed);
    }
    setLoadingReviews(false);
  }, [id]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      name: newReview.name,
      rating: parseInt(newReview.rating),
      comment: newReview.comment,
      date: new Date().toISOString()
    };
    const updated = [...reviews, review];
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    setNewReview({ name: '', rating: 5, comment: '' });
    setToast('Review submitted successfully!');
    setTimeout(() => setToast(''), 3000);
  }, [reviews, id, newReview]);

  const handleNameChange = useCallback((e) => {
    setNewReview(prev => ({ ...prev, name: e.target.value }));
  }, []);

  const handleRatingChange = useCallback((e) => {
    setNewReview(prev => ({ ...prev, rating: e.target.value }));
  }, []);

  const handleCommentChange = useCallback((e) => {
    setNewReview(prev => ({ ...prev, comment: e.target.value }));
  }, []);

  if (!court) return <div>Court not found</div>;

  return (
    <div className="court-detail">
      <Link to="/">Back to Courts</Link>
      <div className="image-container">
        <img
          src={court.image}
          alt={court.name}
          loading="lazy"
          onLoad={(e) => e.target.classList.add('loaded')}
          onError={(e) => e.target.classList.add('error')}
        />
        <div className="image-loader">Loading...</div>
      </div>
      <h1>{court.name}</h1>
      <p>{court.location}</p>
      <p>{court.description}</p>
      <h2>Reviews</h2>
      {loadingReviews ? (
        <div className="skeleton-loader">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
          <div className="skeleton-line"></div>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review">
              <strong>{review.name}</strong> - {review.rating}/5
              <p>{review.comment}</p>
              <small>{new Date(review.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="review-form" aria-label="Submit a review for this tennis court">
        <input
          type="text"
          placeholder="Your name"
          value={newReview.name}
          onChange={handleNameChange}
          required
        />
        <select
          value={newReview.rating}
          onChange={handleRatingChange}
          data-tooltip="Rate the court from 1 to 5 stars"
        >
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <textarea
          placeholder="Your review"
          value={newReview.comment}
          onChange={handleCommentChange}
          required
        ></textarea>
        <button type="submit">Submit Review</button>
      </form>
      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </div>
  );
}

export default React.memo(CourtDetail);