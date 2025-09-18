import React, { useEffect, useState } from 'react';
import CourtsList from './CourtsList';
import CourtDetail from './CourtDetail';
import './courts.css';

function parseHash() {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('/court/')) {
    return { route: 'detail', id: hash.split('/')[2] };
  }
  return { route: 'list' };
}

export default function CourtsApp() {
  const [route, setRoute] = useState(parseHash());
  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function goToDetail(id) {
    window.location.hash = `/court/${id}`;
  }
  function goBack() {
    window.location.hash = '/';
  }

  return (
    <div className="courts-app">
      {route.route === 'list' && <CourtsList onSelect={goToDetail} />}
      {route.route === 'detail' && <CourtDetail courtId={route.id} onBack={goBack} />}
    </div>
  );
}


