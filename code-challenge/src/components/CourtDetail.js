import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addReview, getCourtById, getReviews } from '../api/courtsApi';

const CourtDetail = () => {
  const { courtId } = useParams();
  const [loading, setLoading] = useState(true);
  const [court, setCourt] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ author: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [c, r] = await Promise.all([
        getCourtById(courtId),
        getReviews(courtId)
      ]);
      setCourt(c);
      setReviews(r);
      setLoading(false);
    };
    load();
  }, [courtId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.comment.trim()) {
      setError('Please add a short comment.');
      return;
    }
    setSubmitting(true);
    try {
      const { court: updatedCourt, reviews: updatedReviews } = await addReview(courtId, form);
      setCourt(updatedCourt);
      setReviews(updatedReviews);
      setForm({ author: '', rating: 5, comment: '' });
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="muted">Loading…</p>;
  if (!court) return <p className="muted">Court not found.</p>;

  return (
    <div className="container">
      <nav className="breadcrumb"><Link to="/">← Back to courts</Link></nav>
      <article className="detail">
        <img
          className="heroImg"
          src={court.imageUrl}
          alt={`${court.name} court`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml;utf8,' +
              encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#475569" font-family="Arial" font-size="24">Image unavailable</text></svg>`
              );
          }}
        />
        <div className="detailBody">
          <h1 className="title">{court.name}</h1>
          <p className="cardMeta">{court.location} • {court.surface}</p>
          <p className="rating"><strong>⭐ {court.averageRating.toFixed(1)}</strong> <span className="muted">({court.reviewsCount})</span></p>
        </div>
      </article>

      <section className="panel">
        <h2 className="sectionTitle">Leave a review</h2>
        <form onSubmit={onSubmit} className="form">
          <div className="field">
            <label>Name</label>
            <input
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Your name (optional)"
            />
          </div>
          <div className="field">
            <label>Rating: {form.rating}</label>
            <input
              type="range"
              min="1" max="5" step="1"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            />
          </div>
          <div className="field">
            <label>Comment</label>
            <textarea
              rows="3"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              placeholder="Share your experience with this court"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit Review'}</button>
        </form>
      </section>

      <section className="panel">
        <h2 className="sectionTitle">Recent reviews</h2>
        {reviews.length === 0 ? (
          <p className="muted">No reviews yet. Be the first!</p>
        ) : (
          <ul className="reviews">
            {reviews.map(r => (
              <li key={r.id} className="review">
                <div className="reviewHeader">
                  <strong>{r.author}</strong>
                  <span className="muted">⭐ {r.rating} • {new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{r.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default CourtDetail;


