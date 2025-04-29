import React, { useState, useEffect } from 'react';
import './App.css';
import PlayersList from './components/PlayersList';
import MatchRating from './components/MatchRating';
import { fetchPlayers } from './api/playerApi';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadPlayers = async () => {
      const loadedPlayers = await fetchPlayers();
      setPlayers(loadedPlayers);
    };
    loadPlayers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎾 USTA Player Rating System</h1>
        <p>Rate and view tennis players in one place.</p>
      </header>

      <main className="grid-layout">
        <section className="grid-card">
          <PlayersList players={players} />
        </section>
        <section className="grid-card">
          <MatchRating players={players} setPlayers={setPlayers} />
        </section>
      </main>
    </div>
  );
}

export default App;