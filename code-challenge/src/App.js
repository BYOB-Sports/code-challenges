import React, { useEffect, useState } from 'react';
import { fetchPlayers } from './api/playerApi';
import './App.css';
import MatchRating from './components/MatchRating';
import PlayersList from './components/PlayersList';

function App() {
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
        </div>
      </header>
      <main>
        {activeTab === 'players' ? (
          <PlayersList players={players} />
        ) : (
          <MatchRating players={players} setPlayers={setPlayers} />
        )}
      </main>
    </div>
  );
}

export default App;