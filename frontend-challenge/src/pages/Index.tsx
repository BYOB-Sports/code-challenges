import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourtCard } from '@/components/CourtCard';
import { SearchBar } from '@/components/SearchBar';
import { tennisCourts } from '@/data/courts';
import { SurfaceType } from '@/types/tennis';

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurface, setSelectedSurface] = useState<SurfaceType | 'all'>('all');

  // Filter courts based on search term and surface
  const filteredCourts = useMemo(() => {
    return tennisCourts.filter(court => {
      const matchesSearch = !searchTerm || 
        court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSurface = selectedSurface === 'all' || court.surface === selectedSurface;
      
      return matchesSearch && matchesSurface;
    });
  }, [searchTerm, selectedSurface]);

  const handleCourtClick = (courtId: string) => {
    navigate(`/court/${courtId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-court">
      {/* Header */}
      <div className="bg-gradient-tennis shadow-medium">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-4xl font-bold mb-3">🎾 TennisCourts</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Discover and review the world's finest tennis courts. From grass courts at Wimbledon to clay courts in Paris.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8 animate-slide-up">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSurface={selectedSurface}
            onSurfaceChange={setSelectedSurface}
            resultsCount={filteredCourts.length}
          />
        </div>

        {/* Courts Grid */}
        {filteredCourts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts.map((court, index) => (
              <div
                key={court.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CourtCard
                  court={court}
                  onClick={() => handleCourtClick(court.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No Courts Found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any tennis courts matching your search criteria. Try adjusting your filters or search terms.
            </p>
            <button
              className="text-tennis-green hover:text-tennis-green-light transition-colors"
              onClick={() => {
                setSearchTerm('');
                setSelectedSurface('all');
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
