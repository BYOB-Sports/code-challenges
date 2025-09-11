import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { averageFrom } from '../lib/rating';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import { loadCourts, saveCourts } from '../lib/storage';
import type { Court, Review } from '../data/courts';

export default function CourtDetailPage() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    setCourts(loadCourts());
  }, []);
  
const court = useMemo(() => courts.find(c => c.id === id), [courts, id]);
if (!court) { /* render 'not found' and return */ }


  if (!court) {
    return (
      <>
        <header className="header"><h1 className="h1">Court not found</h1></header>
        <div className="container"><button className="btn" onClick={() => nav('/')}>Back</button></div>
      </>
    );
  }

  const avg = averageFrom(court.reviews);

 function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

  function addReview(rating: number, text: string) {
    if (!id) return;
    setCourts(prev => {
      const next = prev.map(c => {
        if (c.id !== id) return c;
        const newReview: Review = {
          id: newId(),
          rating,
          text,
          createdAt: Date.now()
        };
        return { ...c, reviews: [...c.reviews, newReview] };
      });
      saveCourts(next);
      return next;
    });
  }

  return (
    <>
      <header className="header">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <Link to="/" className="btn" aria-label="Back">←</Link>
          <h1 className="h1" style={{ margin: '0 auto' }}>Court</h1>
          <span style={{ width: 40 }}></span>
        </div>
      </header>

      <div className="container">
        <section className="card">
          <div style={{ fontWeight: 600, fontSize: 18 }}>{court.name}</div>
          <div className="meta">{court.city} • {court.surface} • {court.courtsCount} courts</div>
          <div className="spacer" />
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div>
              <div className="label">Average rating</div>
              <div style={{ fontWeight: 700, fontSize: 20 }}>{avg.toFixed(1)}</div>
            </div>
            <StarRating value={Math.round(avg)} />
          </div>
        </section>

        <div className="spacer" />

        <ReviewForm onSubmit={addReview} />

        <div className="spacer" />

        <section>
          <div className="sectionTitle">Recent reviews</div>
          <div className="grid">
            {court.reviews.slice().reverse().map(r => (
              <article key={r.id} className="card">
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="meta">{new Date(r.createdAt).toLocaleDateString()}</div>
                  <div style={{ fontWeight: 700 }}>{r.rating}★</div>
                </div>
                <div style={{ marginTop: 6 }}>{r.text}</div>
              </article>
            ))}
            {!court.reviews.length && <div className="meta">No reviews yet — be the first!</div>}
          </div>
        </section>
      </div>
    </>
  );
}
