"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface RatingInputProps {
  value: number
  onChange: (rating: number) => void
  size?: "sm" | "md" | "lg"
}

export function RatingInput({ value, onChange, size = "md" }: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const handleClick = (rating: number) => {
    onChange(rating)
  }

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || value)
        const isHalf = !hoverRating && star - 0.5 === value

        return (
          <button
            key={star}
            type="button"
            className={`${sizeClasses[size]} transition-colors hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            <Star
              className={`w-full h-full transition-colors ${
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : isHalf
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
              }`}
            />
          </button>
        )
      })}

      {/* Half-star buttons */}
      <div className="flex items-center gap-1 ml-2">
        {[0.5, 1.5, 2.5, 3.5, 4.5].map((halfStar) => (
          <button
            key={halfStar}
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-1 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            onClick={() => handleClick(halfStar)}
          >
            {halfStar}
          </button>
        ))}
      </div>
    </div>
  )
}
