/**
 * Utility functions for the Tennis Court App
 */

/**
 * Formats a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formats a price to display with currency
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Calculates average rating from an array of ratings
 */
export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
};

/**
 * Debounce function for search and filtering
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generates a unique ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Truncates text to specified length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}...`;
};

/**
 * Filters courts based on search criteria
 */
export const filterCourts = (
  courts: any[],
  searchTerm: string,
  filters: any
) => {
  return courts.filter(court => {
    // Text search
    const matchesSearch =
      court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      court.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Surface filter
    const matchesSurface =
      !filters.surface || court.surface === filters.surface;

    // Indoor/Outdoor filter
    const matchesIndoor =
      filters.indoor === undefined || court.indoor === filters.indoor;

    // Price range filter
    const matchesPrice =
      (!filters.minPrice || court.pricePerHour >= filters.minPrice) &&
      (!filters.maxPrice || court.pricePerHour <= filters.maxPrice);

    // Rating filter
    const matchesRating =
      !filters.minRating || court.rating >= filters.minRating;

    return (
      matchesSearch &&
      matchesSurface &&
      matchesIndoor &&
      matchesPrice &&
      matchesRating
    );
  });
};
