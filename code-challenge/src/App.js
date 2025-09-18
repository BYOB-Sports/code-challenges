import React, { useState, useEffect } from 'react';
import './App.css';
import PlayersList from './components/PlayersList';
import MatchRating from './components/MatchRating';
import TennisCourts from './components/TennisCourts'; 
import { fetchPlayers } from './api/playerApi';

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
          <button className={activeTab === 'courts' ? 'active' : ''} onClick={() => setActiveTab('courts')}>
            Tennis Courts
          </button>
        </div>
      </header>
      <main>
        {activeTab === 'players' && <PlayersList players={players} />}
        {activeTab === 'matches' && <MatchRating players={players} setPlayers={setPlayers} />}
        {activeTab === 'courts' && <TennisCourts />}
      </main>
    </div>
  );
}

export default App;
