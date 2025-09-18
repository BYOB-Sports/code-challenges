import type { Court } from './types'

// Pseudo-random generator with seed for deterministic mock
function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

const cities = [
  ['Charlotte', 'NC'],
  ['Raleigh', 'NC'],
  ['Durham', 'NC'],
  ['Atlanta', 'GA'],
  ['Austin', 'TX'],
  ['Seattle', 'WA'],
  ['San Jose', 'CA'],
  ['San Diego', 'CA'],
  ['Tampa', 'FL'],
  ['Miami', 'FL'],
  ['Boston', 'MA'],
  ['New York', 'NY'],
  ['Brooklyn', 'NY'],
  ['Queens', 'NY'],
  ['Phoenix', 'AZ'],
  ['Denver', 'CO'],
  ['Portland', 'OR'],
]

const surfaces: Court['surface'][] = ['hard', 'clay', 'grass']

export function generateCourts(count = 100, seed = 42): Court[] {
  const rand = mulberry32(seed)
  const courts: Court[] = []
  for (let i = 1; i <= count; i++) {
    const [city, state] = cities[Math.floor(rand() * cities.length)]
    const surface = surfaces[Math.floor(rand() * surfaces.length)]
    const indoor = rand() > 0.7
    const lights = rand() > 0.45
    const nCourts = 2 + Math.floor(rand()*10)
    const baseRating = 3 + Math.round(rand()*20)/10 // 3.0 .. 5.0
    const reviewsCount = 5 + Math.floor(rand()*120)
    courts.push({
      id: String(i),
      name: `${city} ${surface.charAt(0).toUpperCase()+surface.slice(1)} Courts #${i}`,
      city, state,
      surface, indoor, lights, courts: nCourts,
      img: `https://picsum.photos/seed/tennis${i}/800/600`,
      avgRating: Math.min(5, Math.max(1, baseRating)),
      reviewsCount
    })
  }
  return courts
}

export const ALL_COURTS: Court[] = generateCourts()
