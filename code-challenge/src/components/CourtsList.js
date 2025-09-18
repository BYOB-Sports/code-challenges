import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import courtsData from '../data/courtsData';
import './CourtsList.css';

function CourtsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);

  const getAverageRating = (courtId) => {
    const stored = localStorage.getItem(`reviews_${courtId}`);
    if (!stored) return 'No reviews';
    const reviews = JSON.parse(stored);
    if (reviews.length === 0) return 'No reviews';
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return `${(sum / reviews.length).toFixed(1)} / 5`;
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedTerm]);

  const filteredCourts = useMemo(() => courtsData.filter(court =>
    court.name.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
    court.location.toLowerCase().includes(debouncedTerm.toLowerCase())
  ), [debouncedTerm]);

  const totalPages = Math.ceil(filteredCourts.length / itemsPerPage);
  const paginatedCourts = filteredCourts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="courts-list">
      <input
        type="text"
        placeholder="Search courts by name or location"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
        data-tooltip="Search by court name or location"
        aria-label="Search tennis courts by name or location"
      />
      <div className="courts-grid">
        {paginatedCourts.map(court => (
          <div key={court.id} className="court-card">
            <div className="image-container">
              <img
                src={court.image}
                alt={court.name}
                loading="lazy"
                onLoad={(e) => e.target.classList.add('loaded')}
                onError={(e) => e.target.classList.add('error')}
              />
              <div className="image-loader">Loading...</div>
            </div>
            <h3>{court.name}</h3>
            <p>{court.location}</p>
            <p className="rating">Rating: {getAverageRating(court.id)}</p>
            <Link to={`/court/${court.id}`}>View Details</Link>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}

export default React.memo(CourtsList);