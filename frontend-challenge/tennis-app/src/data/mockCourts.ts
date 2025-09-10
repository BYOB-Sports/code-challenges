export interface Review {
  user: string;
  comment: string;
  rating: number;
}

export interface Court {
  id: number;
  name: string;
  location: string;
  description: string;
  address: string;
  rating: number;
  reviews: Review[];
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const names = [
  "Willowbrook", "Stonehaven", "Cedar Grove", "Maplewood",
  "Oakridge", "Hillcrest", "Fairmont", "Brookside",
  "Ironwood", "Meadowlark", "Silverpine", "Chestnut Hollow"
];

const cities = [
  "Riverdale", "Ashford", "Kingston", "Brighton",
  "Hamilton", "Claremont", "Summit Hill", "Westfield",
  "Brookhaven", "Lakewood", "Fairview", "Ridgemont"
];

const descriptions = [
  "A scenic outdoor court with clay surface and excellent lighting.",
  "Modern facility with well-maintained grass courts.",
  "Hard courts suitable for all skill levels, open year-round.",
  "Cozy neighborhood court, ideal for evening matches.",
  "Professional-grade court with seating for spectators.",
  "Quiet location, perfect for weekend practice."
];

const streets = [
  "12 Oak Street", "45 Maple Avenue", "78 Cedar Lane", "23 Pine Drive",
  "56 Birch Road", "89 Elm Street", "34 Willow Court", "67 Aspen Blvd"
];

export const courts: Court[] = Array.from({ length: 65 }, (_, i) => ({
  id: i + 1,
  name: `${pick(names)} Court ${i + 1}`,
  location: pick(cities),
  description: pick(descriptions),
  address: pick(streets),
  rating: Math.round(Math.random() * 50) / 10,
  reviews: [
    { user: "Sam", comment: "Great atmosphere and clean courts.", rating: 5 },
    { user: "Nina", comment: "Lighting could be better.", rating: 3 }
  ]
}));
