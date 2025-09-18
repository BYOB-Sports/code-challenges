// Court types
export interface Court {
  id: string;
  name: string;
  location: string;
  surface: 'clay' | 'grass' | 'hard' | 'carpet';
  indoor: boolean;
  pricePerHour: number;
  rating: number;
  imageUrl: string;
  description?: string;
  amenities: string[];
  availability: TimeSlot[];
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
