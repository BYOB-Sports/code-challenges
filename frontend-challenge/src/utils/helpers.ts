export const generateStars = (rating: number): string => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  let stars = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  
  // Half star
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const filterCourts = (
  courts: any[],
  searchTerm: string,
  ratingFilter: string,
  surfaceFilter: string
) => {
  // Early return if no filters applied
  if (!searchTerm.trim() && !ratingFilter && !surfaceFilter) {
    return courts;
  }

  const term = searchTerm.toLowerCase().trim();
  const minRating = ratingFilter ? parseFloat(ratingFilter) : 0;
  
  // Single pass filtering for better performance
  return courts.filter(court => {
    // Search filter
    if (term) {
      const matchesSearch = 
        court.name.toLowerCase().includes(term) ||
        court.location.toLowerCase().includes(term) ||
        court.address.toLowerCase().includes(term) ||
        court.surface.toLowerCase().includes(term) ||
        court.description.toLowerCase().includes(term);
      
      if (!matchesSearch) return false;
    }
    
    // Rating filter
    if (ratingFilter && court.rating < minRating) {
      return false;
    }
    
    // Surface filter
    if (surfaceFilter && court.surface !== surfaceFilter) {
      return false;
    }
    
    return true;
  });
};
