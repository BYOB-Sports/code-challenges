type Props = {
  query: string; onQuery: (v:string)=>void;
  city: string; onCity: (v:string)=>void;
  surface: string; onSurface: (v:string)=>void;
  minRating: string; onMinRating: (v:string)=>void;
}

export default function SearchBar(props: Props){
  const cities = ['San Jose','San Francisco','Oakland','Palo Alto','Sunnyvale','Mountain View','Berkeley','Fremont'];
  return (
    <div className="card" role="search" aria-label="search courts">
      <input className="input" placeholder="Search by name or city" value={props.query} onChange={e=>props.onQuery(e.target.value)} />
      <div className="controls" style={{marginTop:8}}>
        <select className="select" value={props.city} onChange={e=>props.onCity(e.target.value)}>
          <option value="">All Cities</option>
          {cities.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="select" value={props.surface} onChange={e=>props.onSurface(e.target.value)}>
          <option value="">Any Surface</option>
          <option>Hard</option>
          <option>Clay</option>
          <option>Grass</option>
        </select>
        <select className="select" value={props.minRating} onChange={e=>props.onMinRating(e.target.value)}>
          <option value="">Any Rating</option>
          {[5,4,3].map(r=> <option key={r} value={r}>{r}★+</option>)}
        </select>
      </div>
    </div>
  );
}
