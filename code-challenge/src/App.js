import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./App.css";
import PlayersList from "./components/PlayersList";
import MatchRating from "./components/MatchRating";
import { fetchPlayers } from "./api/playerApi";
import CourtsList from "./pages/CourtsList";
import CourtDetail from "./pages/CourtDetail";

function AppContent({ players, setPlayers }) {
  const location = useLocation();

  const hideHeader =
    location.pathname.startsWith("/courts") ||
    location.pathname.startsWith("/court");

  return (
    <div className="App">
      {!hideHeader && (
        <header className="App-header">
          <h1>Tennis App</h1>
          <nav className="tabs">
            <Link to="/usta/players" className="tab-link">
              USTA Players
            </Link>
            <Link to="/usta/matches" className="tab-link">
              Match Ratings
            </Link>
            <Link to="/courts" className="tab-link">
              Courts Review
            </Link>
          </nav>
        </header>
      )}

      <main>
        <Routes>
          {/* Default home */}
          <Route path="/" element={<h2>Welcome! Choose a section above.</h2>} />

          {/* USTA SYSTEM */}
          <Route
            path="/usta/players"
            element={<PlayersList players={players} />}
          />
          <Route
            path="/usta/matches"
            element={<MatchRating players={players} setPlayers={setPlayers} />}
          />

          {/* COURTS REVIEW */}
          <Route path="/courts" element={<CourtsList />} />
          <Route path="/court/:id" element={<CourtDetail />} />
        </Routes>
      </main>
    </div>
  );
}

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
    <Router>
      <AppContent players={players} setPlayers={setPlayers} />
    </Router>
  );
}

export default App;
