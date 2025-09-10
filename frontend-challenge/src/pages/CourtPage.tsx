import { useEffect, useMemo, useState } from "react";
import { searchCourts } from "../data/courts";
import CourtCard from "../components/CourtCard";
import SearchBar from "../components/SearchBar";

export default function CourtsPage(){
  const [query,setQuery] = useState("");
  const [city,setCity] = useState("");
  const [surface,setSurface] = useState("");
  const [minRating,setMinRating] = useState("");
  const [limit,setLimit] = useState(20); // progressive list

  const results = useMemo(()=> searchCourts(query,{
    city: city || undefined,
    surface: (surface as any) || undefined,
    minRating: minRating? Number(minRating): undefined,
  }), [query,city,surface,minRating]);

  useEffect(()=>{ setLimit(20) }, [query,city,surface,minRating]);

  function loadMore(){ setLimit(v=> Math.min(v+20, results.length)) }

  return (
    <div>
      <h1 style={{fontSize:22, margin:"8px 0 12px"}}>Find courts</h1>
      <SearchBar
        query={query} onQuery={setQuery}
        city={city} onCity={setCity}
        surface={surface} onSurface={setSurface}
        minRating={minRating} onMinRating={setMinRating}
      />

      <ul className="list" aria-live="polite">
        {results.slice(0,limit).map(c=> <CourtCard key={c.id} court={c} />)}
      </ul>

      {results.length===0 && (
        <div className="card">No results. Try clearing filters.</div>
      )}

      {limit < results.length && (
        <div style={{display:'flex', justifyContent:'center', margin:'12px 0 24px'}}>
          <button className="button" onClick={loadMore} aria-label="Load more courts">Load more</button>
        </div>
      )}
    </div>
  );
}
