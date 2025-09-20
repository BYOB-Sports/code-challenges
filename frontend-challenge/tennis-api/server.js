// tennis-api/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// --- Static users (demo only) ---
const users = [
  {
    id: "u1",
    username: "alice",
    password: "password123",
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    token: "token-alice",
  },
  {
    id: "u2",
    username: "bob",
    password: "password123",
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    token: "token-bob",
  },
  {
    id: "u3",
    username: "carol",
    password: "password123",
    name: "Carol Chen",
    avatar: "https://i.pravatar.cc/150?img=3",
    token: "token-carol",
  },
];

const userByToken = Object.fromEntries(users.map((u) => [u.token, u]));

// --- Fake courts database ---
const courts = [
  // New York Courts
  {
    id: "c1",
    name: "Riverside Tennis Center",
    address: "120 Riverside Blvd, New York, NY",
    pincode: "10001",
    description:
      "Eight well-maintained hard courts with night lighting along the river.",
    workingHours: "06:00 - 22:00",
    courtsAvailable: 8,
    images: [
      "https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 40.77, lng: -73.99 },
  },
  {
    id: "c2",
    name: "Chelsea Court Plex",
    address: "301 W 26th St, New York, NY",
    pincode: "10001",
    description: "Indoor/outdoor mix with pro shop and stringing.",
    workingHours: "07:00 - 23:00",
    courtsAvailable: 6,
    images: [
      "https://images.pexels.com/photos/1040473/pexels-photo-1040473.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 40.75, lng: -73.99 },
  },
  {
    id: "c7",
    name: "Central Park Tennis Club",
    address: "93rd St & Central Park West, New York, NY",
    pincode: "10001",
    description:
      "Historic tennis club in the heart of Manhattan with 4 clay courts.",
    workingHours: "06:00 - 20:00",
    courtsAvailable: 4,
    images: [
      "https://images.pexels.com/photos/3970329/pexels-photo-3970329.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 40.78, lng: -73.97 },
  },
  {
    id: "c8",
    name: "Brooklyn Heights Tennis",
    address: "85 Remsen St, Brooklyn, NY",
    pincode: "10001",
    description: "Modern outdoor courts with Manhattan skyline views.",
    workingHours: "07:00 - 21:00",
    courtsAvailable: 3,
    images: [
      "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 40.7, lng: -73.99 },
  },

  // San Francisco Courts
  {
    id: "c3",
    name: "Embarcadero Tennis Park",
    address: "Pier 3, San Francisco, CA",
    pincode: "94105",
    description: "Bay views, 5 courts, windscreens, friendly crowd.",
    workingHours: "06:00 - 21:00",
    courtsAvailable: 5,
    images: [
      "https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 37.79, lng: -122.39 },
  },
  {
    id: "c9",
    name: "Golden Gate Tennis Club",
    address: "2150 Fulton St, San Francisco, CA",
    pincode: "94105",
    description:
      "Premium courts near Golden Gate Park with professional coaching.",
    workingHours: "06:00 - 22:00",
    courtsAvailable: 6,
    images: [
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/3970332/pexels-photo-3970332.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 37.77, lng: -122.45 },
  },
  {
    id: "c10",
    name: "Mission Bay Tennis Center",
    address: "1200 4th St, San Francisco, CA",
    pincode: "94105",
    description: "State-of-the-art facility with indoor and outdoor options.",
    workingHours: "05:30 - 23:00",
    courtsAvailable: 8,
    images: [
      "https://images.pexels.com/photos/1040473/pexels-photo-1040473.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 37.77, lng: -122.39 },
  },

  // Los Angeles Courts
  {
    id: "c4",
    name: "Hollywood Tennis Club",
    address: "2233 Vine St, Los Angeles, CA",
    pincode: "90028",
    description: "Classic club with 6 courts and historic charm.",
    workingHours: "06:00 - 22:00",
    courtsAvailable: 6,
    images: [
      "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2873487/pexels-photo-2873487.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 34.09, lng: -118.33 },
  },
  {
    id: "c11",
    name: "Venice Beach Courts",
    address: "1800 Ocean Front Walk, Venice, CA",
    pincode: "90028",
    description: "Beachside tennis with ocean breeze and vibrant atmosphere.",
    workingHours: "07:00 - 20:00",
    courtsAvailable: 4,
    images: [
      "https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 33.99, lng: -118.46 },
  },
  {
    id: "c12",
    name: "Beverly Hills Tennis Academy",
    address: "445 N Rexford Dr, Beverly Hills, CA",
    pincode: "90028",
    description:
      "Luxury tennis facility with private lessons and pristine courts.",
    workingHours: "06:00 - 23:00",
    courtsAvailable: 5,
    images: [
      "https://images.pexels.com/photos/3970329/pexels-photo-3970329.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 34.07, lng: -118.4 },
  },

  // Miami Courts
  {
    id: "c5",
    name: "Miami Beach Tennis Center",
    address: "1000 Washington Ave, Miami Beach, FL",
    pincode: "33139",
    description: "Oceanside courts with tropical atmosphere.",
    workingHours: "07:00 - 21:00",
    courtsAvailable: 4,
    images: [
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/3970332/pexels-photo-3970332.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 25.78, lng: -80.13 },
  },
  {
    id: "c13",
    name: "Key Biscayne Tennis Club",
    address: "6702 Crandon Blvd, Key Biscayne, FL",
    pincode: "33139",
    description: "Championship courts where the Miami Open was once held.",
    workingHours: "06:00 - 22:00",
    courtsAvailable: 12,
    images: [
      "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2873487/pexels-photo-2873487.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 25.7, lng: -80.16 },
  },
  {
    id: "c14",
    name: "South Beach Tennis Courts",
    address: "1500 Collins Ave, Miami Beach, FL",
    pincode: "33139",
    description: "Art Deco style courts steps away from the beach.",
    workingHours: "07:00 - 20:00",
    courtsAvailable: 3,
    images: [
      "https://images.pexels.com/photos/1040473/pexels-photo-1040473.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 25.79, lng: -80.13 },
  },

  // Austin Courts
  {
    id: "c6",
    name: "Austin Tennis Academy",
    address: "1234 South Lamar, Austin, TX",
    pincode: "78704",
    description: "Modern facility with 8 courts and training programs.",
    workingHours: "06:00 - 23:00",
    courtsAvailable: 8,
    images: [
      "https://images.pexels.com/photos/1040473/pexels-photo-1040473.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 30.26, lng: -97.75 },
  },
  {
    id: "c15",
    name: "Zilker Park Tennis Courts",
    address: "2100 Barton Springs Rd, Austin, TX",
    pincode: "78704",
    description:
      "Public courts in beautiful Zilker Park with city skyline views.",
    workingHours: "06:00 - 21:00",
    courtsAvailable: 6,
    images: [
      "https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 30.26, lng: -97.77 },
  },
  {
    id: "c16",
    name: "Lake Austin Tennis Club",
    address: "3939 Bee Cave Rd, Austin, TX",
    pincode: "78704",
    description: "Exclusive lakeside tennis club with premium amenities.",
    workingHours: "05:30 - 22:30",
    courtsAvailable: 10,
    images: [
      "https://images.pexels.com/photos/3970329/pexels-photo-3970329.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ],
    coords: { lat: 30.28, lng: -97.8 },
  },
];

// Available locations for dropdown
const locations = [
  { id: "ny", name: "New York", pincode: "10001" },
  { id: "sf", name: "San Francisco", pincode: "94105" },
  { id: "la", name: "Los Angeles", pincode: "90028" },
  { id: "miami", name: "Miami", pincode: "33139" },
  { id: "austin", name: "Austin", pincode: "78704" },
];

// --- Reviews in-memory (courtId -> list) ---
const reviews = {
  c1: [
    {
      id: "r1",
      userId: "u2",
      rating: 5,
      text: "Courts feel fast. Lights are great!",
      createdAt: new Date().toISOString(),
    },
    {
      id: "r2",
      userId: "u3",
      rating: 4,
      text: "Can be crowded after work.",
      createdAt: new Date().toISOString(),
    },
  ],
  c2: [
    {
      id: "r3",
      userId: "u1",
      rating: 4,
      text: "Nice staff, good stringing service.",
      createdAt: new Date().toISOString(),
    },
  ],
  c3: [
    {
      id: "r4",
      userId: "u1",
      rating: 5,
      text: "Views are unreal. Loved it!",
      createdAt: new Date().toISOString(),
    },
    {
      id: "r5",
      userId: "u2",
      rating: 3,
      text: "Windy sometimes but fun.",
      createdAt: new Date().toISOString(),
    },
  ],
};

function avgRating(courtId) {
  const r = reviews[courtId] || [];
  if (!r.length) return { avg: 0, count: 0 };
  const sum = r.reduce((a, b) => a + b.rating, 0);
  return { avg: Math.round((sum / r.length) * 10) / 10, count: r.length };
}

// --- Auth ---
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  return res.json({
    token: user.token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
    },
  });
});

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");
  if (!userByToken[token])
    return res.status(401).json({ message: "Unauthorized" });
  req.user = userByToken[token];
  next();
}

// --- Locations endpoint ---
app.get("/locations", (req, res) => {
  res.json(locations);
});

// --- Fake geocode ---
app.get("/geocode", (req, res) => {
  const raw = (req.query.location || "").toString().toLowerCase();
  let pincode = "10001"; // Default to New York

  if (
    raw.includes("san francisco") ||
    raw.includes("sf") ||
    raw.includes("941")
  ) {
    pincode = "94105";
  } else if (
    raw.includes("los angeles") ||
    raw.includes("la") ||
    raw.includes("hollywood") ||
    raw.includes("902")
  ) {
    pincode = "90028";
  } else if (raw.includes("miami") || raw.includes("331")) {
    pincode = "33139";
  } else if (raw.includes("austin") || raw.includes("787")) {
    pincode = "78704";
  }

  res.json({ location: req.query.location || "", pincode });
});

// --- Courts list/search ---
app.get("/courts", (req, res) => {
  const { pincode = "", q = "" } = req.query;
  let list = courts.filter((c) => (pincode ? c.pincode === pincode : true));
  if (q) {
    const qq = q.toString().toLowerCase();
    list = list.filter(
      (c) =>
        c.name.toLowerCase().includes(qq) ||
        c.address.toLowerCase().includes(qq)
    );
  }
  const enriched = list.map((c) => ({ ...c, ...avgRating(c.id) }));
  res.json(enriched);
});

// --- Court detail ---
app.get("/courts/:id", (req, res) => {
  const court = courts.find((c) => c.id === req.params.id);
  if (!court) return res.status(404).json({ message: "Not found" });
  res.json({ ...court, ...avgRating(court.id) });
});

// --- Reviews ---
app.get("/courts/:id/reviews", (req, res) => {
  const r = (reviews[req.params.id] || []).map((r) => {
    const u = users.find((u) => u.id === r.userId);
    return {
      ...r,
      user: u ? { id: u.id, name: u.name, avatar: u.avatar } : null,
    };
  });
  res.json(r);
});

app.post("/courts/:id/reviews", auth, (req, res) => {
  const { rating, text } = req.body || {};
  if (!rating || rating < 1 || rating > 5)
    return res.status(400).json({ message: "rating 1-5 required" });
  const id = "r" + Math.random().toString(36).slice(2, 8);
  const entry = {
    id,
    userId: req.user.id,
    rating,
    text: (text || "").slice(0, 500),
    createdAt: new Date().toISOString(),
  };
  reviews[req.params.id] ||= [];
  reviews[req.params.id].unshift(entry);
  const u = { id: req.user.id, name: req.user.name, avatar: req.user.avatar };
  res.status(201).json({ ...entry, user: u });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("API running on http://localhost:" + PORT));
