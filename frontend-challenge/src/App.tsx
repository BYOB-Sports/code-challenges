import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourtsList from "./pages/CourtsList";
import CourtDetail from "./pages/CourtDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourtsList />} />
        <Route path="/court/:id" element={<CourtDetail />} />
      </Routes>
    </BrowserRouter>
  );
}