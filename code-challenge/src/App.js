import React, { useState, useEffect } from 'react';
import './App.css';
import PlayersList from './components/PlayersList';
import MatchRating from './components/MatchRating';
import { fetchPlayers } from './api/playerApi';

function App() {
  const [activeTab, setActiveTab] = useState('players');
  const [players, setPlayers] = useState([]);

  // I know that this just looks like more bloat, but I pass this up down to the PlayerList/MatchRating to render the ellipsis while 
  // new average the calculation is still running. I did this to avoid an await command that I could just turn into a UI choice.  
  const [loadingAverages, setLoadingAverages] = useState({});


  // Only load the players and the ratingState from the localStorage a single time (REMOVED, this only fetches the players now)
  useEffect(() => {
    const init = async () => {
      const loaded = await fetchPlayers();
      setPlayers(loaded);
    };
    init();
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
        {/* I removed the call to ratingState for PlayerList and MatchRating to avoid using localStorage directly */}
        {activeTab === 'players' ? (
          <PlayersList players={players} loadingAverages={loadingAverages}/>
        ) : (
          <MatchRating players={players} setPlayers={setPlayers} loadingAverages={loadingAverages} setLoadingAverages={setLoadingAverages}/>
        )}
      </main>
    </div>
  );
}

export default App;
