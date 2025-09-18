import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Wifi, Car, Coffee, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ReviewForm } from '@/components/ReviewForm';
import { ReviewList } from '@/components/ReviewList';
import { tennisCourts, reviews as initialReviews } from '@/data/courts';
import { Review } from '@/types/tennis';

export default function CourtDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  
  const court = tennisCourts.find(c => c.id === id);
  
  useEffect(() => {
    if (!court) {
      navigate('/');
    }
  }, [court, navigate]);

  if (!court) {
    return null;
  }

  const courtReviews = reviews.filter(r => r.courtId === court.id);

  const getSurfaceColor = (surface: string) => {
    switch (surface) {
      case 'hard':
        return 'bg-surface-hard text-white';
      case 'clay':
        return 'bg-surface-clay text-white';
      case 'grass':
        return 'bg-surface-grass text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes('wifi') || amenity.toLowerCase().includes('internet')) {
      return <Wifi className="h-4 w-4" />;
    }
    if (amenity.toLowerCase().includes('parking') || amenity.toLowerCase().includes('valet')) {
      return <Car className="h-4 w-4" />;
    }
    if (amenity.toLowerCase().includes('restaurant') || amenity.toLowerCase().includes('dining') || amenity.toLowerCase().includes('cafe') || amenity.toLowerCase().includes('food')) {
      return <Coffee className="h-4 w-4" />;
    }
    return <Users className="h-4 w-4" />;
  };

  const handleReviewSubmit = (newReview: { author: string; rating: number; comment: string }) => {
    const review: Review = {
      id: Date.now().toString(),
      courtId: court.id,
      author: newReview.author,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [review, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-court">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-4xl mx-auto px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-tennis-green/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courts
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="animate-fade-in">
          <div className="aspect-video w-full overflow-hidden rounded-xl shadow-strong">
            <img
              src={court.imageUrl}
              alt={court.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">{court.name}</h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{court.location}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={`text-sm font-medium ${getSurfaceColor(court.surface)}`}>
                  {court.surface.toUpperCase()} COURT
                </Badge>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{court.priceRange}</div>
                  <div className="text-sm text-muted-foreground">Price Range</div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="mr-1 h-5 w-5 fill-tennis-accent text-tennis-accent" />
                <span className="text-xl font-bold text-foreground">{court.rating}</span>
              </div>
              <span className="text-muted-foreground">
                Based on {court.reviewCount} reviews
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="animate-slide-up shadow-soft">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">About This Court</h2>
            <p className="text-foreground leading-relaxed">{court.description}</p>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card className="animate-slide-up shadow-soft" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Amenities & Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {court.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="text-tennis-green">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-foreground font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Reviews Section */}
        <div className="space-y-8">
          <ReviewList reviews={courtReviews} />
          
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <ReviewForm courtName={court.name} onSubmit={handleReviewSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}