import React, { memo, useCallback } from 'react';

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = memo(({
  rating,
  interactive = false,
  onRatingChange,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const handleStarClick = useCallback((starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  }, [interactive, onRatingChange]);

  const handleMouseEnter = useCallback(() => {
    // no-op to avoid unused variable when interactive
  }, []);

  const renderStar = (index: number) => {
    const starRating = index + 1;
    let starClass = 'far fa-star text-gray-300';
    
    if (starRating <= Math.floor(rating)) {
      starClass = 'fas fa-star text-yellow-400';
    } else if (starRating === Math.ceil(rating) && rating % 1 !== 0) {
      starClass = 'fas fa-star-half-alt text-yellow-400';
    }

    return (
      <button
        key={index}
        type="button"
        className={`${starClass} ${sizeClasses[size]} ${
          interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
        }`}
        onClick={() => handleStarClick(starRating)}
        onMouseEnter={handleMouseEnter}
        disabled={!interactive}
      />
    );
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map(renderStar)}
    </div>
  );
});
