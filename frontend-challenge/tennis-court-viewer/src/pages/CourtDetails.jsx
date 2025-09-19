import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AddReview from '../components/AddReview';
import StarDisplay from '../components/StarDisplay';

const CourtDetails = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/courts.json")
      .then((response) => response.json())
      .then((data) => {
        const court = data.find((court) => court.id === Number(id))
        setCourt(court);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching court:", error);
        setLoading(false);
      })
  }, [id]);

  if (loading) {
    return <div>
        <p>Loading...</p>
      </div>;
  }

  if (!court) {
    return <div>
        <p>Court not Found</p>
      </div>;
  }

  const averageRating = court.reviews.length > 0 
    ? (court.reviews.reduce((sum, review) => sum + review.rating, 0) / court.reviews.length)
    : 0;

  const addReview = (newReview) => {
    setCourt((prev) => ({
      ...prev, 
      reviews: [...prev.reviews, newReview],
    }));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-200 p-4 sticky top-0 flex justify-center items-center">
        <div className="max-w-md mx-auto">
        <Link to="/" className="text-xl font-bold">← Back to Courts</Link>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <img src={court.image} alt={court.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{court.name}</h1>
            <p className="text-gray-600 mb-3">{court.address}</p>
            <div className="flex items-center justify-between">
              <StarDisplay rating={averageRating} />
              <span className="text-sm text-gray-500">
              {court.reviews.length} review{court.reviews.length === 1 ? '' : 's'}
            </span>
            </div>
          </div>
        </div>
        

        <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          {court.reviews.length > 0? (
            <div className="space-y-3">
              {court.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm">{review.username}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, star) => (
                        <span
                          key={star}
                          className={`test-sm ${
                            star < review.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3">Add a Review</h3>
          <AddReview addReview={addReview} />
        </div>
      </div>
    </div>
  );
};

export default CourtDetails;