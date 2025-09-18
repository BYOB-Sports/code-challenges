import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SurfaceType } from '@/types/tennis';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSurface: SurfaceType | 'all';
  onSurfaceChange: (surface: SurfaceType | 'all') => void;
  resultsCount: number;
}

export function SearchBar({
  searchTerm,
  onSearchChange,
  selectedSurface,
  onSurfaceChange,
  resultsCount,
}: SearchBarProps) {
  const clearFilters = () => {
    onSearchChange('');
    onSurfaceChange('all');
  };

  const hasActiveFilters = searchTerm || selectedSurface !== 'all';

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search courts by name, location, or amenities..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-base bg-card border-2 focus:border-tennis-green transition-colors"
        />
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter:</span>
        </div>
        
        <Select value={selectedSurface} onValueChange={onSurfaceChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Surface" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Surfaces</SelectItem>
            <SelectItem value="hard">Hard Court</SelectItem>
            <SelectItem value="clay">Clay Court</SelectItem>
            <SelectItem value="grass">Grass Court</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-sm">
          {resultsCount} courts found
        </Badge>
        
        {hasActiveFilters && (
          <div className="flex gap-2">
            {searchTerm && (
              <Badge variant="outline" className="text-xs">
                "{searchTerm}"
              </Badge>
            )}
            {selectedSurface !== 'all' && (
              <Badge variant="outline" className="text-xs">
                {selectedSurface} courts
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}