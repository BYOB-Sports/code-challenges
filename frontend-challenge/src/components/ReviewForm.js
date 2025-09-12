import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange, disabled = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starRating) => {
    if (!disabled) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating) => {
    if (!disabled) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  return (
    <div className="star-rating-input" onMouseLeave={handleMouseLeave}>
      <label className="rating-label">Your Rating:</label>
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= (hoverRating || rating);
          return (
            <span
              key={star}
              className={`star ${isActive ? "active" : ""} ${
                disabled ? "disabled" : ""
              }`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
            >
              ★
            </span>
          );
        })}
      </div>
      <span className="rating-text">{rating} star{rating !== 1 ? 's' : ''}</span>
    </div>
  );
};

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (rating < 1 || rating > 5) {
      newErrors.rating = 'Please select a rating between 1 and 5 stars';
    }

    if (!text.trim()) {
      newErrors.text = 'Please write a review';
    } else if (text.trim().length < 10) {
      newErrors.text = 'Review must be at least 10 characters long';
    } else if (text.trim().length > 500) {
      newErrors.text = 'Review must be less than 500 characters';
    }

    if (!author.trim()) {
      newErrors.author = 'Please enter your name';
    } else if (author.trim().length < 2) {
      newErrors.author = 'Name must be at least 2 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        rating,
        text: text.trim(),
        author: author.trim()
      });
      
      // Reset form
      setRating(5);
      setText('');
      setAuthor('');
      setErrors({});
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setRating(5);
    setText('');
    setAuthor('');
    setErrors({});
    onCancel();
  };

  return (
    <div className="review-form-container">
      <div className="review-form-header">
        <h3>Write a Review</h3>
        <button 
          type="button" 
          onClick={handleCancel}
          className="close-button"
          disabled={isSubmitting}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            disabled={isSubmitting}
          />
          {errors.rating && <div className="error-message">{errors.rating}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Your Name *
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name"
            className={`form-input ${errors.author ? 'error' : ''}`}
            disabled={isSubmitting}
            maxLength={50}
          />
          {errors.author && <div className="error-message">{errors.author}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="review-text" className="form-label">
            Your Review *
          </label>
          <textarea
            id="review-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your experience at this court..."
            className={`form-textarea ${errors.text ? 'error' : ''}`}
            disabled={isSubmitting}
            rows={4}
            maxLength={500}
          />
          <div className="character-count">
            {text.length}/500 characters
          </div>
          {errors.text && <div className="error-message">{errors.text}</div>}
        </div>

        {errors.submit && (
          <div className="error-message submit-error">{errors.submit}</div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
