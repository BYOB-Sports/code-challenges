import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CourtListPage from './pages/CourtListPage';
import CourtDetailPage from './pages/CourtDetailPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourtListPage />} />
        <Route path="/court/:id" element={<CourtDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
