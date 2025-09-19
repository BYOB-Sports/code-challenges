import { create } from 'zustand';

export type Court = {
  id: string;
  name: string;
  city: string;
  state: string;
  surface: 'Hard' | 'Clay' | 'Grass';
  lights: boolean;
  indoor: boolean;
  courtsCount: number;
  lat: number;
  lng: number;
  avgRating: number;
  reviewsCount: number;
};

export type Review = {
  id: string;
  courtId: string;
  user: string;
  rating: number; // 1..5
  comment: string;
  createdAt: string;
};

type SortKey = 'rating' | 'distance' | 'name';

type State = {
  courts: Court[];
  reviews: Review[];
  query: string;
  sortBy: SortKey;
  selectedCourt?: Court;
};

type Actions = {
  bootstrap: (courts: Court[], reviews: Review[]) => void;
  setQuery: (q: string) => void;
  setSortBy: (k: SortKey) => void;
  selectCourt: (id: string) => void;
  addReview: (courtId: string, review: Omit<Review, 'id' | 'createdAt'>) => void;
  getCourtReviews: (id: string) => Review[];
  getFilteredCourts: (origin?: { lat: number; lng: number }) => Court[];
};

const distance = (a: {lat:number;lng:number}, b: {lat:number;lng:number}) => {
  const dx = a.lat - b.lat, dy = a.lng - b.lng;
  return Math.sqrt(dx*dx + dy*dy);
};

export const useCourtsStore = create<State & Actions>((set, get) => ({
  courts: [],
  reviews: [],
  query: '',
  sortBy: 'rating',
  selectedCourt: undefined,

  bootstrap: (courts, reviews) => set({ courts, reviews }),

  setQuery: (q) => set({ query: q }),

  setSortBy: (k) => set({ sortBy: k }),

  selectCourt: (id) => {
    const c = get().courts.find(c => c.id === id);
    set({ selectedCourt: c });
  },

  addReview: (courtId, partial) => {
    const id = Math.random().toString(36).slice(2);
    const createdAt = new Date().toISOString();
    const { courtId: _, ...partialWithoutCourtId } = partial;
    const review: Review = { id, courtId, createdAt, ...partialWithoutCourtId };
    const reviews = [review, ...get().reviews];
    // recompute aggregates
    const courtReviews = reviews.filter(r => r.courtId === courtId);
    const avg = courtReviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, courtReviews.length);
    const courts = get().courts.map(c =>
      c.id === courtId ? { ...c, reviewsCount: courtReviews.length, avgRating: parseFloat(avg.toFixed(2)) } : c
    );
    set({ reviews, courts });
  },

  getCourtReviews: (id) => get().reviews.filter(r => r.courtId === id).sort((a,b) => b.createdAt.localeCompare(a.createdAt)),

  getFilteredCourts: (origin = { lat: 37.7749, lng: -122.4194 }) => {
    const { courts, query, sortBy } = get();
    const q = query.trim().toLowerCase();
    let list = q ? courts.filter(c =>
      c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
    ) : courts.slice();

    if (sortBy === 'rating') list.sort((a,b) => b.avgRating - a.avgRating || b.reviewsCount - a.reviewsCount);
    if (sortBy === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
    if (sortBy === 'distance') list.sort((a,b) => distance(a, origin) - distance(b, origin));
    return list;
  },
}));
