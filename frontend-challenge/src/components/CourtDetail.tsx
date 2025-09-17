import React from 'react';
import type { TennisCourt } from '../types';
import { StarRating } from './StarRating';
import { ReviewForm } from './ReviewForm';
import { ReviewItem } from './ReviewItem';

interface CourtDetailProps {
  court: TennisCourt;
  onReviewSubmit: (review: { name: string; rating: number; text: string }) => void;
}

export const CourtDetail: React.FC<CourtDetailProps> = ({
  court,
  onReviewSubmit
}) => {
  return (
    <div className="court-detail max-w-2xl mx-auto px-4">
      <div className="court-hero bg-white rounded-2xl p-4 md:p-8 mb-6 md:mb-8 shadow-lg border border-gray-200">
        <div className="court-hero-header mb-4 md:mb-6">
          <h1 className="court-hero-name text-2xl md:text-3xl font-bold text-bright-blue mb-2">
            {court.name}
          </h1>
          <div className="court-hero-location text-gray-600 text-base md:text-lg flex items-center gap-2 mb-3">
            <i className="fas fa-map-marker-alt text-bright-blue"></i>
            {court.location}
          </div>
          <div className="court-hero-rating bg-gray-100 px-3 md:px-4 py-2 rounded-full flex items-center gap-2 text-sm md:text-lg font-semibold w-fit">
            <StarRating rating={court.rating} size="md" />
            <span>{court.rating} ({court.reviewCount} reviews)</span>
          </div>
        </div>
        
        <div className="court-hero-info grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="hero-info-item flex items-center gap-3 text-gray-600">
            <i className="fas fa-dollar-sign text-forest-green text-lg md:text-xl"></i>
            <span className="text-sm md:text-base">{court.price}</span>
          </div>
          <div className="hero-info-item flex items-center gap-3 text-gray-600">
            <i className="fas fa-clock text-bright-blue text-lg md:text-xl"></i>
            <span className="text-sm md:text-base">{court.hours}</span>
          </div>
          <div className="hero-info-item flex items-center gap-3 text-gray-600">
            <i className="fas fa-layer-group text-forest-green text-lg md:text-xl"></i>
            <span className="text-sm md:text-base">{court.surface} Court</span>
          </div>
          <div className="hero-info-item flex items-center gap-3 text-gray-600">
            <i className="fas fa-map-marker-alt text-bright-blue text-lg md:text-xl"></i>
            <span className="text-xs md:text-sm">{court.address}</span>
          </div>
        </div>
        
        <p className="court-hero-description text-gray-600 leading-relaxed">
          {court.description}
        </p>
      </div>
      
      <div className="reviews-section bg-white rounded-2xl p-4 md:p-8 shadow-lg border border-gray-200">
        <div className="reviews-header mb-6">
          <h2 className="reviews-title text-2xl font-semibold text-bright-blue">
            Reviews
          </h2>
        </div>
        
        <ReviewForm onSubmit={onReviewSubmit} />
        
        <div className="reviews-list space-y-6">
          {court.reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};
