import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import courts from '../data/courts';
import useCourtReviews from '../hooks/useCourtReviews';

const CourtDetail = () => {
  const { id } = useParams();
  const court = courts.find(c => c.id === id);
  const { reviews, addReview, average } = useCourtReviews(id);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please add your experience before submitting.');
      return;
    }
    const newReview = {
      id: String(Date.now()),
      name: name.trim() || 'Anonymous',
      rating: Number(rating),
      text: text.trim(),
      createdAt: new Date().toISOString()
    };
    addReview(newReview);
    setName('');
    setRating(5);
    setText('');
    setError('');
  };


  if (!court) {
    return (
      <div style={{ padding: 16 }}>
        <p>Court not found.</p>
        <Link to="/courts">Back to Courts</Link>
      </div>
    );
  }

  return (
    <div className="court-detail" style={{ paddingBottom: 24 }}>
      <div style={{ padding: 16 }}>
        <Link to="/courts" style={{ display: 'inline-block', marginBottom: 8, background: 'white', padding: '8px 12px', borderRadius: 8, textDecoration: 'none', color: '#111827', border: '1px solid #e5e7eb' }}>Back</Link>
        <h2 style={{ marginBottom: 4 }}>{court.name}</h2>
        <div style={{ color: '#6b7280', fontSize: 14 }}>{court.address}</div>
        <div style={{ marginTop: 8 }}>⭐ {average || court.rating} ({reviews.length})</div>
        <div style={{ marginTop: 8, fontSize: 14 }}>{court.surface} • {court.isIndoor ? 'Indoor' : 'Outdoor'} • {court.hasLights ? 'Lights' : 'No lights'}</div>
      </div>

      <div style={{ padding: 16 }}>
        <h3 style={{ marginBottom: 8 }}>Leave a review</h3>
        <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (optional)" style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }} />
          <select value={rating} onChange={e => setRating(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db' }}>
            {[5,4,3,2,1].map(n => (
              <option key={n} value={n}>{n} stars</option>
            ))}
          </select>
          <textarea value={text} onChange={e => { setText(e.target.value); if (error && e.target.value.trim()) { setError(''); } }} placeholder="Share your experience" rows={4} style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db', resize: 'vertical' }} />
          {error ? <div style={{ color: '#b91c1c', fontSize: 12 }} role="alert" aria-live="polite">{error}</div> : null}
          <button type="submit" style={{ padding: '10px 14px', borderRadius: 8, background: '#111827', color: 'white', border: 'none' }}>Submit review</button>
        </form>
      </div>

      <div style={{ padding: 16 }}>
        <h3 style={{ marginBottom: 8 }}>Reviews</h3>
        {reviews.length === 0 ? (
          <div style={{ color: '#6b7280' }}>No reviews yet. Be the first to review.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            {reviews.map(r => (
              <li key={r.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <strong>{r.name}</strong>
                  <span>⭐ {r.rating}</span>
                </div>
                {r.text && <div style={{ whiteSpace: 'pre-wrap' }}>{r.text}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourtDetail;


