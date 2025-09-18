import { Star, StarHalf } from "lucide-react"
import { getRatingStars } from "@/lib/rating"

interface RatingStarsProps {
  rating: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
}

export function RatingStars({ rating, size = "md", showValue = false }: RatingStarsProps) {
  const { full, half, empty } = getRatingStars(rating)

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`full-${i}`} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
        ))}

        {/* Half star */}
        {half && <StarHalf className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />}

        {/* Empty stars */}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`empty-${i}`} className={`${sizeClasses[size]} text-gray-300`} />
        ))}
      </div>

      {showValue && <span className={`${textSizeClasses[size]} text-muted-foreground ml-1`}>{rating.toFixed(1)}</span>}
    </div>
  )
}
