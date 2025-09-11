import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { Court } from '@/types/court';
import { useNavigate } from 'react-router-dom';

interface CourtCardProps {
  court: Court;
}

const surfaceStyles = {
  hard: 'bg-blue-600 text-white',
  clay: 'bg-orange-600 text-white',
  grass: 'bg-green-600 text-white',
  indoor: 'bg-purple-600 text-white'
};

export const CourtCard = ({ court }: CourtCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/court/${court.id}`);
  };

  return (
    <Card 
      className="overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={court.image}
          alt={court.name}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-3 left-3 ${surfaceStyles[court.surfaceType]} capitalize`}>
          {court.surfaceType}
        </Badge>
        <Badge className="absolute top-3 right-3 bg-black/50 text-white">
          {court.priceRange}
        </Badge>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{court.name}</h3>
          <div className="flex items-center gap-1 text-gray-600 mt-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{court.location}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{court.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({court.reviewCount} reviews)</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {court.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {court.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs text-gray-500">
              +{court.amenities.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};