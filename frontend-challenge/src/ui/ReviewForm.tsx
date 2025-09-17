import React, { useState } from 'react'
import { Star } from 'lucide-react'

export default function ReviewForm({ onSubmit }: { onSubmit: (r:any)=>void }) {
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const submit = (e:any) => {
    e.preventDefault()
    if (!author.trim() || !comment.trim()) return alert('Please enter name and comment')
    onSubmit({ author, rating, comment, date: new Date().toISOString() })
    setAuthor(''); setComment(''); setRating(5)
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white p-4 rounded-2xl shadow-md w-full max-w-md mx-auto flex flex-col gap-3"
    >
      <h3 className="text-base font-semibold text-slate-800 text-center mb-1">Post Your Review</h3>

      {/* Author input */}
      <div className="bg-white rounded p-2 flex items-center shadow-sm border border-gray-200">
        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Your name"
          className="flex-1 p-1 outline-none text-sm"
        />
      </div>

      {/* Comment textarea */}
      <div className="bg-white rounded p-2 shadow-sm border border-gray-200">
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Write a short review..."
          className="w-full p-1 outline-none text-sm resize-none"
          rows={4}
        />
      </div>

      {/* Star rating */}
      <div className="flex justify-between w-full px-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

     {/* Submit button */}
     <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </div>
    </form>
  )
}
