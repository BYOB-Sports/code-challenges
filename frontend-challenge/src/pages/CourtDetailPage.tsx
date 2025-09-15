import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courts } from '../mock/courts';
import type { Review } from '../mock/courts';
import Stars from '../components/Stars';
import ReviewForm from '../components/ReviewForm';
import ReviewItem from '../components/ReviewItem';

const CourtDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  const court = courts.find(c => c.id === Number(id));
  const [reviews, setReviews] = useState<Review[]>(court ? court.reviews : []);

  if (!court) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <p className="text-gray-600">Court not found.</p>
      </div>
    );
  }

  const handleAddReview = (text: string, rating: number) => {
    const newReview: Review = {
      user: 'Aakash',
      text,
      rating,
    };
    setReviews([newReview, ...reviews]);

    // Scroll to review section smoothly
    setTimeout(() => {
      reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-4">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-4"
        >
          ← Back
        </button>

        {/* Court Image */}
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-56 object-cover rounded-lg mb-4 shadow"
        />

        {/* Court Info */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{court.name}</h2>
        <div className="text-gray-500 text-sm mb-1">
          {court.city} &bull; {court.surface}
        </div>
        <div className="text-xs text-gray-400 mb-4">
          {court.distance_km} km away
        </div>

        {/* Review Form */}
  <ReviewForm onSubmit={handleAddReview} />

        {/* Reviews */}
        <div className="flex flex-col gap-3">
  {reviews.length > 0 ? (
    reviews.map((review, idx) => (
      <ReviewItem key={idx} review={review} />
    ))
  ) : (
    <div className="text-gray-500">No reviews yet.</div>
  )}
</div>

      </div>
    </div>
  );
};

export default CourtDetailPage;
