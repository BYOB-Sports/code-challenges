import React, { useState } from 'react'

type Props = {
  onSubmit: (rating: number, author: string, text: string) => void
}

export function ReviewForm({ onSubmit }: Props) {
  const [rating, setRating] = useState(5)
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')

  return (
    <form
      className="card"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(rating, author || 'Anonymous', text.trim())
        setAuthor(''); setText(''); setRating(5)
      }}
    >
      <h3 className="text-lg font-semibold mb-2">Leave a review</h3>
      <label className="block mb-3">
        <span className="block text-sm text-slate-300 mb-1">Your name</span>
        <input
          type="text"
          className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label className="block mb-3">
        <span className="block text-sm text-slate-300 mb-1">Rating</span>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={rating}
          onChange={(e)=> setRating(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-slate-400 mt-1">Selected: {rating} / 5</div>
      </label>
      <label className="block mb-4">
        <span className="block text-sm text-slate-300 mb-1">Your review</span>
        <textarea
          className="w-full min-h-[96px] rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="What did you like or not like?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center rounded-2xl px-4 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
      >
        Submit review
      </button>
    </form>
  )
}
