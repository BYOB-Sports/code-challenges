// Court types
export interface Court {
  id: string;
  name: string;
  address: string;
  location: string; // kept for backwards compatibility
  surface: 'clay' | 'grass' | 'hard' | 'synthetic';
  indoor: boolean;
  pricePerHour: number;
  rating: number;
  imageUrl: string;
  images: string[];
  description?: string;
  amenities: string[];
  availability: TimeSlot[];
  numberOfCourts: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  phoneNumber: string;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  reviews: Review[];
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
  price: number;
}

// Review types
export interface Review {
  id: string;
  courtId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpfulVotes: number;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}

// Navigation types
export type RootStackParamList = {
  CourtsList: undefined;
  CourtDetail: { courtId: string };
};

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Filter types
export interface CourtsFilter {
  surface?: Court['surface'];
  indoor?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  location?: string;
}
