import React, { useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ALL_COURTS } from '../lib/data'
import { RatingStars } from '../components/RatingStars'
import { ReviewForm } from '../components/ReviewForm'
  import { Toast } from '../components/Toast'
import { addReview, getAverageFromReviews, getReviews } from '../lib/storage'

export function CourtDetail() {
    const [toastOpen, setToastOpen] = React.useState(false)
  const { id } = useParams<{id: string}>()
  const nav = useNavigate()
  const court = useMemo(() => ALL_COURTS.find(c => c.id === id), [id])

  if (!court) {
    return (
      <div className="space-y-3">
        <p>Not found.</p>
        <button onClick={()=> nav(-1)} className="underline">Go back</button>
      </div>
    )
  }

  const userAvg = getAverageFromReviews(court.id)
  const avgToShow = userAvg ?? court.avgRating
  const reviews = getReviews(court.id)

  return (
    <div className="space-y-4">
      <Link to="/" className="text-sm text-indigo-400 underline">← Back to list</Link>

      <article className="card overflow-hidden">
        <img src={court.img} alt={court.name} className="w-full h-56 object-cover" />
        <div className="mt-3">
          <h1 className="text-xl font-semibold">{court.name}</h1>
          <p className="text-sm text-slate-400">{court.city}, {court.state}</p>
          <div className="mt-2"><RatingStars value={avgToShow} /></div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="rounded-full bg-slate-800 px-2 py-1">{court.surface}</span>
            <span className="rounded-full bg-slate-800 px-2 py-1">{court.indoor ? 'indoor' : 'outdoor'}</span>
            {court.lights && <span className="rounded-full bg-slate-800 px-2 py-1">lights</span>}
            <span className="rounded-full bg-slate-800 px-2 py-1">{court.courts} courts</span>
          </div>
        </div>
      </article>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Reviews ({reviews.length})</h2>
        {reviews.length === 0 && (
          <p className="text-sm text-slate-400">No reviews yet. Be the first!</p>
        )}
        <ul className="space-y-3">
          {reviews.map(r => (
            <li key={r.id} className="card">
              <div className="flex items-center justify-between">
                <strong>{r.author}</strong>
                <span className="text-sm text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-1">
                <span className="text-yellow-400">{'★'.repeat(r.rating)}</span>
                <span className="text-slate-400 ml-2">{r.rating}/5</span>
              </div>
              {r.text && <p className="mt-2 text-slate-200 text-sm">{r.text}</p>}
            </li>
          ))}
        </ul>
      </section>

      <ReviewForm onSubmit={(rating, author, text) => {
        const idStr = Math.random().toString(36).slice(2)
        addReview({ id: idStr, courtId: court.id, rating, author, text, createdAt: new Date().toISOString() })
        // Force a re-render by navigating to same route (simple hack for brevity)
        window.location.reload()
      }} />
    </div>
  )
}
