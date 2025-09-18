import React, { useMemo, useState } from 'react';
import courts from './mockCourts';
import { addReview, readReviewsByCourtId } from './storage';

function useCourt(courtId) {
  return useMemo(() => courts.find((c) => c.id === courtId) || null, [courtId]);
}

function useReviews(courtId) {
  const [version, setVersion] = useState(0);
  const reviews = useMemo(() => readReviewsByCourtId(courtId), [courtId, version]);
  const refresh = () => setVersion((v) => v + 1);
  return [reviews, refresh];
}

const courtImages = [
  'https://plus.unsplash.com/premium_photo-1663039984787-b11d7240f592?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://unsplash.com/photos/iiWhddT4SB4/download?force=true&w=1200',
  'https://unsplash.com/photos/pSr9S6po7Ps/download?force=true&w=1200',
  'https://unsplash.com/photos/yoIt3Wxe0sI/download?force=true&w=1200',
  'https://unsplash.com/photos/otO3MXSXe4w/download?force=true&w=1200'
];

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', className: 'icon' };
  if (name === 'bulb') {
    return (
      <svg {...common}>
        <path d="M9 18h6M12 2c3.314 0 6 2.686 6 6 0 2.094-.974 3.472-2.136 4.658-.803.822-1.364 1.812-1.63 2.918H9.766c-.266-1.106-.827-2.096-1.63-2.918C6.974 11.472 6 10.094 6 8c0-3.314 2.686-6 6-6Z" />
      </svg>
    );
  }
  if (name === 'bulb-off') {
    return (
      <svg {...common}>
        <path d="M9 18h6" />
        <path d="M3 3l18 18" />
        <path d="M12 2c3.314 0 6 2.686 6 6 0 2.094-.974 3.472-2.136 4.658-.803.822-1.364 1.812-1.63 2.918H9.766c-.266-1.106-.827-2.096-1.63-2.918C6.974 11.472 6 10.094 6 8c0-3.314 2.686-6 6-6Z" />
      </svg>
    );
  }
  if (name === 'indoor') {
    return (
      <svg {...common}>
        <path d="M3 10l9-6 9 6v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z" />
        <path d="M9 20v-6a3 3 0 1 1 6 0v6" />
      </svg>
    );
  }
  if (name === 'outdoor') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    );
  }
  if (name === 'courts') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="7" height="14" rx="1" />
        <rect x="14" y="5" width="7" height="14" rx="1" />
        <path d="M6.5 5v14M17.5 5v14" />
      </svg>
    );
  }
  return null;
}

function Star({ filled }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
      <path
        className="star-path"
        d="M12 3.5l2.944 5.964 6.586.957-4.765 4.646 1.125 6.56L12 18.934 6.11 21.627l1.125-6.56L2.47 10.42l6.586-.957L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SmallStar() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="icon">
      <path d="M12 3.5l2.944 5.964 6.586.957-4.765 4.646 1.125 6.56L12 18.934 6.11 21.627l1.125-6.56L2.47 10.42l6.586-.957L12 3.5z" />
    </svg>
  );
}

export default function CourtDetail({ courtId, onBack }) {
  const court = useCourt(courtId);
  const [reviews, refreshReviews] = useReviews(courtId);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [sortBy, setSortBy] = useState('date-newest');

  const averageRating = useMemo(() => {
    if (!reviews.length) return null;
    const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const sortedReviews = useMemo(() => {
    const clone = reviews.slice();
    if (sortBy === 'rating-high') {
      clone.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    } else if (sortBy === 'rating-low') {
      clone.sort((a, b) => Number(a.rating || 0) - Number(b.rating || 0));
    } else if (sortBy === 'date-old') {
      clone.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      clone.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return clone;
  }, [reviews, sortBy]);

  if (!court) {
    return (
      <div className="court-detail">
        <button className="back back-dark" onClick={onBack}>Back</button>
        <p>Could not find that court.</p>
      </div>
    );
  }

  function submitReview(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    addReview(court.id, { name: name.trim(), rating: Number(rating), text: text.trim(), date: new Date().toISOString() });
    setName('');
    setRating(5);
    setText('');
    refreshReviews();
  }

  return (
    <div className="court-detail">
      <button className="back back-dark" onClick={onBack}>Back</button>
      <div className="hero">
        <div className="detail-image">
          <img src={courtImages[(Number(court.id) - 1) % courtImages.length]} alt={court.name} loading="lazy" />
        </div>
        <div className="title">
          <h1>{court.name}</h1>
          <div className="row meta">
            <span>{court.city}, {court.state}</span>
            <span className="right">
              <span className="pill">{court.surface}</span>
              {averageRating && (
                <span className="avg-inline" title="Average rating">
                  <strong>{averageRating}</strong>
                  <button
                    type="button"
                    className="reviews-link"
                    onClick={() => {
                      const el = document.getElementById('reviews');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    aria-label={`View ${reviews.length} reviews`}
                  >
                    ({reviews.length})
                  </button>
                  <SmallStar />
                </span>
              )}
            </span>
          </div>
          <div className="row small">
            <span className="meta-count"><Icon name="courts" /> {court.courtsCount} courts</span>
            <span><Icon name={court.isIndoor ? 'indoor' : 'outdoor'} /> {court.isIndoor ? 'Indoor' : 'Outdoor'}</span>
            <span><Icon name={court.hasLights ? 'bulb' : 'bulb-off'} /> {court.hasLights ? 'Lights' : 'No Lights'}</span>
          </div>
        </div>
      </div>

      <section className="add-review">
        <h2>Leave a review</h2>
        <form onSubmit={submitReview}>
          <label>
            <span>Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>
          <label className="rating-stars">
            <span>Rating</span>
            <div className="stars" role="radiogroup" aria-label="Rating">
              {[1,2,3,4,5].map((r) => (
                <button
                  type="button"
                  key={r}
                  className={`star ${r <= rating ? 'active' : ''}`}
                  onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                  onFocus={(e) => e.currentTarget.classList.add('hovered')}
                  onBlur={(e) => e.currentTarget.classList.remove('hovered')}
                  onClick={() => setRating(r)}
                  aria-pressed={r <= rating}
                  aria-label={`${r} star${r > 1 ? 's' : ''}`}
                >
                  <Star filled={r <= rating} />
                </button>
              ))}
            </div>
          </label>
          <label>
            <span>Review</span>
            <textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Share your experience" />
          </label>
          <button type="submit" disabled={!name.trim() || !text.trim()}>Submit</button>
        </form>
      </section>

      <section className="reviews" id="reviews">
        <div className="reviews-head">
          <h2>Reviews</h2>
          <label className="sort">
            <span>Sort</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date-newest">Date: Newest</option>
              <option value="date-old">Date: Oldest</option>
              <option value="rating-high">Rating: Highest</option>
              <option value="rating-low">Rating: Lowest</option>
            </select>
          </label>
        </div>
        {reviews.length === 0 && <p className="empty">No reviews yet. Be the first!</p>}
        <ul className="review-list">
          {sortedReviews.map((r) => (
            <li key={r.id} className="review">
              <div className="head">
                <div className="who">
                  <strong>{r.name}</strong>
                  <span className="date">{new Date(r.date).toLocaleDateString()}</span>
                </div>
                <div className="rating-badge"><SmallStar /> <span className="num">{r.rating}</span></div>
              </div>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}


