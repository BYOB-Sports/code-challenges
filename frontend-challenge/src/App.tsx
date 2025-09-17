import React, { useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import { COURTS as MOCK } from './mock/courts'
import { Court } from './types'

export default function App(){
  const [courts, setCourts] = useState<Court[]>(MOCK)
  const navigate = useNavigate()

  const updateCourt = (updated: Court) => {
    setCourts(prev => prev.map(c => c.id === updated.id ? updated : c))
  }

  return (
    <div className="min-h-screen">
        <header className="bg-blue-600 shadow sticky top-0 z-10">
    <div className="max-w-md mx-auto p-4 flex justify-center">
      <button
        onClick={() => navigate('/')}
        className="font-bold text-xl text-white"
      >
        COURTLY
      </button>
    </div>
  </header>

      <main className="max-w-md mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home courts={courts} onSelect={(id)=>navigate(`/court/${id}`)} />} />
          <Route path="/court/:id" element={<Detail courts={courts} onUpdate={updateCourt} />} />
        </Routes>
      </main>
    </div>
  )
}
