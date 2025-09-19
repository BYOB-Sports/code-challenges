import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
      <h1>Court Details</h1>
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
  );
};

export default CourtDetails;