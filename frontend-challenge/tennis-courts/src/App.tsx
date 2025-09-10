import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourtList from "./pages/CourtList";
import CourtDetail from "./pages/CourtDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourtList />} />
        <Route path="/court/:id" element={<CourtDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
