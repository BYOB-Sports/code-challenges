import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CourtList from './components/CourtList';
import CourtDetail from './components/CourtDetail';
import { mockCourts, mockReviews } from './data/mockCourts';

// Court Detail Page Component
function CourtDetailPage() {
  const { courtId } = useParams();
  const navigate = useNavigate();
  const [courts, setCourts] = useState(mockCourts);
  const [reviews, setReviews] = useState(mockReviews);
  
  const court = courts.find(c => c.id === parseInt(courtId));
  const courtReviews = reviews.filter(r => r.courtId === parseInt(courtId));

  // Handle back to list
  const handleBackToList = () => {
    navigate('/');
  };

  // Handle review submission
  const handleReviewSubmit = (review) => {
    const newReview = {
      ...review,
      id: reviews.length + 1,
      courtId: parseInt(courtId),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      unhelpful: 0
    };
    setReviews([...reviews, newReview]);
    
    // Update court rating
    const courtReviews = [...reviews, newReview].filter(r => r.courtId === parseInt(courtId));
    const newRating = courtReviews.reduce((sum, r) => sum + r.rating, 0) / courtReviews.length;
    const newReviewCount = courtReviews.length;
    
    setCourts(courts.map(c => 
      c.id === parseInt(courtId)
        ? { ...c, rating: newRating, reviewCount: newReviewCount }
        : c
    ));
  };

  if (!court) {
    return (
      <div className="App">
        <Navbar />
        <main className="app-main">
          <div className="no-results">
            <p>Court not found.</p>
            <button onClick={handleBackToList} className="back-button">
              ← Back to Courts
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <main className="app-main">
        <CourtDetail
          court={court}
          reviews={courtReviews}
          onBack={handleBackToList}
          onReviewSubmit={handleReviewSubmit}
        />
      </main>
    </div>
  );
}

// Court List Page Component
function CourtListPage() {
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
    window.location.href = `/court/${court.id}`;
  };

  return (
    <div className="App">
      <Navbar />
      <main className="app-main">
        <CourtList
          courts={filteredCourts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onCourtSelect={handleCourtSelect}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourtListPage />} />
        <Route path="/court/:courtId" element={<CourtDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;