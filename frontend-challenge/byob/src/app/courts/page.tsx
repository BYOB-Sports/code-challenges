"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { courts, Court } from '../data/courts';

export default function CourtsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurface, setSelectedSurface] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('rating');

  // Get unique locations for filter
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(courts.map(court => court.location))];
    return uniqueLocations;
  }, []);

  // Filter and sort courts
  const filteredCourts = useMemo(() => {
    const filtered = courts.filter(court => {
      const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           court.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           court.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSurface = selectedSurface === 'All' || court.surface === selectedSurface;
      const matchesLocation = selectedLocation === 'All' || court.location === selectedLocation;
      
      return matchesSearch && matchesSurface && matchesLocation;
    });

    // Sort courts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedSurface, selectedLocation, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TennisCourts</span>
            </Link>
            <div className="text-sm text-gray-600">
              {filteredCourts.length} courts found
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search courts by name, location, or address..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-800 placeholder:text-gray-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Surface Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Surface</label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-800"
                value={selectedSurface}
                onChange={(e) => setSelectedSurface(e.target.value)}
              >
                <option value="All">All Surfaces</option>
                <option value="Hard Court">Hard Court</option>
                <option value="Clay Court">Clay Court</option>
                <option value="Grass Court">Grass Court</option>
                <option value="Synthetic">Synthetic</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-800"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="All">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm text-gray-800"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredCourts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courts found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Court Card Component
function CourtCard({ court }: { court: Court }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <Link href={`/courts/${court.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        {/* Court Image */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          <img
            src={court.image}
            alt={court.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Court Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
              {court.name}
            </h3>
            <span className="text-lg font-bold text-green-600">${court.price}</span>
          </div>

          <p className="text-sm text-gray-600 mb-2">{court.location}</p>
          <p className="text-xs text-gray-500 mb-3">{court.address}</p>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {renderStars(court.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {court.rating} ({court.reviewCount} reviews)
            </span>
          </div>

          {/* Court Details */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {court.surface}
            </span>
            {court.lighting && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Lighting
              </span>
            )}
            {court.indoor && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Indoor
              </span>
            )}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1">
            {court.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="text-xs text-gray-500">
                {amenity}
                {index < Math.min(court.amenities.length, 3) - 1 && ' • '}
              </span>
            ))}
            {court.amenities.length > 3 && (
              <span className="text-xs text-gray-500">
                +{court.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
