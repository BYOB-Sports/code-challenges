import React, { useState } from 'react';
import { StarRating } from './StarRating';

interface ReviewFormProps {
  onSubmit: (review: { name: string; rating: number; text: string }) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !text.trim() || rating === 0) {
      alert('Please fill in all fields and select a rating.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSubmit({ name: name.trim(), rating, text: text.trim() });
    
    // Reset form
    setName('');
    setRating(0);
    setText('');
    setIsSubmitting(false);
  };

  return (
    <div className="review-form bg-gray-50 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-bright-blue mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reviewer-name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="reviewer-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-bright-blue focus:outline-none transition-colors"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-2">
            <StarRating
              rating={rating}
              interactive={true}
              onRatingChange={setRating}
              size="lg"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="review-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your experience..."
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-forest-green focus:outline-none transition-colors resize-vertical min-h-[100px]"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-navy hover:bg-forest-green text-white py-3 px-6 rounded-lg font-medium hover:transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};
