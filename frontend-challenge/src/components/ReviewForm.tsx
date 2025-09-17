import { useState } from 'react'
import { saveReview } from '../utils/storage'

type Review = { user: string; comment: string; rating: number }
type Court = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: Review[];
  image?: string;
}

export default function ReviewForm({ court, onNewReview }: { court: Court; onNewReview: (rev: Review)=>void }) {
  const [user, setUser] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReview = { user: user.trim(), comment: comment.trim(), rating }
    if (!newReview.user || !newReview.comment) return
    saveReview(court.id, newReview)
    onNewReview(newReview)
    setUser(''); setComment(''); setRating(5)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <h3 className="font-semibold">Leave a review</h3>
      <input
        className="w-full border rounded-xl px-3 py-2 text-sm"
        placeholder="Your name"
        value={user} onChange={e => setUser(e.target.value)}
        required
      />
      <textarea
        className="w-full border rounded-xl px-3 py-2 text-sm"
        placeholder="Your thoughts about this court"
        value={comment} onChange={e => setComment(e.target.value)}
        required
        rows={3}
      />
      <label className="block text-sm">Rating (1-5)</label>
      <input
        type="number" min={1} max={5}
        className="w-full border rounded-xl px-3 py-2 text-sm"
        value={rating} onChange={e => setRating(Number(e.target.value))}
      />
      <button className="w-full rounded-2xl bg-primary text-white py-3 font-medium">Submit</button>
    </form>
  )
}
