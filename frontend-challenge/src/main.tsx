import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { CourtsList } from './pages/CourtsList'
import { CourtDetail } from './pages/CourtDetail'

function AppShell() {
  return (
    <div className="mx-auto max-w-screen-sm min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur border-b border-slate-800 bg-slate-950/70">
        <div className="px-4 py-3 flex items-center gap-3">
          <span className="text-xl font-semibold">Tennis Courts</span>
        </div>
      </header>
      <main className="p-4 pb-20">
        <Routes>
          <Route path="/" element={<CourtsList />} />
          <Route path="/court/:id" element={<CourtDetail />} />
        </Routes>
      </main>
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </React.StrictMode>
)
