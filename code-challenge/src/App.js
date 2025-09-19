import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import PlayersList from './components/PlayersList';
import CourtDetail from './components/CourtDetail';

function AppHeader() {
  const { pathname } = useLocation();
  return (
    <header className="App-header">
      <h1>Tennis Court Reviews</h1>
      <nav className="tabs" role="tablist" aria-label="Main">
        <Link
          className={pathname === '/' ? 'active' : ''}
          to="/"
          role="tab"
          aria-selected={pathname === '/'}
        >
          Courts
        </Link>
      </nav>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<PlayersList />} />
          <Route path="/court/:id" element={<CourtDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
