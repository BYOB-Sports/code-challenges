import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import CourtsList from "./components/CourtsList";
import CourtDetail from "./components/CourtDetail";

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/courts" element={<CourtsList />} />
          <Route path="/courts/:id" element={<CourtDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
