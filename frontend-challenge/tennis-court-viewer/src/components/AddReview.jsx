import { useState } from 'react';
import StarRating from './StarRating';

const AddReview = ({ addReview }) => {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (rating == 0) {
      setError('Please select a rating');
      return;
    }
    if (!comment.trim()) {
      setError('Please write a review');
      return;
    }

    addReview({ username, rating, comment });
    setUsername('');
    setRating(0);
    setComment('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      {/* Prompt: Help me make the error message look professional when it appears */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Your name"
        className="w-fullborder  p-2 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <StarRating rating={rating} setRating={setRating} />

      <textarea
        placeholder="Write your review"
        className="w-full border p-2 rounded"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Review</button>
    </form>
  )
  
}

export default AddReview;