import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CourtList from './components/CourtList';
import CourtDetail from './components/CourtDetail';
import { mockCourts, mockReviews } from './data/mockCourts';

function App() {
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [courts, setCourts] = useState(mockCourts);
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter courts based on search term
  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle court selection
  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
    setCurrentPage('detail');
  };

  // Handle back to list
  const handleBackToList = () => {
    setCurrentPage('list');
    setSelectedCourt(null);
  };

  // Handle review submission
  const handleReviewSubmit = (review) => {
    const newReview = {
      ...review,
      id: reviews.length + 1,
      courtId: selectedCourt.id,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([...reviews, newReview]);
    
    // Update court rating
    const courtReviews = [...reviews, newReview].filter(r => r.courtId === selectedCourt.id);
    const newRating = courtReviews.reduce((sum, r) => sum + r.rating, 0) / courtReviews.length;
    const newReviewCount = courtReviews.length;
    
    setCourts(courts.map(court => 
      court.id === selectedCourt.id 
        ? { ...court, rating: newRating, reviewCount: newReviewCount }
        : court
    ));
  };

  return (
    <div className="App">
      <Navbar />
      
      <main className="app-main">
        {currentPage === 'list' ? (
          <CourtList
            courts={filteredCourts}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onCourtSelect={handleCourtSelect}
          />
        ) : (
          <CourtDetail
            court={selectedCourt}
            reviews={reviews.filter(r => r.courtId === selectedCourt.id)}
            onBack={handleBackToList}
            onReviewSubmit={handleReviewSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default App;