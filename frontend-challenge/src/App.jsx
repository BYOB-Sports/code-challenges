import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourtList from "./pages/CourtList";
import CourtDetails from "./pages/CourtDetails";
import { CourtProvider } from "./context/CourtContext";
import "./App.css";

function App() {
  return (
    <CourtProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CourtList />} />
          <Route path="/court/:id" element={<CourtDetails />} />
        </Routes>
      </Router>
    </CourtProvider>
  );
}

export default App;
