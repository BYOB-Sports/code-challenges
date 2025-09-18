import { Star, MapPin } from 'lucide-react';
import { TennisCourt } from '@/types/tennis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CourtCardProps {
  court: TennisCourt;
  onClick: () => void;
}

export function CourtCard({ court, onClick }: CourtCardProps) {
  const getSurfaceColor = (surface: string) => {
    switch (surface) {
      case 'hard':
        return 'bg-surface-hard text-white';
      case 'clay':
        return 'bg-surface-clay text-white';
      case 'grass':
        return 'bg-surface-grass text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-medium hover:bg-card-hover animate-fade-in"
      onClick={onClick}
    >
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={court.imageUrl}
          alt={court.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {court.name}
          </h3>
          <Badge 
            className={`ml-2 text-xs font-medium shrink-0 ${getSurfaceColor(court.surface)}`}
          >
            {court.surface.toUpperCase()}
          </Badge>
        </div>
        
        <div className="mb-3 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          <span className="line-clamp-1">{court.location}</span>
        </div>
        
        <div className="mb-3 flex items-center">
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-tennis-accent text-tennis-accent" />
            <span className="text-sm font-medium">{court.rating}</span>
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            ({court.reviewCount} reviews)
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {court.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold text-primary">{court.priceRange}</span>
          <Button 
            variant="default" 
            size="sm"
            className="bg-gradient-tennis hover:bg-primary-hover transition-all duration-200"
          >
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}