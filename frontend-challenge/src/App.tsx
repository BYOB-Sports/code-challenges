

import { useState } from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import "./App.css";
import { courts as initialCourts } from "./data/courts";
import CourtTable  from "./components/CourtTable";
import { CourtDetail } from "./pages/CourtDetail";
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';

export type Review = { user: string; rating: number; comment: string };
export type Court = typeof initialCourts[number] & { reviews: Review[] };

function App() {
  const [courts, setCourts] = useState<Court[]>(
    initialCourts.map(c => ({ ...c, reviews: [...c.reviews] }))
  );

  // Add review to a court
  const addReview = (courtId: number, review: Review) => {
    setCourts(prev =>
      prev.map(c =>
        c.id === courtId ? { ...c, reviews: [review, ...c.reviews] } : c
      )
    );
  };

  function DetailRoute() {
    const { id } = useParams();
    const navigate = useNavigate();
    const cid = Number(id);
    const court = courts.find(c => c.id === cid);
    if (!court) return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h6">Court not found</Typography>
        <button onClick={() => navigate('/')}>Back</button>
      </Container>
    );
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <CourtDetail court={court} addReview={addReview} onBack={() => navigate('/')} />
      </Container>
    );
  }

  return (
    <BrowserRouter>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>Tennis Courts</Typography>
        <Routes>
          <Route path="/" element={<CourtTable courts={courts} onSelectCourt={(id) => { window.location.pathname = `/detail/${id}` }} />} />
          <Route path="/detail/:id" element={<DetailRoute />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
