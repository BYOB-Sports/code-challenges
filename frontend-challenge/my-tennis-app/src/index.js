import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import tennisCourts from './data';
import DetailView from './DetailView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
   <App />
    </BrowserRouter>
  </React.StrictMode>
);
