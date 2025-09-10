import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import PlayersList from './components/PlayersList';
import CourtsList from './components/CourtsList';
import MatchRating from './components/MatchRating';
import { fetchPlayers } from './api/playerApi';

function App() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('players');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Load initial player data
    const loadPlayers = async () => {
      const loadedPlayers = await fetchPlayers();
      setPlayers(loadedPlayers);
    };
    
    loadPlayers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>USTA Player Rating System</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'players' ? 'active' : ''} 
            onClick={() => setActiveTab('players')}
          >
            Players
          </button>
          <button 
            className={activeTab === 'matches' ? 'active' : ''} 
            onClick={() => setActiveTab('matches')}
          >
            Match Ratings
          </button>
          <button onClick={() => navigate('/courts')}>
            Courts
          </button>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={activeTab === 'players' ? (
            <PlayersList players={players} />
          ) : (
            <MatchRating players={players} setPlayers={setPlayers} />
          )} />
          <Route path="/courts" element={<CourtsList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
