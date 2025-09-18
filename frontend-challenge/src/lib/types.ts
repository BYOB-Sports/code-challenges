export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  date: string;
}

export interface Court {
  id: string;
  name: string;
  address: string;
  images: string[];
  reviews: Review[];
  rating: number;
}
