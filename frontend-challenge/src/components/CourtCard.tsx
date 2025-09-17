import React, { memo } from 'react';
import type { TennisCourt } from '../types';
import { StarRating } from './StarRating';

interface CourtCardProps {
  court: TennisCourt;
  onClick: (courtId: number) => void;
}

export const CourtCard: React.FC<CourtCardProps> = memo(({ court, onClick }) => {
  const amenities = court.amenities.slice(0, 3).join(' • ');

  return (
    <div 
      className="court-card bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200 cursor-pointer transition-all duration-200 hover-lift hover:shadow-xl"
      onClick={() => onClick(court.id)}
    >
      <div className="court-header mb-3 md:mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="court-name text-lg md:text-xl font-semibold text-bright-blue leading-tight">
            {court.name}
          </h3>
          <div className="rating bg-gray-100 px-2.5 md:px-3 py-1 rounded-full flex items-center gap-1 text-xs md:text-sm font-medium ml-2">
            <StarRating rating={court.rating} size="sm" />
            <span>{court.rating}</span>
          </div>
        </div>
          <div className="court-location text-gray-600 text-sm md:text-sm flex items-center gap-1">
            <i className="fas fa-map-marker-alt text-bright-blue"></i>
          {court.location}
        </div>
      </div>
      
      <div className="court-info grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
        <div className="info-item flex items-center gap-2 text-sm text-gray-600">
          <i className="fas fa-dollar-sign text-forest-green w-4 flex-shrink-0"></i>
          <span className="truncate">{court.price}</span>
        </div>
        <div className="info-item flex items-center gap-2 text-sm text-gray-600">
          <i className="fas fa-clock text-bright-blue w-4 flex-shrink-0"></i>
          <span className="truncate">{court.hours}</span>
        </div>
        <div className="info-item flex items-center gap-2 text-sm text-gray-600">
          <i className="fas fa-layer-group text-forest-green w-4 flex-shrink-0"></i>
          <span className="truncate">{court.surface}</span>
        </div>
        <div className="info-item flex items-center gap-2 text-sm text-gray-600">
          <i className="fas fa-star text-bright-blue w-4 flex-shrink-0"></i>
          <span className="truncate">{court.reviewCount} reviews</span>
        </div>
      </div>
      
      <p className="court-description text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
        {court.description}
      </p>
      
      <div className="court-actions flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <span className="review-count text-gray-500 text-xs md:text-sm">
          {amenities}
        </span>
        <button 
          className="view-details-btn bg-navy hover:bg-forest-green text-white px-4 md:px-6 py-2 rounded-lg font-medium hover:transform hover:-translate-y-0.5 transition-all duration-200 tap-target w-full sm:w-auto"
          onClick={(e) => {
            e.stopPropagation();
            onClick(court.id);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
});
