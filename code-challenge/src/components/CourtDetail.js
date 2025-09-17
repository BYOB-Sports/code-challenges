import React, { useState, useEffect } from 'react';
import { fetchCourtReviews, submitReview } from '../api/courtsApi';

const CourtDetail = ({ court, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    author: '',
    rating: 5,
    comment: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (court) {
      loadReviews();
    }
  }, [court]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const reviewsData = await fetchCourtReviews(court.id);
      setReviews(reviewsData);
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewForm.comment.trim()) {
      setMessage('Please enter a comment');
      return;
    }

    try {
      setSubmittingReview(true);
      await submitReview(court.id, reviewForm);
      
      // Reload reviews to show the new one
      await loadReviews();
      
      // Reset form
      setReviewForm({
        author: '',
        rating: 5,
        comment: ''
      });
      setShowReviewForm(false);
      setMessage('Review submitted successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to submit review. Please try again.');
      console.error('Error submitting review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= rating;
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => onChange(i) : undefined}
        >
          {isFilled ? '★' : '☆'}
        </span>
      );
    }
    
    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!court) {
    return (
      <div className="court-detail">
        <div className="error">Court not found</div>
      </div>
    );
  }

  return (
    <div className="court-detail">
      <div className="court-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Courts
        </button>
        
        <div className="court-hero">
          <img src={court.image} alt={court.name} className="court-hero-image" />
          <div className="court-hero-overlay">
            <h1 className="court-title">{court.name}</h1>
            <p className="court-subtitle">{court.location}</p>
          </div>
        </div>
      </div>

      <div className="court-content">
        <div className="court-info-section">
          <div className="court-stats">
            <div className="stat">
              <span className="stat-label">Rating</span>
              <div className="stat-value">
                <div className="stars">
                  {renderStars(court.rating)}
                </div>
                <span className="rating-number">{court.rating}</span>
                <span className="review-count">({court.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="stat">
              <span className="stat-label">Surface</span>
              <span className="stat-value">{court.surface}</span>
            </div>
            
            <div className="stat">
              <span className="stat-label">Price</span>
              <span className="stat-value">{court.price}</span>
            </div>
          </div>

          <div className="court-description">
            <h3>About this court</h3>
            <p>{court.description}</p>
          </div>

          <div className="court-amenities">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {court.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span className="amenity-icon">✓</span>
                  <span className="amenity-name">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <div className="reviews-header">
            <h3>Reviews ({reviews.length})</h3>
            <button 
              className="add-review-btn"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          {showReviewForm && (
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label htmlFor="author">Your Name (optional)</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={reviewForm.author}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                  {renderStars(reviewForm.rating, true, (rating) => 
                    setReviewForm(prev => ({ ...prev, rating }))
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comment">Your Review</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleInputChange}
                  placeholder="Share your experience at this court..."
                  rows="4"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="submit-review-btn"
                disabled={submittingReview}
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}

          <div className="reviews-list">
            {loading ? (
              <div className="loading">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="no-reviews">
                <p>No reviews yet. Be the first to review this court!</p>
              </div>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-author">{review.author}</div>
                    <div className="review-date">{formatDate(review.date)}</div>
                  </div>
                  
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  
                  <div className="review-comment">
                    {review.comment}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtDetail;
