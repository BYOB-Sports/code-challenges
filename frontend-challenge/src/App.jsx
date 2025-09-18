import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import CourtsPage from "./pages/CourtsPage";
import CourtDetailPage from "./pages/CourtDetailPage";
import SplashScreen from "./components/SplashScreen";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <>
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={<CourtsPage />} />
        <Route path="/court/:id" element={<CourtDetailPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
