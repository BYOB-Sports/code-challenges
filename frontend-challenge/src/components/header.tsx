'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { TennisBallIcon } from './icons/tennis-ball-icon';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-4xl mx-auto flex h-16 items-center px-2 sm:px-4">
        <div className="flex items-center gap-1 sm:gap-2 flex-1">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          {!showBackButton && (
            <Link href="/" className="flex items-center gap-2 p-2">
              <TennisBallIcon className="h-6 w-6 text-primary" />
            </Link>
          )}
          {title && (
            <h1 className="font-headline text-base sm:text-lg font-bold tracking-tight truncate">
              {title}
            </h1>
          )}
        </div>
      </div>
    </header>
  );
}
