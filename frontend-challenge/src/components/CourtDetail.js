import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courts, reviews as reviewsByCourtId } from '../data/courts';

const CourtDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courtId = Number(id);

  const court = useMemo(() => courts.find(c => c.id === courtId), [courtId]);
  const [localReviews, setLocalReviews] = useState(reviewsByCourtId[courtId] || []);

  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const computedRating = useMemo(() => {
    if (!localReviews.length && court) return court.rating;
    const baseCount = court?.reviewCount ?? 0;
    const baseTotal = (court?.rating ?? 0) * baseCount;
    const localTotal = localReviews.reduce((sum, r) => sum + r.rating, 0);
    const totalReviews = baseCount + localReviews.length;
    if (!totalReviews) return 0;
    return Math.round(((baseTotal + localTotal) / totalReviews) * 10) / 10;
  }, [localReviews, court]);

  const totalReviewCount = useMemo(() => {
    return (court?.reviewCount ?? 0) + localReviews.length;
  }, [localReviews, court]);

  const renderStars = (value) => {
    const stars = [];
    const full = Math.floor(value);
    const hasHalf = value % 1 !== 0;
    for (let i = 0; i < full; i++) stars.push(<span key={`f-${i}`} className="star">★</span>);
    if (hasHalf) stars.push(<span key="h" className="star">★</span>);
    for (let i = 0; i < 5 - Math.ceil(value); i++) stars.push(<span key={`e-${i}`} className="star empty">★</span>);
    return stars;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;
    const newReview = {
      id: Date.now(),
      author: author.trim(),
      rating: Number(rating),
      date: new Date().toISOString().slice(0, 10),
      text: text.trim()
    };
    setLocalReviews([newReview, ...localReviews]);
    setAuthor('');
    setRating(5);
    setText('');
  };

  if (!court) {
    return (
      <div className="container" style={{ padding: '16px' }}>
        <button className="button" onClick={() => navigate('/')}>← Back</button>
        <p>Could not find this court.</p>
      </div>
    );
  }

  return (
    <div className="court-detail">
      <header className="header">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="button" onClick={() => navigate('/')}>← Back</button>
          <h1 style={{ margin: 0 }}>{court.name}</h1>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 16, paddingBottom: 24 }}>
        <img src={court.image} alt={court.name} className="court-image" style={{ borderRadius: 12, width: '100%', height: 'auto', maxHeight: 260, objectFit: 'cover' }} />

        <div style={{ marginTop: 12 }}>
          <p className="court-location">📍 {court.location}</p>
          <div className="court-rating" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="stars">{renderStars(computedRating)}</div>
            <span className="rating-text">{computedRating} ({totalReviewCount} reviews)</span>
          </div>
          <div className="court-details" style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <span className="court-surface">{court.surface}</span>
            <span className="court-price" style={{ fontWeight: 600, color: '#2E7D32' }}>{court.price}</span>
            <span className="court-lighting" style={{ fontWeight: 500 }}>Lighting: {court.lighting}</span>
          </div>
          <p style={{ marginTop: 12 }}>{court.description}</p>
        </div>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>Leave a review</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="search-input"
            />
            <select value={rating} onChange={(e) => setRating(e.target.value)} className="search-input">
              {[5,4,3,2,1].map(r => (
                <option key={r} value={r}>{r} star{r > 1 ? 's' : ''}</option>
              ))}
            </select>
            <textarea
              placeholder="Share your experience..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="search-input"
              rows={4}
            />
            <button type="submit" className="button" style={{ alignSelf: 'start' }}>Submit review</button>
          </form>
        </section>

        <section style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 20, marginBottom: 12 }}>Recent reviews</h2>
          {localReviews.length === 0 ? (
            <p>No reviews yet. Be the first to leave one!</p>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {localReviews.map(r => (
                <div key={r.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{r.author}</strong>
                    <span>{'★'.repeat(r.rating)}</span>
                  </div>
                  <small style={{ color: '#666' }}>{r.date}</small>
                  <p style={{ marginTop: 8 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CourtDetail;




