'use client';

import { getCourtById } from '@/lib/courts';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import StarRating from '@/components/star-rating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ReviewSheet from '@/components/review-sheet';
import ReviewCard from '@/components/review-card';
import Header from '@/components/header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import type { Court, Review } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function CourtDetailSkeleton() {
  return (
    <div className="bg-background min-h-screen">
      <Header showBackButton={true} />
      <main className="p-4 max-w-4xl mx-auto">
        <Skeleton className="w-full aspect-video rounded-lg shadow-lg mb-6 border" />
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4">
          <div>
            <Skeleton className="h-10 w-80 mb-2" />
            <Skeleton className="h-6 w-64" />
          </div>
          <Skeleton className="h-10 w-48" />
        </div>
        <Separator className="my-8"/>
        <div>
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function CourtDetailPage({ params }: { params: { id: string } }) {
  const [court, setCourt] = useState<Court | null>(null);
  const [loading, setLoading] = useState(true);

  // Use the React.use() hook to unwrap params
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    // Unwrap the params if they are a Promise
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };

    if (params) {
      fetchParams();
    }
  }, [params]);

  useEffect(() => {
    if (unwrappedParams?.id) {
      const fetchCourt = async () => {
        const fetchedCourt = await getCourtById(unwrappedParams.id);
        if (fetchedCourt) {
          setCourt(fetchedCourt);
        }
        setLoading(false);
      };
      fetchCourt();
    }
  }, [unwrappedParams]);

  const handleReviewSubmitted = (newReview: Omit<Review, 'id' | 'avatar' | 'author' | 'date'>) => {
    if (court) {
      const temporaryReview: Review = {
        ...newReview,
        id: `temp-${Date.now()}`,
        author: 'You',
        avatar: '',
        date: new Date().toISOString(),
      };
      setCourt(prevCourt => {
        if (!prevCourt) return null;
        return {
          ...prevCourt,
          reviews: [temporaryReview, ...prevCourt.reviews]
        }
      });
    }
  };

  if (loading) {
    return <CourtDetailSkeleton />;
  }

  if (!court) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <Header title={court.name} showBackButton={true} />

      <main className="p-4 max-w-4xl mx-auto">
        <Carousel className="w-full rounded-lg overflow-hidden shadow-lg mb-6 border">
          <CarouselContent>
            {court.images.map((imageId) => {
              const image = PlaceHolderImages.find(p => p.id === imageId);
              if (!image) return null;
              return (
                <CarouselItem key={image.id}>
                  <div className="relative aspect-video bg-muted">
                    <Image 
                      src={image.imageUrl} 
                      alt={image.description} 
                      fill 
                      className="object-cover" 
                      data-ai-hint={image.imageHint}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={court.images.indexOf(imageId) === 0}
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        <div className="flex flex-col items-start gap-4 mb-4">
          <div className="w-full">
            <h1 className="font-headline text-2xl md:text-3xl font-bold">{court.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2 text-sm">
              <MapPin className="h-4 w-4" />
              <p>{court.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2 shrink-0">
            <StarRating rating={court.rating} size={20} />
            <p className="text-lg font-bold">{court.rating.toFixed(1)}</p>
            <p className="text-muted-foreground text-sm">({court.reviews.length} reviews)</p>
          </div>
        </div>

        <Separator className="my-6 md:my-8"/>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-xl md:text-2xl font-bold">Reviews</h2>
            <ReviewSheet courtId={court.id} onReviewSubmitted={handleReviewSubmitted} />
          </div>
          <div className="space-y-4 md:space-y-6">
            {court.reviews.length > 0 ? (
              court.reviews.map(review => <ReviewCard key={review.id} review={review} />)
            ) : (
              <Card className="text-center py-12 md:py-16 border-dashed">
                <CardContent>
                  <h3 className="text-lg font-semibold text-muted-foreground">No reviews yet</h3>
                  <p className="text-muted-foreground mt-1">Be the first to share your experience!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
