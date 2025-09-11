import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import CourtCard from '../components/CourtCard';
import { useCourts } from '../store/CourtsContext';
import FiltersBar, { Filters } from '../components/FiltersBar';

 type SortKey = 'top' | 'reviews' | 'name' | 'nearby';

 function haversine(lat1:number, lon1:number, lat2:number, lon2:number) {
   const toRad = (d:number)=> d * Math.PI / 180;
   const R = 6371;
   const dLat = toRad(lat2-lat1), dLon = toRad(lon2-lon1);
   const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 }

 export default function Home() {
   const { courts, getAverageRating, reviewsByCourtId, loading } = useCourts();
   const [input, setInput] = useState('');
   const [query, setQuery] = useState('');
   const [sort, setSort] = useState<SortKey>('top');
   const [userLoc, setUserLoc] = useState<{lat:number; lon:number} | null>(null);
   const [filters, setFilters] = useState<Filters>({
     surfaces: [],
     indoorOnly: false,
     lightsOnly: false,
     minRating: 0,
   });

   // debounce input -> query
   useEffect(() => {
     const t = setTimeout(() => setQuery(input), 250);
     return () => clearTimeout(t);
   }, [input]);

   // geolocation for nearby sort
   useEffect(() => {
     if (!('geolocation' in navigator)) return;
     navigator.geolocation.getCurrentPosition(
       (pos) => setUserLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
       () => void 0,
       { enableHighAccuracy: false, timeout: 1500 }
     );
   }, []);

   const filtered = useMemo(() => {
     const q = query.trim().toLowerCase();
     let base = q
       ? courts.filter((c) =>
           c.name.toLowerCase().includes(q) ||
           c.city.toLowerCase().includes(q) ||
           c.state.toLowerCase().includes(q) ||
           c.surface.toLowerCase().includes(q)
         )
       : courts;
     // apply filters
     if (filters.surfaces.length > 0) {
       base = base.filter((c) => filters.surfaces.includes(c.surface));
     }
     if (filters.indoorOnly) {
       base = base.filter((c) => c.indoor);
     }
     if (filters.lightsOnly) {
       base = base.filter((c) => c.lighted);
     }
     if (filters.minRating > 0) {
       base = base.filter((c) => getAverageRating(c.id) >= filters.minRating);
     }

     const arr = [...base];
     const byReviews = (id: string) => reviewsByCourtId[id]?.length ?? 0;
     if (sort === 'top') arr.sort((a, b) => getAverageRating(b.id) - getAverageRating(a.id));
     else if (sort === 'reviews') arr.sort((a, b) => byReviews(b.id) - byReviews(a.id));
     else if (sort === 'name') arr.sort((a, b) => a.name.localeCompare(b.name));
     else if (sort === 'nearby' && userLoc) {
       arr.sort((a, b) => {
         const da = a.lat!=null && a.lon!=null ? haversine(userLoc.lat, userLoc.lon, a.lat!, a.lon!) : 1e9;
         const db = b.lat!=null && b.lon!=null ? haversine(userLoc.lat, userLoc.lon, b.lat!, b.lon!) : 1e9;
         return da - db;
       });
     } else {
       arr.sort((a, b) => getAverageRating(b.id) - getAverageRating(a.id));
     }
     return arr;
   }, [courts, query, getAverageRating, filters, sort, userLoc, reviewsByCourtId]);

   return (
     <div className="container">
       <SearchBar value={input} onChange={setInput} />
       <div className="sort-row">
         <label className="muted">Sort</label>
         <select value={sort} onChange={(e)=> setSort(e.target.value as SortKey)} aria-label="Sort courts">
           <option value="top">Top rated</option>
           <option value="reviews">Most reviewed</option>
           <option value="name">Name A–Z</option>
           <option value="nearby">Nearby</option>
         </select>
       </div>
       <FiltersBar value={filters} onChange={setFilters} />
       <div className="court-surface">
         <div className="grid">
           {loading
             ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="card skeleton" />)
             : filtered.map((court) => (
               <CourtCard key={court.id} court={court} />
             ))}
         </div>
       </div>
       {!loading && filtered.length === 0 && (
         <div className="empty-state">
           <div className="empty-illustration" aria-hidden>
             <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <linearGradient id="g" x1="0" x2="1">
                   <stop offset="0%" stopColor="#a7f3d0" />
                   <stop offset="100%" stopColor="#34d399" />
                 </linearGradient>
               </defs>
               <rect x="10" y="40" width="100" height="40" rx="6" fill="none" stroke="url(#g)" strokeWidth="3" />
               <line x1="60" y1="40" x2="60" y2="80" stroke="url(#g)" strokeWidth="3" />
               <circle cx="36" cy="30" r="10" fill="#9ae6b4" stroke="#34d399" strokeWidth="3" />
             </svg>
           </div>
           No courts match your search.
           {(filters.surfaces.length || filters.indoorOnly || filters.lightsOnly || filters.minRating>0 || query) && (
             <div>
               <button className="btn" onClick={()=> setFilters({ surfaces: [], indoorOnly: false, lightsOnly: false, minRating: 0 })}>Clear filters</button>
               <button className="btn" style={{ marginLeft: 8 }} onClick={()=> { setInput(''); setQuery(''); }}>Reset search</button>
             </div>
           )}
         </div>
       )}
     </div>
   );
 }


