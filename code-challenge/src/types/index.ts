export interface Court {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  surface: 'Hard' | 'Clay' | 'Grass' | 'Synthetic';
  indoor: boolean;
  lights: boolean;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Review {
  id: string;
  courtId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

export interface SearchFilters {
  query: string;
  surface?: string;
  indoor?: boolean;
  lights?: boolean;
  maxPrice?: number;
  minRating?: number;
}
