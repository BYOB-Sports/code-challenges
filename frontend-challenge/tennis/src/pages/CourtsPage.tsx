import { useState, useMemo } from 'react';
import { CourtCard } from '@/components/CourtCard';
import { SearchBar } from '@/components/SearchBar';
import { mockCourts } from '@/data/mockCourts';

const CourtsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [surfaceFilter, setSurfaceFilter] = useState('all');

  const filteredCourts = useMemo(() => {
    return mockCourts.filter(court => {
      const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           court.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSurface = surfaceFilter === 'all' || court.surfaceType === surfaceFilter;
      return matchesSearch && matchesSurface;
    });
  }, [searchTerm, surfaceFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Tennis Courts</h1>
          <p className="text-blue-100">Find the best tennis courts near you</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          surfaceFilter={surfaceFilter}
          onSurfaceFilterChange={setSurfaceFilter}
        />
        
        <div className="text-gray-600">
          Showing {filteredCourts.length} court{filteredCourts.length !== 1 ? 's' : ''}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourts.map((court) => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>

        {filteredCourts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎾</div>
            <h3 className="text-xl font-bold mb-2">No courts found</h3>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtsPage;