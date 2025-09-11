import { Review } from "@/models/types";
import { Star } from "lucide-react";

const ReviewItem: React.FC<{ review: Review }> = ({ review }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating);

  return (
    <div className="p-4 border border-base-200 rounded-xl shadow-sm bg-base-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-sm">{"Anonymous"}</p>
        <time className="text-xs text-gray-500">{review.date}</time>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {stars.map((filled, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              filled ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
      </div>

      {/* Comment */}
      <p className="text-sm text-gray-800">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;
