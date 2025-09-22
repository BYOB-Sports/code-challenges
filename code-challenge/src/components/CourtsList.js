import React, { useState, useEffect } from 'react';
import { fetchCourts, searchCourts } from '../api/courtsApi';

const CourtsList = ({ onCourtSelect }) => {
  const [courts, setCourts] = useState([]);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourts(courts);
    } else {
      performSearch(searchQuery);
    }
  }, [searchQuery, courts]);

  const loadCourts = async () => {
    try {
      setLoading(true);
      const courtsData = await fetchCourts();
      setCourts(courtsData);
      setFilteredCourts(courtsData);
    } catch (err) {
      setError('Failed to load courts');
      console.error('Error loading courts:', err);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (query) => {
    try {
      const searchResults = await searchCourts(query);
      setFilteredCourts(searchResults);
    } catch (err) {
      setError('Search failed');
      console.error('Error searching courts:', err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="courts-list">
        <div className="loading">Loading courts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courts-list">
        <div className="error">{error}</div>
        <button onClick={loadCourts} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="courts-list">
      <div className="search-section">
        <h2>Tennis Courts</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search courts by name, location, or surface..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="courts-grid">
        {filteredCourts.length === 0 ? (
          <div className="no-results">
            <p>No courts found matching your search.</p>
            <button onClick={() => setSearchQuery('')} className="clear-search-btn">
              Clear Search
            </button>
          </div>
        ) : (
          filteredCourts.map(court => (
            <div key={court.id} className="court-card" onClick={() => onCourtSelect(court)}>
              <div className="court-image">
                <img src={court.image} alt={court.name} />
                <div className="court-surface">{court.surface}</div>
              </div>
              
              <div className="court-info">
                <h3 className="court-name">{court.name}</h3>
                <p className="court-location">{court.location}</p>
                
                <div className="court-rating">
                  <div className="stars">
                    {renderStars(court.rating)}
                  </div>
                  <span className="rating-text">
                    {court.rating} ({court.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="court-price">{court.price}</div>
                
                <div className="court-amenities">
                  {court.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                  {court.amenities.length > 3 && (
                    <span className="amenity-tag more">+{court.amenities.length - 3} more</span>
                  )}
                </div>
              </div>
              
              <div className="court-actions">
                <button className="view-details-btn">View Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourtsList;
