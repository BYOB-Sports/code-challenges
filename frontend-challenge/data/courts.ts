export interface Court {
  id: number;
  name: string;
  location: string;
  rating: number;
}

const courts: Court[] = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `Court ${i + 1}`,
  location: `City ${i % 10}`,
  rating: Math.floor(Math.random() * 5) + 1,
}));

export default courts;
