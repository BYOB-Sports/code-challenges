const sampleImages = [
  "https://images.unsplash.com/photo-1541744686607-75102f024505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHRlbm5pcyUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1582765974199-34f88f3c8bb4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHRlbm5pcyUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1567220720374-a67f33b2a6b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVubmlzJTIwY291cnR8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1515017804404-92b19fdfe6ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlbm5pcyUyMGNvdXJ0fGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1663039984787-b11d7240f592?w=500&auto=format&fit=crop&q=60",
];

const courts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Tennis Court ${i + 1}`,
  location: `City ${Math.floor(i / 5) + 1}, Area ${i + 1}`,
  image: sampleImages[i % sampleImages.length],
  description: "A well maintained tennis court with good lighting and seating.",
}));

export default courts;
