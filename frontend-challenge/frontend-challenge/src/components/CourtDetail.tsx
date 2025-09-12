import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Shield, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { allCourts, reviews as initialReviews } from '@/data/courts';
import { Review, NewReview } from '@/types/court';

const CourtDetail = () => {
  const { courtId } = useParams<{ courtId: string }>();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState<Omit<NewReview, 'courtId'>>({
    userName: '',
    rating: 5,
    comment: '',
  });

  const court = allCourts.find(c => c.id === courtId);
  const courtReviews = reviews.filter(r => r.courtId === courtId);

  if (!court) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Court not found</h1>
          <Link to="/">
            <Button>Back to Courts</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.userName.trim() || !newReview.comment.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      courtId: court.id,
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };

    setReviews([review, ...reviews]);
    setNewReview({ userName: '', rating: 5, comment: '' });
    setShowReviewForm(false);
    
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });
  };

  const getSurfaceColor = (surface: string) => {
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

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? 'text-yellow-500 fill-current'
                : 'text-muted-foreground'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold truncate mx-4">{court.name}</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Court Image */}
        <div className="aspect-video relative">
          <img
            src={court.image}
            alt={court.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className={getSurfaceColor(court.surfaceType)}>
              {court.surfaceType} court
            </Badge>
          </div>
        </div>

        {/* Court Information */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{court.name}</h1>
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                {court.location}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">${court.price}</div>
              <div className="text-sm text-muted-foreground">per hour</div>
            </div>
          </div>

          <div className="flex items-center mb-4">
            {renderStars(Math.floor(court.rating))}
            <span className="ml-2 font-medium">{court.rating}</span>
            <span className="text-muted-foreground ml-1">
              ({court.reviewCount} reviews)
            </span>
          </div>

          <p className="text-muted-foreground mb-6">{court.description}</p>

          {/* Court Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm">
                {court.lighting ? 'Lighted Courts' : 'Daylight Only'}
              </span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-muted-foreground mr-2" />
              <span className="text-sm">
                {court.covered ? 'Covered Courts' : 'Outdoor Courts'}
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {court.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Reviews ({courtReviews.length})</h3>
              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                size="sm"
                className="bg-tennis-green hover:bg-tennis-green-dark"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Review
              </Button>
            </div>

            {/* Add Review Form */}
            {showReviewForm && (
              <Card className="p-4 mb-4 bg-tennis-green-light">
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <Label htmlFor="userName">Your Name</Label>
                    <Input
                      id="userName"
                      value={newReview.userName}
                      onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Rating</Label>
                    <div className="mt-2">
                      {renderStars(newReview.rating, true, (rating) => 
                        setNewReview({ ...newReview, rating })
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="comment">Your Review</Label>
                    <Textarea
                      id="comment"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Share your experience with this court..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-tennis-green hover:bg-tennis-green-dark">
                      Submit Review
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReviewForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {courtReviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{review.userName}</div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </Card>
              ))}
            </div>

            {courtReviews.length === 0 && !showReviewForm && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No reviews yet. Be the first to review this court!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtDetail;