import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, DollarSign, Users, ThumbsUp } from 'lucide-react';
import { mockCourts, mockReviews } from '../data/mockData';
import { useState } from 'react';

const CourtDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const court = mockCourts.find(c => c.id === id);
  const reviews = mockReviews.filter(r => r.courtId === id);

  if (!court) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Court not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to courts
          </button>
        </div>
      </div>
    );
  }

  const getSurfaceColor = (surface) => {
    switch (surface) {
      case 'Hard': return 'bg-blue-100 text-blue-800';
      case 'Clay': return 'bg-orange-100 text-orange-800';
      case 'Grass': return 'bg-green-100 text-green-800';
      case 'Synthetic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="glass-effect sticky top-0 z-10 border-b border-white/20">
        <div className="px-6 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-3 hover:bg-emerald-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-600" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">{court.name}</h1>
          </div>
        </div>
      </header>

      <div className="aspect-[16/9] bg-gradient-to-br from-emerald-100 to-teal-100 relative overflow-hidden">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6">
          <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getSurfaceColor(court.surface)}`}>
            {court.surface} Court
          </div>
        </div>
        <div className="absolute bottom-6 right-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 rounded-full shadow-lg">
            <span className="text-lg font-bold text-white">${court.price}/hr</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="card p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              {court.name}
            </h2>
            <div className="flex items-center justify-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
              <span className="text-lg font-medium">{court.location}</span>
            </div>
            <div className="flex items-center justify-center bg-yellow-50 px-6 py-3 rounded-2xl">
              <Star className="w-6 h-6 text-yellow-500 fill-current mr-2" />
              <span className="text-2xl font-bold text-yellow-700">{court.rating}</span>
              <span className="ml-2 text-yellow-600 font-medium">({court.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{court.description}</p>

          <div className="space-y-3 mb-6">
            <button
              className="w-full py-3 text-base font-semibold rounded-lg bg-emerald-600 text-white transition-colors duration-200 hover:bg-emerald-700 active:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Book Court
            </button>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full py-3 text-base font-semibold rounded-lg bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Write Review
            </button>
          </div>

          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
              <Users className="w-6 h-6 mr-3 text-emerald-500" />
              Amenities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {court.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl text-sm font-medium text-gray-700 border border-emerald-100"
                >
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 flex-shrink-0" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        {showReviewForm && (
          <ReviewForm courtId={court.id} onClose={() => setShowReviewForm(false)} />
        )}
      </div>

      <div className="px-6 pb-6">
        <div className="card p-6">
          <h3 className="font-bold text-2xl text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-3 text-yellow-500" />
            Reviews ({reviews.length})
          </h3>
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {reviews.length > 5 && (
              <button className="w-full text-primary-600 font-medium py-3 hover:bg-primary-50 rounded-lg transition-colors">
                View all {reviews.length} reviews
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-green-500 to-emerald-600';
    if (rating >= 3.5) return 'from-blue-500 to-cyan-600';
    if (rating >= 2.5) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  const getAvatarColor = (rating) => {
    if (rating >= 4.5) return 'bg-gradient-to-br from-green-100 to-emerald-200 text-green-700';
    if (rating >= 3.5) return 'bg-gradient-to-br from-blue-100 to-cyan-200 text-blue-700';
    if (rating >= 2.5) return 'bg-gradient-to-br from-yellow-100 to-orange-200 text-orange-700';
    return 'bg-gradient-to-br from-red-100 to-pink-200 text-red-700';
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center flex-1">
          <div className={`w-12 h-12 ${getAvatarColor(review.rating)} rounded-full flex items-center justify-center mr-4 flex-shrink-0 shadow-sm`}>
            <span className="font-bold text-lg">
              {review.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 mb-2 text-lg">{review.userName}</div>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-600">({review.rating}/5)</span>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 ml-2 bg-gray-100 px-3 py-1 rounded-full">
          {new Date(review.date).toLocaleDateString()}
        </div>
      </div>
      <p className="text-gray-700 mb-4 leading-relaxed text-base bg-white p-4 rounded-lg border-l-4 border-emerald-200">{review.comment}</p>
      <div className="flex items-center justify-between">
        <button className="flex items-center text-sm text-gray-600 hover:text-emerald-600 transition-colors bg-gray-50 hover:bg-emerald-50 px-4 py-2 rounded-full">
          <ThumbsUp className="w-4 h-4 mr-2" />
          Helpful ({review.helpful})
        </button>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getRatingColor(review.rating)} text-white`}>
          {review.rating >= 4.5 ? 'Excellent' : review.rating >= 3.5 ? 'Good' : review.rating >= 2.5 ? 'Average' : 'Poor'}
        </div>
      </div>
    </div>
  );
};

const ReviewForm = ({ courtId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (comment.trim().length < 10) {
      alert('Please write a review with at least 10 characters');
      return;
    }
    
    console.log('Review submitted:', { courtId, rating, comment });
    alert('Thank you for your review!');
    onClose();
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-gray-50">
      <h3 className="font-semibold text-gray-900 mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                className="mr-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-8 h-8 ${
                    i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review * (minimum 10 characters)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
            rows={4}
            placeholder="Share your experience playing at this court..."
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            {comment.length}/500 characters
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 btn-secondary py-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 btn-primary py-3"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourtDetail;
