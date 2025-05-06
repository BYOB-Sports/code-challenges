import React, { useState, useEffect } from 'react';
import './App.css';
import PlayersList from './components/PlayersList';
import MatchRating from './components/MatchRating';
import { fetchPlayers } from './api/playerApi';


function App() {
  const [activeTab, setActiveTab] = useState('players');
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial player data
    const loadPlayers = async () => {
      setIsLoading(true);
      // Added Try and Catch in case there is something wrong with our api calls.
      try{
        const loadedPlayers = await fetchPlayers();

        // --- Modified localStorage with initialize values from playerAPI.js---
        const ratingsStr = localStorage.getItem('ratings');
        const ratings = ratingsStr ? JSON.parse(ratingsStr) : {}; // Correctly parses
        let localStorageRatingsModified = false;

        for (const player of loadedPlayers) {
          const initialRating = player.averageRating;

          if (initialRating !== undefined) {
            const currentRatingsForPlayer = ratings[player.id];
            if (!currentRatingsForPlayer || !Array.isArray(currentRatingsForPlayer) || currentRatingsForPlayer.length === 0) {
              // Seed only if no ratings exist for this player in localStorage['ratings']
              ratings[player.id] = [initialRating];
              localStorageRatingsModified = true;
            }
          }
        }

        if (localStorageRatingsModified) {
          localStorage.setItem('ratings', JSON.stringify(ratings));
        }
        // --- Added Changes ---

        setPlayers(loadedPlayers);
      }catch (e) {
        console.error(`Failed to load players: ${e}`);
      }finally {
        setIsLoading(false);
      }
    };

    loadPlayers();
  }, []);
  if (isLoading){
    return <div className="app-loading">Loading Players ...</div>;
  }
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
