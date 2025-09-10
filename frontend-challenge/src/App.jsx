import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourtList from "./pages/CourtList";
import CourtDetails from "./pages/CourtDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourtList />} />
        <Route path="/court/:id" element={<CourtDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
