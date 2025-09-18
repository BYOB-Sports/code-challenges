import CourtList from '@/components/court-list';
import { getCourts } from '@/lib/courts';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function CourtListSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      <header className="text-center my-8 flex flex-col items-center gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-80" />
      </header>
      <div className="relative mb-8">
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="grid gap-6">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const { courts, hasMore } = await getCourts({ page: 1, limit: 10 });

  return (
    <main className="min-h-screen">
      <Suspense fallback={<CourtListSkeleton />}>
        <CourtList initialCourts={courts} initialHasMore={hasMore} />
      </Suspense>
    </main>
  );
}
