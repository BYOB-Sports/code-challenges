import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { courts } from '../data/courts';

const CourtList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [surface, setSurface] = useState('any');
  const [minRating, setMinRating] = useState('any');
  const [lighting, setLighting] = useState('any');
  const [maxPrice, setMaxPrice] = useState('any');
  const navigate = useNavigate();

  const parsePrice = (priceStr) => {
    // price like "$25/hour" → 25
    const match = priceStr.match(/\$(\d+)/);
    return match ? Number(match[1]) : Infinity;
  };

  const filteredCourts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return courts.filter(court => {
      const matchesTerm = !term ||
        court.name.toLowerCase().includes(term) ||
        court.location.toLowerCase().includes(term) ||
        court.surface.toLowerCase().includes(term);

      const matchesSurface = surface === 'any' || court.surface.toLowerCase().includes(surface);
      const matchesRating = minRating === 'any' || court.rating >= Number(minRating);
      const matchesLighting = lighting === 'any' || (lighting === 'yes' ? court.lighting === 'Yes' : court.lighting === 'No');
      const matchesPrice = maxPrice === 'any' || parsePrice(court.price) <= Number(maxPrice);

      return matchesTerm && matchesSurface && matchesRating && matchesLighting && matchesPrice;
    });
  }, [searchTerm, surface, minRating, lighting, maxPrice]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  const handleCourtClick = (courtId) => {
    navigate(`/court/${courtId}`);
  };

  return (
    <div className="court-list">
      <header className="header">
        <div className="container">
          <h1>🎾 Tennis Court Reviews</h1>
        </div>
      </header>

      <div className="search-container">
        <div className="container">
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search by name, location, or surface"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <div className="filters-row">
              <select className="search-input select-input" value={surface} onChange={(e) => setSurface(e.target.value)}>
                <option value="any">Surface: Any</option>
                <option value="hard">Hard</option>
                <option value="clay">Clay</option>
                <option value="grass">Grass</option>
              </select>
              <select className="search-input select-input" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
                <option value="any">Min Rating: Any</option>
                <option value="4.5">4.5+</option>
                <option value="4">4.0+</option>
                <option value="3.5">3.5+</option>
              </select>
              <select className="search-input select-input" value={lighting} onChange={(e) => setLighting(e.target.value)}>
                <option value="any">Lighting: Any</option>
                <option value="yes">Lighting: Yes</option>
                <option value="no">Lighting: No</option>
              </select>
              <select className="search-input select-input" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                <option value="any">Max Price: Any</option>
                <option value="20">$20</option>
                <option value="25">$25</option>
                <option value="30">$30</option>
                <option value="35">$35</option>
                <option value="40">$40</option>
              </select>
              <button
                type="button"
                className="button clear-btn"
                onClick={() => { setSurface('any'); setMinRating('any'); setLighting('any'); setMaxPrice('any'); }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="court-grid">
          {filteredCourts.length === 0 ? (
            <div className="empty-state">
              <h3>No courts found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          ) : (
            filteredCourts.map(court => (
              <div
                key={court.id}
                className="court-card"
                onClick={() => handleCourtClick(court.id)}
              >
                <img
                  src={court.image}
                  alt={court.name}
                  className="court-image"
                  loading="lazy"
                />
                <div className="court-info">
                  <h3 className="court-name">{court.name}</h3>
                  <p className="court-location">📍 {court.location}</p>
                  <div className="court-rating">
                    <div className="stars">
                      {renderStars(court.rating)}
                    </div>
                    <span className="rating-text">
                      {court.rating} ({court.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="court-details">
                    <span className="court-surface">{court.surface}</span>
                    <span className="court-price" style={{ marginLeft: '8px', fontWeight: '600', color: '#2E7D32' }}>
                      {court.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourtList;