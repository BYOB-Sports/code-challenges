'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import ReviewForm from './review-form';
import { MessageSquarePlus } from 'lucide-react';
import type { Review } from '@/lib/types';

interface ReviewSheetProps {
  courtId: string;
  onReviewSubmitted: (review: Omit<Review, 'id' | 'avatar' | 'author' | 'date'>) => void;
}

export default function ReviewSheet({ courtId, onReviewSubmitted }: ReviewSheetProps) {
  const [open, setOpen] = useState(false);

  const handleReviewSubmitted = (review: Omit<Review, 'id' | 'avatar' | 'author' | 'date'>) => {
    onReviewSubmitted(review);
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Leave a Review
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-full sm:max-w-lg overflow-y-auto" side="right">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">Write your review</SheetTitle>
          <SheetDescription>
            Share your experience to help other players.
          </SheetDescription>
        </SheetHeader>
        <ReviewForm courtId={courtId} onReviewSubmitted={handleReviewSubmitted} />
      </SheetContent>
    </Sheet>
  );
}
