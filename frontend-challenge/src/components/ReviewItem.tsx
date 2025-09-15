// ReviewItem displays a single review with user, text, and star rating.
// Props:
//   review: Review object to display
import React from 'react';
import type { Review } from '../mock/courts';

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-bold">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{ color: i < review.rating ? '#facc15' : '#fff' }} // yellow for selected, white for others
            >
              ★
            </span>
          ))}
        </span>
        <span className="text-xs text-gray-500">{review.rating} / 5</span>
      </div>
      <p className="text-gray-800 text-sm mb-2">"{review.text}"</p>
      <span className="text-xs text-gray-500">— {review.user}</span>
    </div>
  );
};

export default ReviewItem;
