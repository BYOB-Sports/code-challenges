import React, { useState } from 'react';
import RatingStars from './RatingStars';

type Props = {
  onSubmit: (data: { author: string; rating: 1 | 2 | 3 | 4 | 5; comment: string }) => void;
};

export default function ReviewForm({ onSubmit }: Props) {
  const [author, setAuthor] = useState('You');
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [comment, setComment] = useState('');

  return (
    <form
      className="card form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        onSubmit({ author: author.trim() || 'Anonymous', rating, comment: comment.trim() });
        setComment('');
        setRating(5);
      }}
    >
      <div className="form-row">
        <label>
          Name
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
        </label>
      </div>
      <div className="form-row">
        <label>Rating</label>
        <RatingStars value={rating} onChange={setRating} size={22} />
      </div>
      <div className="form-row">
        <label>
          Comment
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience" rows={3} />
        </label>
      </div>
      <button type="submit" className="btn primary" disabled={!comment.trim()}>
        Submit Review
      </button>
    </form>
  );
}


