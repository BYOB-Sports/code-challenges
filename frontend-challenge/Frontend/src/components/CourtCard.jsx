import { MapPin, Star, Heart, Clock } from "lucide-react";
import { useState } from "react";
import { toggleFavorite, getFavorites } from "../utils/localStorage";

const CourtCard = ({ court, onClick, showFullDetails = false }) => {
  const [isFavorite, setIsFavorite] = useState(() =>
    getFavorites().includes(court.id)
  );

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const newFavoriteStatus = toggleFavorite(court.id);
    setIsFavorite(newFavoriteStatus);
  };

  const getBadgeColor = (category) => {
    switch (category) {
      case "Featured":
        return "bg-primary text-white";
      case "Premium":
        return "bg-blue-500 text-white";
      case "Luxury":
        return "bg-purple-500 text-white";
      case "Budget Friendly":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getSurfaceBadgeColor = (surface) => {
    switch (surface) {
      case "Clay":
        return "bg-orange-100 text-orange-800";
      case "Hard":
        return "bg-gray-100 text-gray-800";
      case "Indoor":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className="court-card cursor-pointer group relative overflow-hidden animate-fade-in"
      onClick={() => onClick(court)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(court);
        }
      }}
      aria-label={`View details for ${court.name}`}
    >
      <div className="relative">
        <img
          src={court.image}
          alt={`${court.name} tennis court`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor(
              court.category
            )}`}
          >
            {court.category}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getSurfaceBadgeColor(
              court.surface
            )}`}
          >
            {court.surface}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors focus:ring-2 focus:ring-primary"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-body font-normal text-lg text-gray-900 group-hover:text-primary transition-colors">
            {court.name}
          </h3>
          <span className="text-lg font-bold text-primary">{court.price}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
          <span className="text-sm">{court.location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star
              className="h-4 w-4 text-yellow-400 fill-current"
              aria-hidden="true"
            />
            <span className="ml-1 text-sm font-medium">{court.rating}</span>
            <span className="ml-1 text-sm text-gray-500">
              ({court.reviewCount})
            </span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
            <span>{court.type}</span>
          </div>
        </div>

        {showFullDetails && (
          <div className="space-y-2">
            <p className="text-gray-600 text-sm font-body font-light">
              {court.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {court.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {amenity}
                </span>
              ))}
              {court.amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  +{court.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtCard;
