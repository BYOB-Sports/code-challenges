'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  onRatingChange?: (rating: number) => void;
}

export default function StarRating({ rating, totalStars = 5, size = 20, className, onRatingChange }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            size={size}
            className={cn(
              'transition-colors',
              starValue <= rating ? 'text-[hsl(var(--star-color))] fill-[hsl(var(--star-color))]' : 'text-muted-foreground/30',
              onRatingChange ? 'cursor-pointer' : ''
            )}
            onClick={() => onRatingChange?.(starValue)}
          />
        );
      })}
    </div>
  );
}
