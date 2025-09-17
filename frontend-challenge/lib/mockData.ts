import type { Court, Review } from './types'

const cities = [
  'Riverside',
  'Brookside',
  'Maplewood',
  'Highland',
  'Lakeview',
  'Cedar Park',
  'Parkside',
  'Oakridge'
]
const surfaces = ['Hard', 'Clay', 'Grass', 'Synthetic']

const photos = [
  'https://images.pexels.com/photos/1619860/pexels-photo-1619860.jpeg',
  'https://images.pexels.com/photos/2961964/pexels-photo-2961964.jpeg',
  'https://images.pexels.com/photos/221249/pexels-photo-221249.jpeg',
  'https://images.pexels.com/photos/342361/pexels-photo-342361.jpeg',
  'https://images.pexels.com/photos/1598347/pexels-photo-1598347.jpeg',
  'https://images.pexels.com/photos/2961946/pexels-photo-2961946.jpeg',
  'https://images.pexels.com/photos/3452545/pexels-photo-3452545.jpeg',
  'https://images.pexels.com/photos/2694942/pexels-photo-2694942.jpeg',
  'https://images.pexels.com/photos/2568551/pexels-photo-2568551.jpeg',
  'https://images.pexels.com/photos/341003/pexels-photo-341003.jpeg'
]

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeCourt(i: number): Court {
  const city = cities[i % cities.length]
  const name = `${city} Tennis Court ${Math.floor(i / 2) + 1}`
  const surface = surfaces[i % surfaces.length]
  const rating = Number((Math.random() * 2 + 3).toFixed(1))
  const reviews: Review[] = []
  const sampleReviews = [
    'Great surface and lighting.',
    'Well maintained courts, friendly staff.',
    'Parking is limited but the court is good.',
    'Perfect for weekend practice.',
    'Booked quickly during evenings.'
  ]
  const reviewCount = randomBetween(0, 3)
  for (let r = 0; r < reviewCount; r++) {
    reviews.push({
        id: `${i}-r-${r}`,
        author: `User${randomBetween(10, 99)}`,
        rating: randomBetween(3, 5),
        text: sampleReviews[(i + r) % sampleReviews.length],
        createdAt: Date.now() - randomBetween(0, 1000 * 60 * 60 * 24 * 30),
        email: ''
    })
  }

  return {
    id: `court-${i}`,
    name,
    city,
    address: `${100 + i} ${city} Ave`,
    surface,
    rating,
    reviews,
    photos: [photos[i % photos.length]] // assign one photo per court
  }
}

export const COURTS: Court[] = Array.from({ length: 60 }).map((_, i) => makeCourt(i))
export default COURTS
