import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourtList from './pages/CourtList';
import CourtDetail from './pages/CourtDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<CourtList />} />
          <Route path="/court/:id" element={<CourtDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
