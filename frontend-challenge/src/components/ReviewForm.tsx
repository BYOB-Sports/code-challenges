// ReviewForm allows users to submit a review with text and star rating.
// Props:
//   onSubmit: Function called with review text and rating
import React, { useState } from 'react';

// ...existing code...
interface ReviewFormProps {
  onSubmit: (text: string, rating: number) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text, rating);
  setText('');
  setRating(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col gap-2 border border-gray-200">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write your review..."
        className="border border-gray-300 rounded-lg p-2 resize-none min-h-[60px] focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">Rating:</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setRating(i + 1)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              aria-label={`Rate ${i + 1} star${i > 0 ? 's' : ''}`}
            >
              <span style={{ fontSize: '1.5rem', color: i < rating ? '#facc15' : '#fff' }}>★</span>
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-2">{rating} / 5</span>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-2 hover:bg-blue-600 transition-colors shadow"
        disabled={!text.trim()}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
