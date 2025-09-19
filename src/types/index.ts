export interface Review {
  id: number;
  user: string;
  rating: number;
  text: string;
  createdAt?: Date;
}

export interface Court {
  id: number;
  name: string;
  location: string;
  image: string;
  averageRating: number;
  reviews: Review[];
  description?: string;
  amenities?: string[];
}

export interface NewReview {
  user: string;
  rating: number;
  text: string;
}

export interface SearchFilters {
  query: string;
  minRating?: number;
  location?: string;
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
}

export type RootStackParamList = {
  CourtsList: undefined;
  CourtDetail: { court: Court };
};

export interface CourtsContextType {
  courts: Court[];
  filteredCourts: Court[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  searchCourts: (query: string) => void;
  addReview: (courtId: number, review: NewReview) => Promise<void>;
  getCourt: (id: number) => Court | undefined;
}

export interface AnimationConfig {
  duration: number;
  useNativeDriver: boolean;
  tension?: number;
  friction?: number;
}
