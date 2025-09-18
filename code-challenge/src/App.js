import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CourtsList from './components/CourtsList';
import CourtDetail from './components/CourtDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Tennis Courts Review</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<CourtsList />} />
            <Route path="/court/:id" element={<CourtDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
