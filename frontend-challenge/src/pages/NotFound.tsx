import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container">
      <div className="empty-state">
        <div className="empty-illustration" aria-hidden>🚧</div>
        This page doesn’t exist.
        <Link to="/" className="btn primary">Go home</Link>
      </div>
    </div>
  );
}


