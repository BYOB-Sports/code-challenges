import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourtById } from '../api/courtApi';
import ReviewForm from './ReviewForm';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${i <= rating ? 'filled' : 'empty'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-author">{review.author}</div>
        <div className="review-date">{review.date}</div>
      </div>
      <div className="review-rating">
        {renderStars(review.rating)}
      </div>
      <div className="review-text">{review.text}</div>
    </div>
  );
};

const CourtDetail = ({ onAddReview }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadCourt();
  }, [id]);

  const loadCourt = async () => {
    try {
      setLoading(true);
      const courtData = await fetchCourtById(id);
      setCourt(courtData);
    } catch (error) {
      console.error('Error loading court:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      await onAddReview(id, reviewData);
      setShowReviewForm(false);
      // Reload court data to show new review
      loadCourt();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading court details...</p>
      </div>
    );
  }

  if (!court) {
    return (
      <div className="error-container">
        <h3>Court not found</h3>
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Courts
        </button>
      </div>
    );
  }

  return (
    <div className="court-detail">
      <div className="court-detail-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Courts
        </button>
        <h1 className="court-detail-title">{court.name}</h1>
      </div>

      <div className="court-detail-image-container">
        <img 
          src={court.image} 
          alt={court.name}
          className="court-detail-image"
        />
        <div className="court-detail-badges">
          <div className="court-type-badge">{court.type}</div>
          <div className="court-price-badge">{court.price}</div>
        </div>
      </div>

      <div className="court-detail-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({court.reviewCount})
        </button>
      </div>

      <div className="court-detail-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="court-rating-section">
              <div className="rating-display">
                <div className="rating-stars">
                  {renderStars(court.rating)}
                </div>
                <div className="rating-number">{court.rating}</div>
                <div className="rating-count">
                  ({court.reviewCount} review{court.reviewCount !== 1 ? 's' : ''})
                </div>
              </div>
            </div>

            <div className="court-info-section">
              <h3>Court Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Address:</strong>
                  <p>{court.address}</p>
                </div>
                <div className="info-item">
                  <strong>Phone:</strong>
                  <p>{court.phone}</p>
                </div>
                <div className="info-item">
                  <strong>Hours:</strong>
                  <p>Weekdays: {court.hours.weekdays}</p>
                  <p>Weekends: {court.hours.weekends}</p>
                </div>
                <div className="info-item">
                  <strong>Description:</strong>
                  <p>{court.description}</p>
                </div>
              </div>
            </div>

            <div className="facilities-section">
              <h3>Facilities & Amenities</h3>
              <div className="facilities-grid">
                {court.facilities.map((facility, index) => (
                  <div key={index} className="facility-item">
                    <span className="facility-icon">✓</span>
                    <span className="facility-name">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-tab">
            <div className="reviews-header">
              <h3>Reviews & Ratings</h3>
              <button 
                className="add-review-button"
                onClick={() => setShowReviewForm(true)}
              >
                Write a Review
              </button>
            </div>

            {showReviewForm && (
              <div className="review-form-container">
                <ReviewForm
                  onSubmit={handleAddReview}
                  onCancel={() => setShowReviewForm(false)}
                />
              </div>
            )}

            <div className="reviews-list">
              {court.reviews.length > 0 ? (
                court.reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <div className="no-reviews">
                  <div className="no-reviews-icon">📝</div>
                  <h4>No reviews yet</h4>
                  <p>Be the first to review this court!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtDetail;
