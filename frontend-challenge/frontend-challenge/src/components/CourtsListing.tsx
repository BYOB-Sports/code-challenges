import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { allCourts } from '@/data/courts';
import { Court } from '@/types/court';

const CourtsListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [surfaceFilter, setSurfaceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');

  const filteredAndSortedCourts = useMemo(() => {
    let filtered = allCourts.filter(court => {
      const matchesSearch = 
        court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSurface = surfaceFilter === 'all' || court.surfaceType === surfaceFilter;
      
      return matchesSearch && matchesSurface;
    });

    // Sort courts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [searchTerm, surfaceFilter, sortBy]);

  const getSurfaceColor = (surface: Court['surfaceType']) => {
    switch (surface) {
      case 'clay':
        return 'bg-court-clay text-white';
      case 'grass':
        return 'bg-tennis-green text-white';
      case 'hard':
        return 'bg-court-hard text-foreground';
      case 'indoor':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-hero text-white px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Find Your Court</h1>
          <p className="text-white/90 mb-6">Discover and review tennis courts near you</p>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
            <Input
              placeholder="Search courts or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Select value={surfaceFilter} onValueChange={setSurfaceFilter}>
              <SelectTrigger className="flex-1 bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Surface" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Surfaces</SelectItem>
                <SelectItem value="hard">Hard Court</SelectItem>
                <SelectItem value="clay">Clay Court</SelectItem>
                <SelectItem value="grass">Grass Court</SelectItem>
                <SelectItem value="indoor">Indoor Court</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1 bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">
            {filteredAndSortedCourts.length} courts found
          </p>
        </div>

        {/* Courts Grid */}
        <div className="space-y-4">
          {filteredAndSortedCourts.map((court) => (
            <Link key={court.id} to={`/court/${court.id}`}>
              <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-[1.02]">
                {/* Court Image */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={getSurfaceColor(court.surfaceType)}>
                      {court.surfaceType}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                      ${court.price}/hr
                    </Badge>
                  </div>
                </div>

                {/* Court Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg leading-tight">{court.name}</h3>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {court.location}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-medium">{court.rating}</span>
                      <span className="text-muted-foreground ml-1">
                        ({court.reviewCount} reviews)
                      </span>
                    </div>
                    
                    {court.lighting && (
                      <Badge variant="outline" className="text-xs">
                        Lighted
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {court.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourtsListing;