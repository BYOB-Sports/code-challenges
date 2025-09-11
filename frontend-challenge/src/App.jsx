import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CourtDetailPage from "./pages/CourtDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/court/:id" element={<CourtDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
