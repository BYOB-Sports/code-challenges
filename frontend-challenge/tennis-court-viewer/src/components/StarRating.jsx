// Prompt: Help me make it so ratings are made with stars rather than a drop-down.

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
        key={star}
        type="button"
        className={`text-2xl ${
          rating >= star ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => setRating(rating === star ? 0 : star)}
      >
        ★
      </button>
      ))}
    </div>
  );
}

export default StarRating;