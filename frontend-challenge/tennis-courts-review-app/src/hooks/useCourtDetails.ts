import { useState, useEffect } from 'react';
import { mockCourts, TennisCourt } from '../data/mockCourts';

interface UseCourtDetailsReturn {
  court: TennisCourt | null;
  loading: boolean;
  error: string | null;
}

export const useCourtDetails = (courtId: string): UseCourtDetailsReturn => {
  const [court, setCourt] = useState<TennisCourt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourtDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simulate API call to fetch court details
        const foundCourt = mockCourts.find(c => c.id === courtId);
        
        if (!foundCourt) {
          setError('Court not found');
          setCourt(null);
        } else {
          setCourt(foundCourt);
        }
      } catch (err) {
        setError('Failed to fetch court details');
        setCourt(null);
      } finally {
        setLoading(false);
      }
    };

    if (courtId) {
      fetchCourtDetails();
    }
  }, [courtId]);

  return { court, loading, error };
};
