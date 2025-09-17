import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import CourtsList from './components/CourtsList';
import CourtDetail from './components/CourtDetail';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<CourtsList />} />
          <Route path="/courts/:courtId" element={<CourtDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
