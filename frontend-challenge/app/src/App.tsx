import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourtList from "./pages/CourtList";
import CourtDetail from "./pages/CourtDetail";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourtList />} />
        <Route path="/court/:id" element={<CourtDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

