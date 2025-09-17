import React from "react";
import { Routes, Route } from "react-router-dom";
import CourtListPage from "./pages/CourtListPage";
import CourtDetailPage from "./pages/CourtDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CourtListPage />} />
      <Route path="/courts/:id" element={<CourtDetailPage />} />
    </Routes>
  );
};

export default App;
