'use client';

import { useState, useTransition, useEffect, useRef, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import type { Court } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import CourtCard from '@/components/court-card';
import { TennisBallIcon } from './icons/tennis-ball-icon';
import { getCourts } from '@/lib/courts';
import { getAllCourts } from '@/lib/courts';

export default function CourtList({ initialCourts, initialHasMore }: { initialCourts: Court[], initialHasMore: boolean }) {
  const [allCourts, setAllCourts] = useState<Court[]>(initialCourts);
  const [displayedCourts, setDisplayedCourts] = useState<Court[]>(initialCourts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const loaderRef = useRef(null);

  const loadMoreCourts = useCallback(async () => {
    if (isLoading || !hasMore || searchTerm) return;
    setIsLoading(true);
    const { courts: newCourts, hasMore: newHasMore } = await getCourts({ page, limit: 10 });
    setAllCourts(prev => [...prev, ...newCourts]);
    setDisplayedCourts(prev => [...prev, ...newCourts]);
    setHasMore(newHasMore);
    setPage(prev => prev + 1);
    setIsLoading(false);
  }, [isLoading, hasMore, searchTerm, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreCourts();
        }
      },
      { threshold: 1.0 }
    );

    const loader = loaderRef.current;
    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [loadMoreCourts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    startTransition(async () => {
      if (term) {
        setIsSearching(true);
        const allCourtsForSearch = await getAllCourts();
        const lowercasedTerm = term.toLowerCase();
        const filtered = allCourtsForSearch.filter(court =>
          court.name.toLowerCase().includes(lowercasedTerm) ||
          court.address.toLowerCase().includes(lowercasedTerm)
        );
        setDisplayedCourts(filtered);
        setIsSearching(false);
      } else {
        setDisplayedCourts(allCourts);
      }
    });
  };

  const courtsToRender = searchTerm ? displayedCourts : allCourts;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <header className="text-center my-6 md:my-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <TennisBallIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
            Tennis Court Finder
          </h1>
        </div>
        <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-md">
          Find and review the best public and private tennis courts near you.
        </p>
      </header>
      
      <div className="relative mb-6 md:mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by court name or location..."
          className="pl-11 h-12 text-base"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="grid gap-4 md:gap-6">
        {isPending || isSearching ? (
          [...Array(5)].map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-lg" />)
        ) : courtsToRender.length > 0 ? (
          courtsToRender.map(court => (
            <CourtCard key={court.id} court={court} />
          ))
        ) : (
          <div className="text-center text-muted-foreground col-span-full py-16">
            <h3 className="font-headline text-xl">No Courts Found</h3>
            <p>Try adjusting your search term.</p>
          </div>
        )}
      </div>

      {!searchTerm && hasMore && (
        <div ref={loaderRef} className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
