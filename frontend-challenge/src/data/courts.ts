export type Court = {
  id: string;
  name: string;
  city: string;
  surface: 'Hard' | 'Clay' | 'Grass';
  lights: boolean;
  courts: number;   // number of courts at venue
  rating: number;   // 1..5
  photo?: string;
};

const cities = ['San Jose','San Francisco','Oakland','Palo Alto','Sunnyvale','Mountain View','Berkeley','Fremont'];
const names = ['Community Park','Riverside Courts','City Rec Center','Northside Courts','Southside Park','Bayview Courts','Lakeside Courts','Hilltop Rec'];
const surfaces: Court['surface'][] = ['Hard','Clay','Grass'];

function rand<T>(arr:T[]): T { return arr[Math.floor(Math.random()*arr.length)] }
function r(min:number,max:number){ return Math.floor(Math.random()*(max-min+1))+min }

export const courts: Court[] = Array.from({length: 84}).map((_,i)=>({
  id: String(i+1),
  name: `${rand(names)} #${r(1,99)}`,
  city: rand(cities),
  surface: rand(surfaces),
  lights: Math.random() > 0.4,
  courts: r(2,12),
  rating: r(3,5),
  photo: ''
}));

export function searchCourts(query:string, filter:{city?:string; surface?:Court['surface']; minRating?:number}={}){
  const q = query.trim().toLowerCase();
  return courts.filter(c=>{
    const matchQ = !q || `${c.name} ${c.city}`.toLowerCase().includes(q);
    const matchCity = !filter.city || c.city===filter.city;
    const matchSurface = !filter.surface || c.surface===filter.surface;
    const matchRating = !filter.minRating || c.rating>=filter.minRating;
    return matchQ && matchCity && matchSurface && matchRating;
  });
}
