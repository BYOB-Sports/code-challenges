import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CardList } from "./pages/CardList";
import { CardDetail } from "./pages/CardDetail";
import "./App.css";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CardList />} />
      <Route path="/court/:id" element={<CardDetail />} />
    </Routes>
  </BrowserRouter>
);

export default App;
