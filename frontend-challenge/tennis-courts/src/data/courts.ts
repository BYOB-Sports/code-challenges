import { faker } from "@faker-js/faker";

export interface Court {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: string[];
  image: string; // new field
}

export const courts: Court[] = Array.from({ length: 50 }, () => ({
  id: faker.string.uuid(),
  name: faker.location.city() + " Tennis Court",
  location: faker.location.streetAddress(),
  rating: faker.number.int({ min: 1, max: 5 }),
  reviews: [],
  image: `https://picsum.photos/400/300?random=${faker.number.int({
    min: 1,
    max: 1000,
  })}`,
}));
