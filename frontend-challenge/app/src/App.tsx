import { Routes, Route, Navigate } from 'react-router-dom'
import CourtListPage from './pages/CourtListPage.tsx'
import CourtDetailPage from './pages/CourtDetailPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CourtListPage />} />
      <Route path="/court/:id" element={<CourtDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
