import React, { useState } from 'react';
import { courts } from '../mock/courts';
import CourtCard from '../components/CourtCard';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const CourtListPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-2xl">
        {/* Page Heading */}
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700 tracking-tight drop-shadow-lg">
          Tennis Courts
        </h1>

        {/* Sticky Search Bar */}
        <div className="sticky top-4 z-10 bg-blue-50/80 backdrop-blur-md rounded-xl shadow-md p-4 mb-6" style={{ marginBottom: '1.5rem' }}>

          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Court List Container */}
        <div className="flex flex-col gap-6 bg-white rounded-xl p-6 shadow-lg">
          {filteredCourts.map((court, index) => (
            <div
              key={court.id}
              className="animate-fadeInUp"
              style={{  marginBottom: '1.5rem', animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <CourtCard
                court={court}
                onClick={() => navigate(`/court/${court.id}`)}
              />
            </div>
          ))}

          {filteredCourts.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No courts found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourtListPage;
