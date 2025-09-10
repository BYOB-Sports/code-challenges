const courtNames = [
  "Central Park Court",
  "Golden Gate Court",
  "Lincoln Park Court",
  "Riverside Courts",
  "Sunset Tennis Club",
  "Maple Leaf Courts",
  "Highland Park Tennis",
  "Lakeside Courts",
  "Greenwood Tennis Center",
  "Oakwood Courts",
  "Parkside Tennis",
  "Valley View Courts",
];

const cities = [
  "New York, NY",
  "San Francisco, CA",
  "Chicago, IL",
  "Los Angeles, CA",
  "Boston, MA",
  "Miami, FL",
  "Seattle, WA",
  "Denver, CO",
  "Austin, TX",
  "Portland, OR",
  "Atlanta, GA",
  "Philadelphia, PA",
];

const dummyCourts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `${courtNames[i % courtNames.length]}`,
  address: `${cities[i % cities.length]}`,
  info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis temporibus qui",
  image: "https://picsum.photos/id/237/600/600",
  reviews: [],
}));

dummyCourts[0].reviews.push({
  text: "This court was wonderful",
});

export default dummyCourts;
