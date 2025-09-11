import { useState } from 'react';
import StarRating from './StarRating';

export default function ReviewForm({ onSubmit }:{ onSubmit:(rating:number, text:string)=>void }) {
  const [rating, setRating] = useState(4);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const canGo = rating>=1 && rating<=5 && text.trim().length>=2 && !busy;

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    if (!canGo) return;
    setBusy(true);
    await Promise.resolve(onSubmit(rating, text.trim()));
    setText('');
    setBusy(false);
  }

  return (
    <form className="card" onSubmit={handle}>
      <div className="label">Leave a review</div>
      <StarRating value={rating} onChange={setRating} />
      <div className="spacer" />
      <textarea className="input" rows={4} placeholder="Thoughts about the courts..."
                value={text} onChange={e=>setText(e.target.value)} />
      <div className="spacer" />
      <button className="btn" disabled={!canGo} aria-busy={busy} type="submit">
        {busy ? 'Submitting…' : 'Submit review'}
      </button>
    </form>
  );
}
