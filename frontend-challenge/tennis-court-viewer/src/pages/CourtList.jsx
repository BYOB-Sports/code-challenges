import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const CourtList = () => {
  const [courts, setCourts] = useState([]);
  
  useEffect(() => {
    fetch("/courts.json")
      .then((response) => response.json())
      .then((data) => {
        setCourts(data);
      })
      .catch((error) => {
        console.error("Error fetching courts:", error);
      })
  }, []);

  return (
    <div className="min-h-screen">
      <h1>Courts List</h1>
      <div className="grid grid-cols-2 gap-3">
        {courts.map((court) => {
          const averageRating = court.reviews.length > 0
            ? court.reviews.reduce((sum, review) => sum + review.rating, 0) / court.reviews.length
            : 0;

            return (
              <Link 
                key={court.id}
                to={`/court/${court.id}`}
              >
                <h2>{court.name}</h2>
                <p>{court.address}</p>
                <p>Average Rating: {averageRating}</p>
                <img src={court.image} alt={court.name} />
              </Link>
            )
        })}
      </div>
      
    </div>
  )
  
}

export default CourtList;