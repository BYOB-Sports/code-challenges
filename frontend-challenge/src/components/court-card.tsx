'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import type { Court } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import StarRating from '@/components/star-rating';
import { Skeleton } from './ui/skeleton';

export default function CourtCard({ court }: { court: Court }) {
  const image = PlaceHolderImages.find(p => p.id === court.images[0]);

  return (
    <Link href={`/court/${court.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 bg-card">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full h-48 sm:w-1/3 sm:h-auto relative">
            {image ? (
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </div>
          <div className="w-full sm:w-2/3 flex flex-col justify-between">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="font-headline text-lg md:text-xl group-hover:text-primary transition-colors">
                {court.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1 text-xs sm:text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{court.address}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <div className="flex items-center gap-2">
                <StarRating rating={court.rating} />
                <span className="text-muted-foreground text-sm font-medium">
                  {court.rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground text-sm">
                  ({court.reviews.length} reviews)
                </span>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </Link>
  );
}
