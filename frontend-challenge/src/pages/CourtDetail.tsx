import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourts } from '../store/CourtsContext';
import RatingStars from '../components/RatingStars';
import ReviewForm from '../components/ReviewForm';

export default function CourtDetail() {
  const { courtId } = useParams();
  const { courts, reviewsByCourtId, getAverageRating, addReview } = useCourts();

  const court = useMemo(() => courts.find((c) => c.id === courtId), [courts, courtId]);

  if (!court) {
    return (
      <div className="container">
        <div className="empty-state">Court not found.</div>
        <Link to="/" className="btn">Back to list</Link>
      </div>
    );
  }

  const reviews = reviewsByCourtId[court.id] ?? [];
  const avg = getAverageRating(court.id);

  return (
    <div className="container">
      <Link to="/" className=" back btn">← Back</Link>
      <div className="card">
        <div className="card-title">{court.name}</div>
        <div className="card-sub">{court.city}, {court.state}</div>
        <div className="card-row">
          <span className={`badge ${court.surface}`}>{court.surface}</span>
          {court.indoor && <span className="badge neutral">indoor</span>}
          {court.lighted && <span className="badge neutral">lights</span>}
          <span className="badge neutral">{court.numCourts} courts</span>
        </div>
        <div className="card-row">
          <RatingStars value={avg} />
          <span className="muted">{avg.toFixed(1)} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <section>
        <h3>Reviews</h3>
        <div className="stack">
          {reviews.map((r) => (
            <div key={r.id} className="card">
              <div className="card-row space-between">
                <strong>{r.author}</strong>
                <span className="muted">{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
              <RatingStars value={r.rating} />
              <p>{r.comment}</p>
            </div>
          ))}
          {reviews.length === 0 && (
            <div className="empty-state">No reviews yet. Be the first to review!</div>
          )}
        </div>
      </section>

      <section>
        <h3>Leave a Review</h3>
        <ReviewForm
          onSubmit={({ author, rating, comment }) => {
            addReview(court.id, author, rating, comment);
          }}
        />
      </section>
    </div>
  );
}


