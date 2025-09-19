import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

  return (
    <div className="min-h-screen">
      <div className="bg-gray-200 p-4 sticky top-0 flex justify-center items-center">
        <div className="max-w-md mx-auto">
        <Link to="/" className="text-xl font-bold">Back to Courts</Link>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <img src={court.image} alt={court.name} />
        <h2>{court.name}</h2>
        <p>{court.address}</p>
        <p>Average Rating: {court.reviews.length > 0 ? (court.reviews.reduce((sum, review) => sum + review.rating, 0) / court.reviews.length).toFixed(1) : 0.0}</p>
        <h3>Reviews</h3>
        {court.reviews.map((review, index) => (
          <div key={index}>
            <p>{review.username}</p>
            <p>{review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CourtDetails;