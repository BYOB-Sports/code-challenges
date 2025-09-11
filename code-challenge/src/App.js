import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourtList from "./pages/CourtList";
import CourtDetail from "./pages/CourtDetail";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tennis Court Review App</h1>
      </header>

      <main>
        <BrowserRouter>
          <Routes>
            {/* Home shows list of courts */}
            <Route path="/" element={<CourtList />} />

            {/* Detail view for a specific court */}
            <Route path="/court/:id" element={<CourtDetail />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
