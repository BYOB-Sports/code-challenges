import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Court } from '../types'
import ReviewForm from '../ui/ReviewForm'
import { ArrowLeft, Star } from 'lucide-react'

export default function Detail({ courts, onUpdate }: { courts: Court[], onUpdate: (c: Court) => void }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const court = courts.find(c => c.id === id)
  if (!court) return <div className="p-4">Court not found</div>

  const addReview = (r: any) => {
    const updated = { ...court, reviews: [{ ...r, id: `${Date.now()}` }, ...court.reviews] }
    const avg = updated.reviews.reduce((s: any, x: any) => s + x.rating, 0) / updated.reviews.length
    updated.rating = Math.round(avg * 10) / 10
    onUpdate(updated)
  }

  return (
    <div>
      {/* Back button with icon */}
      <button
        className="flex items-center gap-1 text-blue-600 mb-3"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Court Detail */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-md mb-4">
        <img src={court.image} alt={court.name} className="w-full h-44 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{court.name}</h2>
          <div className="flex items-center mt-1 text-sm text-gray-600 gap-2">
            <span>{court.location}</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" /> {court.rating}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-700">{court.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {court.tags.map(t => (
              <span key={t} className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-4">
       
        <ReviewForm onSubmit={addReview} />
      <div className="text-center font-semibold text-gray-700 mt-2">Latest Reviews</div>
       <div className="mt-3 space-y-3">
          {court.reviews.map(r => (
            <div
              key={r.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden p-4 cursor-pointer hover:scale-[1.01] transition"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{r.author}</div>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                  <Star className="w-4 h-4" /> {r.rating}
                </div>
              </div>
              <div className="text-sm text-gray-700 mt-1">{r.comment}</div>
              <div className="text-xs text-gray-400 mt-2">{new Date(r.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
