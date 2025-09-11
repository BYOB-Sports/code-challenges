import { useState } from 'react';
import CourtCard from '../components/CourtCard';
import { courts as mockCourts } from '../data/courts';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const filteredCourts = mockCourts.filter(court =>
    court.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tennis Courts</h1>
      <input
        type="text"
        placeholder="Search courts..."
        className="border p-2 rounded w-full mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filteredCourts.map(court => (
        <CourtCard key={court.id} court={court} />
      ))}
    </div>
  );
}
