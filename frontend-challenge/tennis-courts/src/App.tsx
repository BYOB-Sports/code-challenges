import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Court from "./pages/Court";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/court/:id" element={<Court />} />
      </Routes>
    </BrowserRouter>
  );
}
