import type { Court } from "@/types"

const cities = [
  { name: "New York", state: "NY", lat: 40.7128, lng: -74.006 },
  { name: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437 },
  { name: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298 },
  { name: "Houston", state: "TX", lat: 29.7604, lng: -95.3698 },
  { name: "Phoenix", state: "AZ", lat: 33.4484, lng: -112.074 },
  { name: "Philadelphia", state: "PA", lat: 39.9526, lng: -75.1652 },
  { name: "San Antonio", state: "TX", lat: 29.4241, lng: -98.4936 },
  { name: "San Diego", state: "CA", lat: 32.7157, lng: -117.1611 },
  { name: "Dallas", state: "TX", lat: 32.7767, lng: -96.797 },
  { name: "Austin", state: "TX", lat: 30.2672, lng: -97.7431 },
]

const courtNames = [
  "Central Park Tennis Center",
  "Riverside Courts",
  "Sunset Tennis Club",
  "Oak Hill Tennis",
  "Pine Valley Courts",
  "Mountain View Tennis",
  "Lakeside Tennis Center",
  "Forest Hills Courts",
  "Meadowbrook Tennis",
  "Hillcrest Tennis Club",
  "Valley View Courts",
  "Parkside Tennis",
  "Greenwood Tennis Center",
  "Maple Grove Courts",
  "Cedar Point Tennis",
  "Willow Creek Courts",
  "Stonegate Tennis Club",
  "Fairway Tennis Center",
  "Brookside Courts",
  "Highland Tennis",
  "Westside Tennis Club",
  "Eastgate Courts",
  "Northpoint Tennis",
  "Southview Courts",
  "Grandview Tennis Center",
  "Ridgemont Courts",
  "Clearwater Tennis",
  "Springdale Courts",
  "Millbrook Tennis Club",
  "Crosswinds Tennis",
  "Bayview Courts",
  "Summit Tennis Center",
]

const neighborhoods = [
  "Downtown",
  "Midtown",
  "Uptown",
  "Westside",
  "Eastside",
  "Northside",
  "Southside",
  "Old Town",
  "New Town",
  "Historic District",
  "Arts District",
  "Financial District",
  "Riverside",
  "Lakefront",
  "Hillside",
  "Valley",
  "Heights",
  "Gardens",
  "Park View",
  "City Center",
  "Suburbs",
  "Metro Area",
  "University District",
  "Shopping District",
]

const surfaces: ("hard" | "clay" | "grass")[] = ["hard", "clay", "grass"]

const openingHours = [
  {
    mon: "6:00 AM - 10:00 PM",
    tue: "6:00 AM - 10:00 PM",
    wed: "6:00 AM - 10:00 PM",
    thu: "6:00 AM - 10:00 PM",
    fri: "6:00 AM - 10:00 PM",
    sat: "7:00 AM - 9:00 PM",
    sun: "7:00 AM - 9:00 PM",
  },
  {
    mon: "5:30 AM - 11:00 PM",
    tue: "5:30 AM - 11:00 PM",
    wed: "5:30 AM - 11:00 PM",
    thu: "5:30 AM - 11:00 PM",
    fri: "5:30 AM - 11:00 PM",
    sat: "6:00 AM - 10:00 PM",
    sun: "6:00 AM - 10:00 PM",
  },
  {
    mon: "7:00 AM - 9:00 PM",
    tue: "7:00 AM - 9:00 PM",
    wed: "7:00 AM - 9:00 PM",
    thu: "7:00 AM - 9:00 PM",
    fri: "7:00 AM - 9:00 PM",
    sat: "8:00 AM - 8:00 PM",
    sun: "8:00 AM - 8:00 PM",
  },
  {
    mon: "6:00 AM - 9:00 PM",
    tue: "6:00 AM - 9:00 PM",
    wed: "6:00 AM - 9:00 PM",
    thu: "6:00 AM - 9:00 PM",
    fri: "6:00 AM - 9:00 PM",
    sat: "7:00 AM - 8:00 PM",
    sun: "7:00 AM - 8:00 PM",
  },
]

function generateCourts(): Court[] {
  const courts: Court[] = []

  for (let i = 0; i < 85; i++) {
    const city = cities[Math.floor(Math.random() * cities.length)]
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)]
    const courtName = courtNames[Math.floor(Math.random() * courtNames.length)]
    const surface = surfaces[Math.floor(Math.random() * surfaces.length)]
    const hours = openingHours[Math.floor(Math.random() * openingHours.length)]

    // Add some variation to coordinates within the city
    const latVariation = (Math.random() - 0.5) * 0.1
    const lngVariation = (Math.random() - 0.5) * 0.1

    const getCourtImage = () => {
      const isIndoor = Math.random() < 0.3
      const hasLights = Math.random() < 0.7

      if (isIndoor) {
        return "/images/tennis-indoor-court.jpg"
      }

      if (hasLights && Math.random() < 0.3) {
        return "/images/tennis-night-court.jpg"
      }

      switch (surface) {
        case "clay":
          return "/images/tennis-clay-court.jpg"
        case "grass":
          return "/images/tennis-grass-court.jpg"
        case "hard":
        default:
          return "/images/tennis-hard-court.jpg"
      }
    }

    const court: Court = {
      id: `court-${i + 1}`,
      name: `${courtName} ${i > 30 ? neighborhood : ""}`.trim(),
      address: `${Math.floor(Math.random() * 9999) + 1} ${neighborhood} ${["St", "Ave", "Blvd", "Dr", "Way"][Math.floor(Math.random() * 5)]}`,
      city: city.name,
      state: city.state,
      lat: city.lat + latVariation,
      lng: city.lng + lngVariation,
      surface,
      indoor: Math.random() < 0.3,
      lights: Math.random() < 0.7,
      courtsCount: Math.floor(Math.random() * 8) + 1,
      isFree: Math.random() < 0.4,
      openingHours: hours,
      thumbnailUrl: getCourtImage(),
      rating: Math.round((Math.random() * 2 + 3) * 2) / 2, // 3.0 to 5.0 in 0.5 increments
      reviewsCount: Math.floor(Math.random() * 150) + 5,
    }

    courts.push(court)
  }

  return courts.sort((a, b) => a.name.localeCompare(b.name))
}

export const courts = generateCourts()
