import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Details from './Pages/Details';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/court/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
