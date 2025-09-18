import React, { useState } from 'react';
import tennisCourts from '../api/courtApi';
import CourtsList from './CourtsList';
import CourtDetail from './CourtDetail';

function TennisCourts() {
  const [selectedCourtId, setSelectedCourtId] = useState(null);

  const handleCourtSelect = (courtId) => {
    setSelectedCourtId(courtId);
  };

  const handleBackToList = () => {
    setSelectedCourtId(null);
  };

  return (
    <>
      {!selectedCourtId ? (
        <CourtsList courts={tennisCourts} onSelectCourt={handleCourtSelect} />
      ) : (
        <CourtDetail court={tennisCourts.find(c => c.id === selectedCourtId)} onBack={handleBackToList} />
      )}
    </>
  );
}

export default TennisCourts;
