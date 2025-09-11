import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourtsPage from "./pages/CourtsPage";
import CourtDetailPage from "./pages/CourtDetailPage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CourtsPage />} />
        <Route path="/court/:courtId" element={<CourtDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;