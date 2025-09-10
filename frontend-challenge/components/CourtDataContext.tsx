'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { generateMockCourts } from '@/lib/GenerateCourts';

type Court = {
  id: number;
  name: string;
  location: string;
  description: string;
  players: number;
  reviews: string[];
};

type CourtContextType = {
  courts: Court[];
  setCourts: (courts: Court[]) => void;
};

const CourtContext = createContext<CourtContextType | null>(null);

export const CourtProvider = ({ children }: { children: ReactNode }) => {
  const [courts, setCourts] = useState<Court[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('mockcourts');
    if (stored) {
      setCourts(JSON.parse(stored));
      return
    } 
    
    const generated = generateMockCourts(60);
    localStorage.setItem('mockcourts', JSON.stringify(generated));
    setCourts(generated);
  }, []);

  useEffect(() => {
    localStorage.setItem('mockcourts', JSON.stringify(courts));
  }, [courts]);

  return (
    <CourtContext.Provider value={{ courts, setCourts }}>
      {children}
    </CourtContext.Provider>
  );
};

export const useMockedCourtsData = () => {
  const context = useContext(CourtContext);
  if (!context) {
    throw new Error('useCourts must be used within a CourtProvider');
  }
  return context;
};
