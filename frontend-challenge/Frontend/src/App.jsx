import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CourtListPage from './pages/CourtListPage';
import CourtDetailPage from './pages/CourtDetailPage';
import { courts } from './data/courts';
import './App.css';

function App() {
  const [selectedCourt, setSelectedCourt] = useState(null);

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
  };

  const handleBackToList = () => {
    setSelectedCourt(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              selectedCourt ? (
                <CourtDetailPage 
                  court={selectedCourt} 
                  onBack={handleBackToList}
                />
              ) : (
                <CourtListPage onCourtSelect={handleCourtSelect} />
              )
            } 
          />
          <Route 
            path="/court/:id" 
            element={
              <CourtDetailWrapper 
                courts={courts}
                onBack={handleBackToList}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

// Helper component to handle URL-based court selection
function CourtDetailWrapper({ courts, onBack }) {
  const [court] = useState(() => {
    // In a real app, you'd get the ID from useParams()
    // For now, we'll use the first court as fallback
    return courts[0];
  });

  if (!court) {
    return <Navigate to="/" replace />;
  }

  return <CourtDetailPage court={court} onBack={onBack} />;
}

export default App;