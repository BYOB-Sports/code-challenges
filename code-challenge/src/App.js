import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourtsList from "./pages/CourtsList";
import CourtDetail from "./pages/CourtDetail";

function App() {
  return (
    // The use of React Router is a key improvement for creating a multi-page application.
    <Router>
      <Routes>
        <Route path="/" element={<CourtsList />} />
        <Route path="/courts/:id" element={<CourtDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

