import React, { useState, useEffect } from 'react';
import './App.css';
import PlayersList from './components/PlayersList';
import MatchRating from './components/MatchRating';
import { fetchPlayers } from './api/playerApi';

function App() {
  const [activeTab, setActiveTab] = useState('players');
  const [players, setPlayers] = useState([]);

  //Added ratingState calculator for ease of local calculation
  const [ratingState, setRatingState] = useState([]);

  useEffect(() => {
    // Load initial player data
    const loadPlayers = async () => {
      const loadedPlayers = await fetchPlayers();
      setPlayers(loadedPlayers);

      // Initialize player ratings once players are loaded
      setRatingState(
        loadedPlayers.map(p => ({
          total: p.averageRating ?? 0,
          count: 1,
        }))
      );
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
          <PlayersList players={players}
                      ratingState={ratingState}
          />
        ) : (
          <MatchRating players={players} setPlayers={setPlayers} ratingState={ratingState} setRatingState={setRatingState} />
        )}
      </main>
    </div>
  );
}

export default App;
