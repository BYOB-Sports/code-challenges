import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CourtDetail from './pages/CourtDetail';
import Header from '../Header';
import { ThemeProvider } from './store/ThemeContext';
import CourtParallax from './components/CourtParallax';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header name="You" />
        <div className="app-bg" aria-hidden />
        <CourtParallax />
        <FadeRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function FadeRoutes() {
  const location = useLocation();
  return (
    <main key={location.pathname} className="app-main fade-enter fade-enter-active">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/court/:courtId" element={<CourtDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}


