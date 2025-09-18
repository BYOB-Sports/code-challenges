import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CourtList from './components/CourtList';
import CourtDetail from './components/CourtDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CourtList />} />
        <Route path="/court/:id" element={<CourtDetail />} />
      </Routes>
    </div>
  );
}

export default App;