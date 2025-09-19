// Prompt: Help me make it so ratings are displayed with stars rather than a number.

const StarDisplay = ({ rating }) => {
const fullStars = Math.floor(rating);
const hasHalfStar = rating % 1 !== 0;
const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">★</span>
        ))}
        {hasHalfStar && (
          <span className="text-yellow-400 text-sm">☆</span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300 text-sm">★</span>
        ))}
      </div>
      <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  )
}

export default StarDisplay;