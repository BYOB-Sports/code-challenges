export default function SearchBar({ value, onChange }:{value:string; onChange:(v:string)=>void}) {
  return (
    <div className="card">
      <label className="label" htmlFor="q">Search courts</label>
      <input id="q" className="input" placeholder="Name, city, surface..."
             value={value} onChange={e=>onChange(e.target.value)} />
    </div>
  );
}
