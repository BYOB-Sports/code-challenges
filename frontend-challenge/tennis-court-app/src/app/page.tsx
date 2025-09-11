'use client';

import React, { useState } from 'react';
import { Search, Star, MapPin, Clock, Users, ArrowLeft, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCourts } from "@/data/mockCourts";


// Star Rating Component
const StarRating = ({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${star <= rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
            }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating}</span>
    </div>
  );
};

// Interactive Star Rating for Reviews
const InteractiveStarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer transition-colors ${star <= (hover || rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
            }`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );
};

// Court Card Component
const CourtCard = ({ court, onClick }: { court: any; onClick: () => void }) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <div className="relative">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-2 right-2 bg-white text-black">
          {court.surface}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{court.name}</h3>
          <span className="text-sm font-medium text-green-600">{court.priceRange}</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{court.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <StarRating rating={court.rating} />
          <span className="text-sm text-gray-500">({court.reviewCount} reviews)</span>
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {court.openTime}
          </div>
          {court.lights && (
            <Badge variant="secondary" className="text-xs">Lights</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Main App Component
export default function TennisCourtApp() {
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedCourt, setSelectedCourt] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [courts, setCourts] = useState(mockCourts);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    user: 'Anonymous User'
  });

  // Filter courts based on search query
  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    court.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort courts based on selected criteria
  const sortedCourts = [...filteredCourts].sort((a, b) => {
    let valueA, valueB;

    if (sortBy === 'rating') {
      valueA = a.rating;
      valueB = b.rating;
    } else if (sortBy === 'price') {
      // Extract the lower price from the range (e.g., "$25-35/hour" -> 25)
      valueA = parseFloat(a.priceRange.split('-')[0].replace('$', ''));
      valueB = parseFloat(b.priceRange.split('-')[0].replace('$', ''));
    } else {
      return 0;
    }

    if (sortOrder === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedCourts.length / itemsPerPage);
  const startIndex = (currentPageNum - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourts = sortedCourts.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPageNum(1); // Reset to first page when searching
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split('-');
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPageNum(1); // Reset to first page when sorting
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPageNum(1); // Reset to first page when changing items per page
  };

  const handlePageChange = (page: number) => {
    setCurrentPageNum(page);
  };

  const handleCourtSelect = (court: any) => {
    setSelectedCourt(court);
    setCurrentPage('detail');
  };

  const handleBackToList = () => {
    setCurrentPage('list');
    setSelectedCourt(null);
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) return;

    const review = {
      id: Date.now(),
      user: newReview.user,
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment
    };

    // Update courts state with new review
    setCourts(prevCourts =>
      prevCourts.map(court =>
        court.id === selectedCourt.id
          ? {
            ...court,
            reviews: [review, ...court.reviews],
            reviewCount: court.reviewCount + 1
          }
          : court
      )
    );

    // Update selected court
    setSelectedCourt((prev: any) => ({
      ...prev,
      reviews: [review, ...prev.reviews],
      reviewCount: prev.reviewCount + 1
    }));

    // Reset form
    setNewReview({ rating: 0, comment: '', user: 'Anonymous User' });
  };

  // Courts List Page
  if (currentPage === 'list') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold text-center mb-4">Tennis Courts</h1>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search courts or locations..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Courts Grid */}
        <div className="px-4 py-4">
          {/* Results info and controls */}
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div className="text-sm text-gray-600">
              Showing {sortedCourts.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, sortedCourts.length)} of {sortedCourts.length} courts
            </div>
            <div className="flex items-center gap-4">
              {/* Sort dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={`${sortBy}-${sortOrder}`} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                    <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Items per page dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show:</span>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Courts List */}
          <div className="space-y-4 mb-6">
            {sortedCourts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No courts found matching your search.</p>
              </div>
            ) : (
              currentCourts.map((court) => (
                <CourtCard
                  key={court.id}
                  court={court}
                  onClick={() => handleCourtSelect(court)}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPageNum - 1)}
                disabled={currentPageNum === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Page numbers */}
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPageNum - 1 && page <= currentPageNum + 1);

                  if (!showPage) {
                    // Show ellipsis for gaps
                    if (page === currentPageNum - 2 || page === currentPageNum + 2) {
                      return <span key={page} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  }

                  return (
                    <Button
                      key={page}
                      variant={currentPageNum === page ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPageNum + 1)}
                disabled={currentPageNum === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Court Detail Page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center px-4 py-4">
          <Button variant="ghost" size="sm" onClick={handleBackToList}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Court Details</h1>
        </div>
      </div>

      <div className="pb-6">
        {/* Court Image */}
        <img
          src={selectedCourt.image}
          alt={selectedCourt.name}
          className="w-full h-64 object-cover"
        />

        <div className="px-4 py-4 space-y-6">
          {/* Court Info */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold">{selectedCourt.name}</h2>
              <Badge variant="outline">{selectedCourt.surface}</Badge>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{selectedCourt.location}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <StarRating rating={selectedCourt.rating} size="w-5 h-5" />
              <span className="text-gray-500">({selectedCourt.reviewCount} reviews)</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{selectedCourt.openTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{selectedCourt.priceRange}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-4">
              <h4 className="font-medium mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCourt.amenities.map((amenity: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {selectedCourt.lights && (
                  <Badge variant="secondary" className="text-xs">Lights</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Add Review Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Write a Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <InteractiveStarRating
                  rating={newReview.rating}
                  onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea
                  placeholder="Share your experience at this court..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="min-h-20"
                />
              </div>

              <Button
                onClick={handleSubmitReview}
                className="w-full"
                disabled={newReview.rating === 0 || !newReview.comment.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Review
              </Button>
            </CardContent>
          </Card>

          {/* Reviews */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Reviews ({selectedCourt.reviewCount})</h3>
            <div className="space-y-4">
              {selectedCourt.reviews.map((review: any) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <StarRating rating={review.rating} size="w-3 h-3" />
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}