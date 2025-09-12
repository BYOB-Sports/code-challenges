import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCourts, searchCourts } from '../api/courtApi';

const CourtCard = ({ court, onCourtSelect }) => {
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
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="court-card" onClick={() => onCourtSelect(court.id)}>
      <div className="court-image-container">
        <img 
          src={court.image} 
          alt={court.name}
          className="court-image"
          loading="lazy"
        />
        <div className="court-type-badge">{court.type}</div>
        <div className="court-rating-overlay">
          <div className="rating-stars">
            {renderStars(court.rating)}
          </div>
          <span className="rating-text">{court.rating}</span>
        </div>
      </div>
      
      <div className="court-info">
        <h3 className="court-name">{court.name}</h3>
        <p className="court-address">{court.address}</p>
        <p className="court-price">{court.price}</p>
        
        <div className="court-facilities">
          {court.facilities.slice(0, 3).map((facility, index) => (
            <span key={index} className="facility-tag">
              {facility}
            </span>
          ))}
          {court.facilities.length > 3 && (
            <span className="facility-tag more">
              +{court.facilities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="court-stats">
          <span className="review-count">
            {court.reviewCount} review{court.reviewCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  return (
    <div className="search-container">
      <form onSubmit={onSearchSubmit} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search courts by name, location, or facilities..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};

const FilterBar = ({ selectedType, onTypeChange, selectedSort, onSortChange }) => {
  const courtTypes = ['All', 'Hard Court', 'Clay Court', 'Grass Court', 'Synthetic Grass', 'Indoor Court'];
  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'price', label: 'Price Low-High' }
  ];

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="type-filter">Court Type:</label>
        <select
          id="type-filter"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="filter-select"
        >
          {courtTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="sort-filter">Sort by:</label>
        <select
          id="sort-filter"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const CourtList = ({ courts, setCourts }) => {
  const navigate = useNavigate();
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSort, setSelectedSort] = useState('rating');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourts();
  }, []);

  useEffect(() => {
    filterAndSortCourts();
  }, [courts, searchTerm, selectedType, selectedSort]);

  const loadCourts = async () => {
    try {
      setLoading(true);
      const courtsData = await fetchCourts();
      setCourts(courtsData);
    } catch (error) {
      console.error('Error loading courts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCourts = async () => {
    let filtered = [...courts];

    // Apply search filter
    if (searchTerm.trim()) {
      try {
        filtered = await searchCourts(searchTerm);
      } catch (error) {
        console.error('Error searching courts:', error);
        filtered = courts.filter(court =>
          court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          court.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          court.facilities.some(facility => 
            facility.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }

    // Apply type filter
    if (selectedType !== 'All') {
      filtered = filtered.filter(court => court.type === selectedType);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          const aPrice = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const bPrice = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return aPrice - bPrice;
        default:
          return 0;
      }
    });

    setFilteredCourts(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterAndSortCourts();
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };

  const handleCourtSelect = (courtId) => {
    navigate(`/court/${courtId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tennis courts...</p>
      </div>
    );
  }

  return (
    <div className="court-list">
      <div className="court-list-header">
        <h1>🎾 Tennis Court Finder</h1>
        <p>Discover amazing tennis courts in your area</p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <FilterBar
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />

      <div className="results-info">
        <p>
          {filteredCourts.length} court{filteredCourts.length !== 1 ? 's' : ''} found
          {searchTerm && ` for "${searchTerm}"`}
          {selectedType !== 'All' && ` • ${selectedType}`}
        </p>
      </div>

      <div className="courts-grid">
        {filteredCourts.length > 0 ? (
          filteredCourts.map(court => (
            <CourtCard
              key={court.id}
              court={court}
              onCourtSelect={handleCourtSelect}
            />
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🎾</div>
            <h3>No courts found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtList;
