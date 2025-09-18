import type { Review } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StarRating from './star-rating';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { formatDistanceToNow } from 'date-fns';

export default function ReviewCard({ review }: { review: Review }) {
  const authorInitials = review.author.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={review.avatar} alt={review.author} />
            <AvatarFallback>{authorInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start">
              <div className="mb-2 sm:mb-0">
                <CardTitle className="font-headline text-base leading-tight">{review.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{review.author}</p>
              </div>
              <div className="shrink-0">
                <StarRating rating={review.rating} size={16} />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-foreground/90 whitespace-pre-wrap text-sm">{review.text}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
        </p>
      </CardFooter>
    </Card>
  );
}
