import React, { useState } from 'react';
import './App.css';
import CourtsList from './components/CourtsList';
import CourtDetail from './components/CourtDetail';

function App() {
  const [currentPage, setCurrentPage] = useState('courts-list');
  const [selectedCourt, setSelectedCourt] = useState(null);

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
    setCurrentPage('court-detail');
  };

  const handleBackToList = () => {
    setSelectedCourt(null);
    setCurrentPage('courts-list');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tennis Court Reviews</h1>
        <p>Find and review the best tennis courts in your area</p>
      </header>
      
      <main>
        {currentPage === 'courts-list' ? (
          <CourtsList onCourtSelect={handleCourtSelect} />
        ) : (
          <CourtDetail 
            court={selectedCourt} 
            onBack={handleBackToList} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
