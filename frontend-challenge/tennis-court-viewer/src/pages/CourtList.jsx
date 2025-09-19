import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';


const CourtList = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetch("/courts.json")
      .then((response) => response.json())
      .then((data) => {
        setCourts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courts:", error);
        setLoading(false);
      })
  }, []);

  const filteredCourts = courts.filter((court) =>
    court.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div>
      <Navigation search={search} setSearch={setSearch} />
      <p>Loading courts...</p>
    </div>;
  }

  return (
    <div className="min-h-screen">
      <Navigation search={search} setSearch={setSearch} />
      <div className="p-4 max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {filteredCourts.map((court) => {
            const averageRating = court.reviews.length > 0
              ? (court.reviews.reduce((sum, review) => sum + review.rating, 0) / court.reviews.length).toFixed(1)
              : 0.0;

              return (
                <Link 
                  key={court.id}
                  to={`/court/${court.id}`}
                  className="rounded-lg shadow-md hover:shadow-lg transition-shadow aspect-square flex flex-col overflow-hidden"
                >
                  <img 
                    src={court.image} 
                    alt={court.name} 
                    className="w-full h-16 object-cover flex-shrink-0" 
                  />
                  <h2>{court.name}</h2>
                  <p>{court.address}</p>
                  <p>Average Rating: {averageRating}</p>
                </Link>
              )
          })}
        </div>
      </div>
      {courts.length === 0 && <p>No courts found</p>}
    </div>
  )
  
}

export default CourtList;