"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { courts, reviews, Review } from '../../data/courts';

export default function CourtDetailPage() {
  const params = useParams();
  const courtId = params.id as string;
  const court = courts.find(c => c.id === courtId);
  const courtReviews = reviews.filter(r => r.courtId === courtId);
  const [localReviews, setLocalReviews] = useState<Review[]>(courtReviews);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  if (!court) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Court not found</h1>
          <Link href="/courts" className="text-green-600 hover:text-green-700">
            ← Back to courts
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    const created: Review = {
      id: String(Date.now()),
      courtId,
      userName: newReview.userName.trim() || 'Anonymous',
      userAvatar: '/img7.jpg',
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: new Date().toISOString().slice(0, 10),
      verified: false,
    };
    setLocalReviews((prev) => [created, ...prev]);
    alert('Review submitted successfully!');
    setNewReview({ userName: '', rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type={interactive ? "button" : undefined}
        onClick={interactive && onRatingChange ? () => onRatingChange(i + 1) : undefined}
        className={`h-6 w-6 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} ${interactive ? 'hover:text-yellow-500 cursor-pointer' : ''}`}
      >
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/courts" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to courts
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TennisCourts</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Court Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={court.image}
                alt={court.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{court.name}</h1>
                <span className="text-2xl font-bold text-green-600">${court.price}/hr</span>
              </div>

              <div className="mb-4">
                <p className="text-lg text-gray-600 mb-2">{court.location}</p>
                <p className="text-sm text-gray-500">{court.address}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStars(court.rating)}
                </div>
                <span className="text-lg font-semibold text-gray-900">{court.rating}</span>
                <span className="text-gray-600">({court.reviewCount} reviews)</span>
              </div>

              {/* Court Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Surface</span>
                  <p className="text-sm text-gray-900">{court.surface}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Lighting</span>
                  <p className="text-sm text-gray-900">{court.lighting ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Indoor</span>
                  <p className="text-sm text-gray-900">{court.indoor ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Price</span>
                  <p className="text-sm text-gray-900">${court.price}/hour</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-500 block mb-2">Amenities</span>
                <div className="flex flex-wrap gap-2">
                  {court.amenities.map((amenity, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700">{court.description}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Reviews ({localReviews.length})</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Write a Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder:text-gray-600"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center gap-1">
                    {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
                    <span className="ml-2 text-sm text-gray-600">{newReview.rating} stars</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder:text-gray-600"
                    placeholder="Share your experience at this court..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {localReviews.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
              <p className="mt-1 text-sm text-gray-500">Be the first to review this court!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {localReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Review Card Component
function ReviewCard({ review }: { review: Review }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            {review.verified && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {renderStars(review.rating)}
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}
