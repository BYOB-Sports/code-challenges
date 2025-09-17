import React from 'react';
import type { Review } from '../types';
import { StarRating } from './StarRating';
import { formatDate } from '../utils/helpers';

interface ReviewItemProps {
  review: Review;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="review-item bg-white rounded-xl p-6 border border-gray-200">
      <div className="review-header flex justify-between items-start mb-4">
        <div>
          <div className="reviewer-name font-semibold text-bright-blue mb-1">
            {review.name}
          </div>
          <div className="review-date text-gray-500 text-sm">
            {formatDate(review.date)}
          </div>
        </div>
        <div className="review-rating">
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>
      <p className="review-text text-gray-600 leading-relaxed">
        {review.text}
      </p>
    </div>
  );
};
