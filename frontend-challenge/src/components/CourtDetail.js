import React, { useState } from 'react';
import './CourtDetail.css';

const CourtDetail = ({ court, reviews, onBack, onReviewSubmit }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });
  const [userVotes, setUserVotes] = useState({}); // Track user votes for each review
  const [showContact, setShowContact] = useState(false);
  const [showHours, setShowHours] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewForm.userName.trim() && reviewForm.comment.trim()) {
      onReviewSubmit(reviewForm);
      setReviewForm({ userName: '', rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVote = (reviewId, voteType) => {
    setUserVotes(prev => {
      const currentVote = prev[reviewId];
      let newVote = null;
      
      if (currentVote === voteType) {
        // If clicking the same vote type, remove the vote
        newVote = null;
      } else {
        // Otherwise, set the new vote type
        newVote = voteType;
      }
      
      return {
        ...prev,
        [reviewId]: newVote
      };
    });
  };

  const getVoteCount = (review, voteType) => {
    const currentVote = userVotes[review.id];
    let count = review[voteType] || 0;
    
    if (currentVote === voteType) {
      count += 1;
    } else if (currentVote && currentVote !== voteType) {
      // If user had voted for the other type, we need to adjust
      const otherType = voteType === 'helpful' ? 'unhelpful' : 'helpful';
      if (review[otherType] > 0) {
        count = Math.max(0, count);
      }
    }
    
    return count;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <div className="court-detail">
      <div className="detail-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Courts
        </button>
        <h1 className="court-title">{court.name}</h1>
        <p className="court-location">{court.location}</p>
      </div>

      <div className="detail-content">
        <div className="court-image-section">
          <img src={court.image} alt={court.name} className="main-image" />
          <div className="image-overlay">
            <div className="rating-display">
              <div className="rating-stars">{renderStars(Math.round(court.rating))}</div>
              <div className="rating-text">
                {court.rating.toFixed(1)} ({court.reviewCount} reviews)
              </div>
            </div>
          </div>
        </div>

        <div className="court-info-section">
          <div className="info-grid">
            <div className="info-item">
              <h3>Surface Type</h3>
              <p>{court.surface}</p>
            </div>
            <div className="info-item">
              <h3>Number of Courts</h3>
              <p>{court.courts}</p>
            </div>
            <div className="info-item">
              <h3>Price</h3>
              <p>{court.price}</p>
            </div>
            <div className="info-item">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {court.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-item">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{court.description}</p>
          </div>

          {court.contact && (
            <div className="contact-section">
              <button 
                className="dropdown-header"
                onClick={() => setShowContact(!showContact)}
                aria-expanded={showContact}
              >
                <h3>Contact Information</h3>
                <span className={`dropdown-arrow ${showContact ? 'open' : ''}`}>▼</span>
              </button>
              {showContact && (
                <div className="contact-info">
                  <div className="contact-item">
                    <strong>Phone:</strong> {court.contact.phone}
                  </div>
                  <div className="contact-item">
                    <strong>Email:</strong> {court.contact.email}
                  </div>
                  <div className="contact-item">
                    <strong>Website:</strong> {court.contact.website}
                  </div>
                </div>
              )}
            </div>
          )}

          {court.hours && (
            <div className="hours-section">
              <button 
                className="dropdown-header"
                onClick={() => setShowHours(!showHours)}
                aria-expanded={showHours}
              >
                <h3>Operating Hours</h3>
                <span className={`dropdown-arrow ${showHours ? 'open' : ''}`}>▼</span>
              </button>
              {showHours && (
                <div className="hours-info">
                  <div className="hours-item">
                    <strong>Monday:</strong> {court.hours.monday}
                  </div>
                  <div className="hours-item">
                    <strong>Tuesday:</strong> {court.hours.tuesday}
                  </div>
                  <div className="hours-item">
                    <strong>Wednesday:</strong> {court.hours.wednesday}
                  </div>
                  <div className="hours-item">
                    <strong>Thursday:</strong> {court.hours.thursday}
                  </div>
                  <div className="hours-item">
                    <strong>Friday:</strong> {court.hours.friday}
                  </div>
                  <div className="hours-item">
                    <strong>Saturday:</strong> {court.hours.saturday}
                  </div>
                  <div className="hours-item">
                    <strong>Sunday:</strong> {court.hours.sunday}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="reviews-section">
          <div className="reviews-header">
            <h3>Reviews ({reviews.length})</h3>
            {!showReviewForm && (
              <button 
                className="add-review-btn"
                onClick={() => setShowReviewForm(true)}
              >
                Add Review
              </button>
            )}
          </div>

          {showReviewForm && (
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <button 
                type="button"
                className="close-form-btn"
                onClick={() => setShowReviewForm(false)}
                aria-label="Close review form"
              >
                ×
              </button>
              <div className="form-group">
                <label htmlFor="userName">Your Name</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={reviewForm.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= reviewForm.rating ? 'active' : ''}`}
                      onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Comment</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Share your experience at this court..."
                  required
                />
              </div>
              
              <button type="submit" className="submit-review-btn">
                Submit Review
              </button>
            </form>
          )}

          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-user">
                    <span className="user-name">{review.userName}</span>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <div className="review-actions">
                  <button 
                    className={`helpful-btn ${userVotes[review.id] === 'helpful' ? 'active' : ''}`}
                    onClick={() => handleVote(review.id, 'helpful')}
                  >
                    👍 Helpful ({getVoteCount(review, 'helpful')})
                  </button>
                  <button 
                    className={`unhelpful-btn ${userVotes[review.id] === 'unhelpful' ? 'active' : ''}`}
                    onClick={() => handleVote(review.id, 'unhelpful')}
                  >
                    👎 Unhelpful ({getVoteCount(review, 'unhelpful')})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtDetail;