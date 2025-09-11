import React from 'react';
import './CourtList.css';

const CourtList = ({ courts, searchTerm, onSearchChange, onCourtSelect }) => {
  return (
    <div className="court-list">
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search courts by name or location..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>
        <div className="results-count">
          {courts.length} court{courts.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="courts-grid">
        {courts.map(court => (
          <div key={court.id} className="court-card" onClick={() => onCourtSelect(court)}>
            <div className="court-image">
              <img src={court.image} alt={court.name} />
              <div className="court-rating">
                <span className="rating-stars">★</span>
                <span className="rating-value">{court.rating.toFixed(1)}</span>
                <span className="rating-count">({court.reviewCount})</span>
              </div>
            </div>
            
            <div className="court-info">
              <h3 className="court-name">{court.name}</h3>
              <p className="court-location">{court.location}</p>
              
              <div className="court-details">
                <div className="detail-item">
                  <span className="detail-label">Surface:</span>
                  <span className="detail-value">{court.surface}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Courts:</span>
                  <span className="detail-value">{court.courts}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">{court.price}</span>
                </div>
              </div>

              <div className="amenities">
                {court.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="amenity-tag">
                    {amenity}
                  </span>
                ))}
                {court.amenities.length > 3 && (
                  <span className="amenity-tag more">
                    +{court.amenities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {courts.length === 0 && (
        <div className="no-results">
          <p>No courts found matching your search.</p>
          <p>Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
};

export default CourtList;