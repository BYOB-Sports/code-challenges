export type SurfaceType = 'hard' | 'clay' | 'grass' | 'carpet';

export type Court = {
  id: string;
  name: string;
  city: string;
  state: string;
  surface: SurfaceType;
  indoor: boolean;
  lighted: boolean;
  numCourts: number;
  lat?: number;
  lon?: number;
};

export type Review = {
  id: string;
  courtId: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string; // ISO
};


