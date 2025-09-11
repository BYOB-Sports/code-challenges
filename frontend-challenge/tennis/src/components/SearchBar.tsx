import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  surfaceFilter: string;
  onSurfaceFilterChange: (filter: string) => void;
}

export const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  surfaceFilter, 
  onSurfaceFilterChange 
}: SearchBarProps) => {
  const surfaces = [
    { value: 'all', label: 'All Surfaces' },
    { value: 'hard', label: 'Hard Court' },
    { value: 'clay', label: 'Clay Court' },
    { value: 'grass', label: 'Grass Court' },
    { value: 'indoor', label: 'Indoor Court' }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search courts by name or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {surfaces.map((surface) => (
          <Button
            key={surface.value}
            variant={surfaceFilter === surface.value ? "default" : "outline"}
            size="sm"
            onClick={() => onSurfaceFilterChange(surface.value)}
          >
            {surface.label}
          </Button>
        ))}
      </div>
    </div>
  );
};