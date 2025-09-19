import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';
import { Court, NewReview, CourtsContextType } from '../types';
import { courts as initialCourts } from '../data/courts';

// Action types
type CourtsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'ADD_REVIEW'; payload: { courtId: number; review: NewReview } }
  | { type: 'UPDATE_COURT'; payload: Court };

// State interface
interface CourtsState {
  courts: Court[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

// Initial state
const initialState: CourtsState = {
  courts: initialCourts,
  isLoading: false,
  error: null,
  searchQuery: '',
};

// Reducer
const courtsReducer = (state: CourtsState, action: CourtsAction): CourtsState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'ADD_REVIEW': {
      const { courtId, review } = action.payload;
      const updatedCourts = state.courts.map(court => {
        if (court.id === courtId) {
          const newReview = {
            ...review,
            id: Date.now(),
            createdAt: new Date(),
          };
          const updatedReviews = [...court.reviews, newReview];
          const newAverageRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          
          return {
            ...court,
            reviews: updatedReviews,
            averageRating: Number(newAverageRating.toFixed(1)),
          };
        }
        return court;
      });
      
      return { ...state, courts: updatedCourts };
    }
    
    case 'UPDATE_COURT': {
      const updatedCourts = state.courts.map(court =>
        court.id === action.payload.id ? action.payload : court
      );
      return { ...state, courts: updatedCourts };
    }
    
    default:
      return state;
  }
};

// Context
const CourtsContext = createContext<CourtsContextType | undefined>(undefined);

// Provider component
interface CourtsProviderProps {
  children: ReactNode;
}

export const CourtsProvider: React.FC<CourtsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(courtsReducer, initialState);

  // Memoized filtered courts
  const filteredCourts = useMemo(() => {
    if (!state.searchQuery.trim()) {
      return state.courts;
    }
    
    const query = state.searchQuery.toLowerCase();
    return state.courts.filter(court =>
      court.name.toLowerCase().includes(query) ||
      court.location.toLowerCase().includes(query)
    );
  }, [state.courts, state.searchQuery]);

  // Actions
  const searchCourts = (query: string): void => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const addReview = async (courtId: number, review: NewReview): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call delay
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'ADD_REVIEW', payload: { courtId, review } });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add review' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getCourt = (id: number): Court | undefined => {
    return state.courts.find(court => court.id === id);
  };

  const contextValue: CourtsContextType = {
    courts: state.courts,
    filteredCourts,
    searchQuery: state.searchQuery,
    isLoading: state.isLoading,
    error: state.error,
    searchCourts,
    addReview,
    getCourt,
  };

  return (
    <CourtsContext.Provider value={contextValue}>
      {children}
    </CourtsContext.Provider>
  );
};

// Custom hook
export const useCourts = (): CourtsContextType => {
  const context = useContext(CourtsContext);
  if (context === undefined) {
    throw new Error('useCourts must be used within a CourtsProvider');
  }
  return context;
};
