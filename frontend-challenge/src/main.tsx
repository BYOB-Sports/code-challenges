import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CourtsProvider } from './store/CourtsContext';
import './styles.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <React.StrictMode>
    <CourtsProvider>
      <App />
    </CourtsProvider>
  </React.StrictMode>
);


