import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from "../components/Header";
import RatingStars from "../components/RatingStars";
import ReviewForm from "../components/ReviewForm";
import { getReviews } from "../utils/storage";


type Review = { user: string; comment: string; rating: number }
type Court = { id: number; name: string; location: string; rating: number; reviews: Review[]; image?: string }

export default function CourtDetail() {
  const { id } = useParams()
  const [court, setCourt] = useState<Court | null>(null)
  const [extraReviews, setExtraReviews] = useState<Review[]>([])

  useEffect(() => {
    fetch('/courts.json').then(r => r.json()).then((data: Court[]) => {
      const found = data.find(c => String(c.id) === id)
      if (found) {
        setCourt(found)
        setExtraReviews(getReviews(found.id))
      }
    })
  }, [id])

  const reviews = useMemo(() => {
    if (!court) return []
    return [...court.reviews, ...extraReviews]
  }, [court, extraReviews])

  const avg = useMemo(() => {
    if (!reviews.length) return court?.rating ?? 0
    const sum = reviews.reduce((a, r) => a + r.rating, 0)
    return sum / reviews.length
  }, [reviews, court])

  const onNewReview = (rev: Review) => setExtraReviews(prev => [...prev, rev])

  if (!court) return <div className="container-default py-6">Loading...</div>

  return (
    <>
      <Header />
      <main className="container-default py-4">
        <Link to="/" className="text-sm text-primary">&larr; Back</Link>

        <h1 className="mt-2 text-xl font-semibold">{court.name}</h1>
        <p className="text-sm text-neutral-600">{court.location}</p>

        <div className="mt-3">
          <div className="h-44 w-full rounded-xl bg-neutral-200 overflow-hidden">
            {court.image ? (
              <img src={court.image} alt={court.name} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20" />
            )}
          </div>
        </div>

        <div className="mt-3 text-sm flex items-center gap-2">
          <RatingStars value={avg} /> <span>{avg.toFixed(1)}</span>
          <span className="text-neutral-400">·</span>
          <span>{reviews.length} reviews</span>
        </div>

        <section className="mt-5">
          <h2 className="font-semibold mb-2">Reviews</h2>
          <ul className="space-y-2">
            {reviews.map((r, i) => (
              <li key={i} className="border rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <strong className="text-sm">{r.user}</strong>
                  <span className="text-xs">⭐ {r.rating}</span>
                </div>
                <p className="text-sm mt-1">{r.comment}</p>
              </li>
            ))}
            {reviews.length === 0 && (
              <p className="text-neutral-500 text-sm">No reviews yet. Be the first!</p>
            )}
          </ul>

          <ReviewForm court={court} onNewReview={onNewReview} />
        </section>
      </main>
    </>
  )
}
