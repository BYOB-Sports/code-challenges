import { Star, MessageCircle } from 'lucide-react';

const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No reviews yet. Be the first to review this court!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-gray-50 p-4 rounded-lg animate-fade-in"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-gray-900">{review.author}</h4>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {review.rating}/5
                </span>
              </div>
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
