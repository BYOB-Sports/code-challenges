import React, { useState, useEffect } from 'react';
import './App.css';
import PlayersList from './components/PlayersList';
import MatchRating from './components/MatchRating';
import { fetchPlayers } from './api/playerApi';
import { loadRatingState, saveRatingState } from './utils/localStorageHelpers';

function App() {
  const [activeTab, setActiveTab] = useState('players');
  const [players, setPlayers] = useState([]);

  //Added ratingState calculator for ease of local calculation
  const [ratingState, setRatingState] = useState({});

  // Only load the players and the ratingState from the localStorage a single time
  useEffect(() => {
    const init = async () => {
      const loaded = await fetchPlayers();
      setPlayers(loaded);
      setRatingState(loadRatingState(loaded));
    };
    init();
  }, []);

  // Persist changes to the ratingState
  useEffect(() => {
    if (Object.keys(ratingState).length) saveRatingState(ratingState);
  }, [ratingState]);

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
        {/* Here I pass down the rating state constantly to the PlayerList and MatchRating components to ensure that the changes stay consistent.
        This ensures that the ratings are stored locally and calculated through a running average even through page refreshes and app reloads (resetting localStorage
        should reset the values to the initial ones. This approach is done to circumvent the fact that I cannot make changes to the API, which would cut down the amount
        of code I would have had to do by A LOT*/}
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
