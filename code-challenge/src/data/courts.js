const seedNames = [
  "Central Park Court", "Golden Gate Park Court", "Venice Beach Court", "Riverside Court",
  "Lakeside Court", "Maplewood Court", "Hillcrest Court", "Broadway Court",
  "Parkway Court", "Sunset Court", "Oak Grove Court", "Elm Street Court",
  "Bayview Court", "Harbor Court", "Pine Ridge Court", "Valley View Court",
  "Highland Court", "Meadow Court", "Forest Glen Court", "Marina Court",
  "Cedar Park Court", "Willow Court", "Southgate Court", "Northfield Court",
  "West End Court", "Eastside Court", "Union Court", "Liberty Court",
  "Founders Court", "Victory Court", "Prospect Court", "Camden Court",
  "Ridgeview Court", "Silver Lake Court", "Crown Court", "Holly Court",
  "Beacon Court", "Sierra Court", "Summit Court", "Harborview Court",
  "Glacier Court", "Creekside Court", "Orchard Court", "Plaza Court",
  "College Court", "Monument Court", "Grove Court", "Festival Court",
  "Market Court", "Station Court"
];

const surfaces = ["Hard", "Clay", "Grass", "Concrete", "Synthetic"];

const cities = [
  "New York, NY", "San Francisco, CA", "Los Angeles, CA", "Chicago, IL", "Houston, TX",
  "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX",
  "San Jose, CA", "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH",
  "Charlotte, NC", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC",
  "Boston, MA", "El Paso, TX", "Nashville, TN", "Detroit, MI", "Oklahoma City, OK",
  "Portland, OR", "Las Vegas, NV", "Memphis, TN", "Louisville, KY", "Baltimore, MD",
  "Milwaukee, WI", "Albuquerque, NM", "Tucson, AZ", "Fresno, CA", "Sacramento, CA",
  "Kansas City, MO", "Atlanta, GA", "Miami, FL", "Raleigh, NC", "Omaha, NE",
  "Long Beach, CA", "Virginia Beach, VA", "Oakland, CA", "Minneapolis, MN", "Tulsa, OK",
  "Arlington, TX", "New Orleans, LA", "Wichita, KS", "Cleveland, OH", "Tampa, FL"
];

function randomFrom(arr, i) {
  // deterministic-ish by index
  return arr[i % arr.length];
}

const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};

const courts = seedNames.map((name, i) => {
  const id = i + 1;
  const type = i % 3 === 0 ? "private" : "public";
  const accessDetails =
    type === "private"
      ? "Private membership required. Contact manager for court times."
      : "Open to the public. First-come, first-served. Some peak-hour reservations available.";
  const location = randomFrom(cities, i);
  const surface = randomFrom(surfaces, i);
  
  const sampleReviews = i % 5 === 0
    ? [{ user: "Alex", rating: 4, comment: "Great courts and friendly staff." }]
    : [];
  
  // A key improvement: calculating and storing the average rating with the data.
  const averageRating = calculateAverageRating(sampleReviews);

  return {
    id,
    name,
    location,
    surface,
    type,
    accessDetails,
    reviews: sampleReviews,
    rating: averageRating,
  };
});

export default courts;