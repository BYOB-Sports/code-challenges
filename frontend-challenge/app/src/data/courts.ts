export type Surface = 'Hard' | 'Clay' | 'Grass' | 'Carpet';

export type Review = { id: string; rating: number; text: string; createdAt: number; };
export type Court  = { id: string; name: string; city: string; surface: Surface; courtsCount: number; reviews: Review[]; };

const cities  = ['Milwaukee','Madison','Chicago','Green Bay','Racine','Waukesha','Kenosha','Appleton','Evanston','Naperville'];
const nameA   = ['Riverside','Lakeside','Highland','Maple','Oak','Pine','Cedar','Elm','Valley','Sunset','Hilltop','Prospect'];
const nameB   = ['Park','Tennis Center','Courts','Recreation','Athletic Complex','Sports Grounds'];
const surfaces: Surface[] = ['Hard','Clay','Grass','Carpet'];

const id = (p='id') => `${p}_${Math.random().toString(36).slice(2,9)}`;

function randomReviews(): Review[] {
  const n = Math.random() < 0.6 ? Math.floor(Math.random()*5) : Math.floor(Math.random()*10);
  return Array.from({length:n}).map(() => ({
    id: id('rev'),
    rating: 1 + Math.floor(Math.random()*5),
    text: ['Great courts','Needs resurfacing','Lights are solid','Gets busy','Good nets','Windy spot'][Math.floor(Math.random()*6)],
    createdAt: Date.now() - Math.floor(Math.random()*1000*60*60*24*30),
  }));
}

export const seedCourts: Court[] = Array.from({length: 60}).map(() => ({
  id: id('court'),
  name: `${nameA[Math.floor(Math.random()*nameA.length)]} ${nameB[Math.floor(Math.random()*nameB.length)]}`,
  city: cities[Math.floor(Math.random()*cities.length)],
  surface: surfaces[Math.floor(Math.random()*surfaces.length)],
  courtsCount: 2 + Math.floor(Math.random()*8),
  reviews: randomReviews(),
}));
