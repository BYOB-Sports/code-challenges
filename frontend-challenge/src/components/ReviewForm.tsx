import { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface ReviewFormProps {
  courtName: string;
  onSubmit: (review: { author: string; rating: number; comment: string }) => void;
}

export function ReviewForm({ courtName, onSubmit }: ReviewFormProps) {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!author.trim() || rating === 0 || !comment.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select a rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit({
      author: author.trim(),
      rating,
      comment: comment.trim(),
    });

    // Reset form
    setAuthor('');
    setRating(0);
    setComment('');
    setIsSubmitting(false);

    // Show success message
    toast({
      title: "Review Submitted! 🎾",
      description: "Thank you for sharing your experience. Your review helps other tennis players find great courts!",
    });
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isFilled = starNumber <= (hoverRating || rating);
      
      return (
        <button
          key={index}
          type="button"
          className={`text-2xl transition-all duration-200 ${
            isFilled 
              ? 'text-tennis-accent scale-110' 
              : 'text-muted-foreground hover:text-tennis-accent/70'
          }`}
          onClick={() => setRating(starNumber)}
          onMouseEnter={() => setHoverRating(starNumber)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star className={`h-6 w-6 ${isFilled ? 'fill-current' : ''}`} />
        </button>
      );
    });
  };

  return (
    <Card className="w-full animate-slide-up">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-tennis-green">
          Share Your Experience at {courtName}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium text-foreground">
              Your Name
            </label>
            <Input
              id="author"
              type="text"
              placeholder="Enter your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="h-11"
              disabled={isSubmitting}
            />
          </div>

          {/* Rating Stars */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Rating
            </label>
            <div className="flex items-center gap-1">
              {renderStars()}
              {rating > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating} out of 5 stars
                </span>
              )}
            </div>
          </div>

          {/* Comment Textarea */}
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium text-foreground">
              Your Review
            </label>
            <Textarea
              id="comment"
              placeholder="Tell others about your experience at this tennis court. What did you like? How were the facilities?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-32 resize-none"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-tennis hover:bg-primary-hover font-semibold text-base transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting Review...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Submit Review
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}