import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import './CourtList.css';

const CourtList = ({ courts, searchTerm, onSearchChange, onCourtSelect }) => {
  const [sortBy, setSortBy] = useState('name');
  const [surfaceFilter, setSurfaceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Get unique surface types and court types for filter options
  const surfaceTypes = useMemo(() => {
    const surfaces = [...new Set(courts.map(court => court.surface))];
    return surfaces.sort();
  }, [courts]);

  const courtTypes = useMemo(() => {
    const types = [...new Set(courts.map(court => court.type))];
    return types.sort();
  }, [courts]);

  // Filter and sort courts
  const filteredAndSortedCourts = useMemo(() => {
    let filtered = courts.filter(court => {
      const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           court.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSurface = surfaceFilter === 'all' || court.surface === surfaceFilter;
      const matchesType = typeFilter === 'all' || court.type === typeFilter;
      
      return matchesSearch && matchesSurface && matchesType;
    });

    // Sort the filtered results
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.priceValue - b.priceValue;
        case 'price-high':
          return b.priceValue - a.priceValue;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [courts, searchTerm, surfaceFilter, typeFilter, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSurfaceFilterChange = (e) => {
    setSurfaceFilter(e.target.value);
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const clearFilters = () => {
    setSurfaceFilter('all');
    setTypeFilter('all');
    setSortBy('name');
  };

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
          <div className="search-icon">
            <Search size={20} />
          </div>
        </div>
        <div className="results-count">
          {filteredAndSortedCourts.length} court{filteredAndSortedCourts.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="filters-section">
        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Rating (Highest First)</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="surface-filter">Surface:</label>
            <select 
              id="surface-filter"
              value={surfaceFilter} 
              onChange={handleSurfaceFilterChange}
              className="filter-select"
            >
              <option value="all">All Surfaces</option>
              {surfaceTypes.map(surface => (
                <option key={surface} value={surface}>{surface}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type-filter">Type:</label>
            <select 
              id="type-filter"
              value={typeFilter} 
              onChange={handleTypeFilterChange}
              className="filter-select"
            >
              <option value="all">All Types</option>
              {courtTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <button 
            className="clear-filters-btn"
            onClick={clearFilters}
            disabled={surfaceFilter === 'all' && typeFilter === 'all' && sortBy === 'name'}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="courts-grid">
        {filteredAndSortedCourts.map(court => (
          <div key={court.id} className="court-card" onClick={() => onCourtSelect(court)}>
            <div className="court-image">
              <img src={court.image} alt={court.name} />
              <div className="court-rating">
                <span className="rating-stars">★</span>
                <span className="rating-value">{court.rating.toFixed(1)}</span>
                <span className="rating-count">({court.reviewCount})</span>
              </div>
              <div className="court-type-badge">
                {court.type}
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

      {filteredAndSortedCourts.length === 0 && (
        <div className="no-results">
          <p>No courts found matching your search and filters.</p>
          <p>Try adjusting your search terms or clearing filters.</p>
        </div>
      )}
    </div>
  );
};

export default CourtList;