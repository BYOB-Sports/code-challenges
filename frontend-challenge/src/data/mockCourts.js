// Import your local images
import court1 from "../assets/images/court1.jpg";
import court2 from "../assets/images/court2.jpg";
import court3 from "../assets/images/court3.jpg";
import court4 from "../assets/images/court4.jpg";
import court5 from "../assets/images/court5.jpg";
import court6 from "../assets/images/court6.jpg";
import court7 from "../assets/images/court7.jpg";
import court8 from "../assets/images/court8.jpg";

const images = [
    court1, court2, court3, court4, court5,
    court6, court7, court8
];

// Unique names (looped for 50 courts)
const names = [
    "Central Park Tennis Center","Riverside Court","Greenwood Club","Lakeview Tennis Grounds",
    "Maplewood Court","Hilltop Tennis Arena","Sunnyvale Courts","Oakridge Tennis Club",
    "Riverside Sports Complex","Bayview Tennis Facility"
];

// Unique descriptions (looped)
const descriptions = [
    "Premium courts with night lighting and professional coaching.",
    "Scenic outdoor venue with clay courts and lounge area.",
    "Indoor courts with advanced facilities and tournaments.",
    "Courts next to a lake, perfect for morning matches.",
    "Family-friendly with beginner lessons on weekends.",
    "Indoor courts with electronic scoring systems.",
    "Outdoor hard courts with shaded seating.",
    "Indoor and outdoor courts with coaching programs.",
    "Multiple courts including clay, grass, and hard surfaces.",
    "Overlooks the bay and provides professional-grade courts."
];

export const mockCourts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length] + ` ${i + 1}`, // e.g., "Central Park Tennis Center 1"
    location: `City Area ${i + 1}`,
    imageUrl: images[i % images.length], // Loop through images
    description: descriptions[i % descriptions.length] + ` Court number ${i + 1}.`,
    reviews: [],
}));