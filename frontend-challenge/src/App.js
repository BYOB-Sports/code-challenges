import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourtList from './components/CourtList';
import CourtDetail from './components/CourtDetail';
import { addCourtReview } from './api/courtApi';
import './App.css';

function App() {
  const [courts, setCourts] = useState([]);

  const handleAddReview = async (courtId, reviewData) => {
    try {
      const updatedCourt = await addCourtReview(courtId, reviewData);
      // Update the courts list with the new review
      setCourts(prevCourts => 
        prevCourts.map(court => 
          court.id === courtId ? updatedCourt : court
        )
      );
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<CourtList courts={courts} setCourts={setCourts} />} 
          />
          <Route 
            path="/court/:id" 
            element={<CourtDetail onAddReview={handleAddReview} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
