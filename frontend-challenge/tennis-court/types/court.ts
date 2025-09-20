export interface Court {
  id: number;
  name: string;
  average_rating: number;
  images: string[];
  location?: {
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  reviews: Review[];
}

export interface Review {
  user: string;
  rating?: number;
  comment?: string;
  date?: string;
}
