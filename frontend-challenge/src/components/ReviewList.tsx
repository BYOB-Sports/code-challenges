import { Star } from 'lucide-react';
import { Review } from '@/types/tennis';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-lg">No reviews yet.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Be the first to share your experience!
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'fill-tennis-accent text-tennis-accent' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground mb-4">
        Reviews ({reviews.length})
      </h3>
      
      {reviews.map((review, index) => (
        <Card 
          key={review.id} 
          className="animate-slide-up shadow-soft"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-tennis-green text-white text-sm font-medium">
                  {getInitials(review.author)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground text-sm">
                    {review.author}
                  </h4>
                  <span className="text-xs text-muted-foreground shrink-0 ml-2">
                    {formatDate(review.date)}
                  </span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="ml-2 text-sm font-medium text-foreground">
                    {review.rating}/5
                  </span>
                </div>
                
                <p className="text-sm text-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}