import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCourts } from '@/data/mockCourts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Star, MapPin, Phone, Globe, MessageSquare } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Sarah M.',
    rating: 5,
    comment: 'Excellent courts with great facilities. Very well maintained!',
    date: '2024-01-15'
  },
  {
    id: '2',
    userName: 'Mike T.',
    rating: 4,
    comment: 'Good courts, though sometimes busy. Booking system works well.',
    date: '2024-01-10'
  },
  {
    id: '3',
    userName: 'Lisa K.',
    rating: 5,
    comment: 'Love this place! Professional staff and clean facilities.',
    date: '2024-01-08'
  }
];

const surfaceStyles = {
  hard: 'bg-blue-600 text-white',
  clay: 'bg-orange-600 text-white',
  grass: 'bg-green-600 text-white',
  indoor: 'bg-purple-600 text-white'
};

const CourtDetailPage = () => {
  const { courtId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  
  const court = mockCourts.find(c => c.id === courtId);
  
  if (!court) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Court not found</h2>
          <Button onClick={() => navigate('/')}>Back to Courts</Button>
        </div>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        userName: 'You',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-64 object-cover"
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4 bg-white/90 hover:bg-white"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge className={`${surfaceStyles[court.surfaceType]} capitalize`}>
            {court.surfaceType}
          </Badge>
          <Badge className="bg-black/50 text-white">
            {court.priceRange}
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 -mt-8 relative z-10">
        <Card className="p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">{court.name}</h1>
          
          <div className="flex items-center gap-1 text-gray-600 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{court.location}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-lg">{court.rating}</span>
              <span className="text-gray-500">({court.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{court.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {court.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-sm">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                {court.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{court.phone}</span>
                  </div>
                )}
                {court.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">{court.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Reviews
          </h2>
          
          <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Leave a Review</h3>
            
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                className="border rounded-md px-3 py-2"
              >
                {[5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Share your experience..."
                className="w-full border rounded-md px-3 py-2 h-24 resize-none"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </form>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.userName}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CourtDetailPage;
