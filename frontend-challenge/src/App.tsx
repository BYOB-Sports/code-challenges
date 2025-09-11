import { Routes, Route, Link, useLocation } from "react-router-dom";
import CourtPage from "./pages/CourtPage";
import CourtDetailPage from "./pages/CourtDetailPage";

export default function App() {
  const { pathname } = useLocation();
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="dot" aria-hidden />
          BYOB Tennis
        </Link>
        {pathname !== "/" && <Link to="/" className="back">← Back</Link>}
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<CourtPage />} />
          <Route path="/court/:id" element={<CourtDetailPage />} />
        </Routes>
      </main>

      <footer className="app-footer">© {new Date().getFullYear()} TennisScout</footer>
    </div>
  );
}
