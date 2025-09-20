/**
 * Enhanced utility functions for the Tennis Court App with performance optimizations
 */

import { Image, InteractionManager } from 'react-native';

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
  return '$' + price.toFixed(2);
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
 * Enhanced debounce function for search and filtering
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
 * Throttle function for scroll events and other high-frequency events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
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
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Enhanced filters courts with optimized performance
 */
export const filterCourts = (
  courts: any[],
  searchTerm: string,
  filters: any
) => {
  // Early return for empty array
  if (!courts || courts.length === 0) return [];
  
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  
  return courts.filter(court => {
    // Text search with optimized string operations
    const matchesSearch = !searchTerm.trim() || 
      court.name.toLowerCase().includes(lowercaseSearchTerm) ||
      court.address.toLowerCase().includes(lowercaseSearchTerm) ||
      court.location.toLowerCase().includes(lowercaseSearchTerm);

    // Surface filter
    const matchesSurface = !filters.surface || court.surface === filters.surface;

    // Indoor/Outdoor filter
    const matchesIndoor = filters.indoor === undefined || court.indoor === filters.indoor;

    // Price range filter
    const matchesPrice =
      (!filters.minPrice || court.pricePerHour >= filters.minPrice) &&
      (!filters.maxPrice || court.pricePerHour <= filters.maxPrice);

    // Rating filter
    const matchesRating = !filters.minRating || court.rating >= filters.minRating;

    return matchesSearch && matchesSurface && matchesIndoor && matchesPrice && matchesRating;
  });
};

// ========== IMAGE CACHING AND OPTIMIZATION ==========

/**
 * Simple in-memory image cache
 */
class ImageCache {
  private cache: Map<string, boolean> = new Map();
  private maxSize: number = 100; // Maximum cached items

  isLoaded(uri: string): boolean {
    return this.cache.has(uri);
  }

  markAsLoaded(uri: string): void {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(uri, true);
  }

  clear(): void {
    this.cache.clear();
  }

  remove(uri: string): void {
    this.cache.delete(uri);
  }
}

export const imageCache = new ImageCache();

/**
 * Preload images for better performance
 */
export const preloadImage = (uri: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (imageCache.isLoaded(uri)) {
      resolve();
      return;
    }

    Image.prefetch(uri)
      .then(() => {
        imageCache.markAsLoaded(uri);
        resolve();
      })
      .catch(reject);
  });
};

/**
 * Preload multiple images in batches
 */
export const preloadImages = async (uris: string[], batchSize: number = 5): Promise<void[]> => {
  const batches: string[][] = [];
  for (let i = 0; i < uris.length; i += batchSize) {
    batches.push(uris.slice(i, i + batchSize));
  }

  const results: void[] = [];
  for (const batch of batches) {
    const batchResults = await Promise.all(batch.map(preloadImage));
    results.push(...batchResults);
  }
  
  return results;
};

// ========== MEMORY MANAGEMENT ==========

/**
 * Cleanup function for removing event listeners and timers
 */
export const createCleanupManager = () => {
  const cleanupFunctions: Array<() => void> = [];

  return {
    add: (cleanup: () => void) => {
      cleanupFunctions.push(cleanup);
    },
    cleanup: () => {
      cleanupFunctions.forEach(fn => fn());
      cleanupFunctions.length = 0;
    },
  };
};

/**
 * Safe timeout with cleanup
 */
export const createSafeTimeout = (callback: () => void, delay: number) => {
  const timeoutId = setTimeout(callback, delay);
  return () => clearTimeout(timeoutId);
};

/**
 * Safe interval with cleanup
 */
export const createSafeInterval = (callback: () => void, delay: number) => {
  const intervalId = setInterval(callback, delay);
  return () => clearInterval(intervalId);
};

// ========== PERFORMANCE UTILITIES ==========

/**
 * Run task after interactions are complete
 */
export const runAfterInteractions = (task: () => void): void => {
  InteractionManager.runAfterInteractions(task);
};

/**
 * Memoization utility for expensive calculations
 */
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  }) as T;
};

/**
 * Optimized array chunk function
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Request animation frame utility
 */
export const nextFrame = (): Promise<void> => {
  return new Promise(resolve => {
    requestAnimationFrame(() => resolve());
  });
};

/**
 * Batch updates to improve performance
 */
export const batchUpdates = <T>(
  items: T[],
  updateFn: (item: T) => void,
  batchSize: number = 10
): Promise<void> => {
  return new Promise(resolve => {
    const batches = chunk(items, batchSize);
    let currentBatch = 0;

    const processBatch = () => {
      if (currentBatch >= batches.length) {
        resolve();
        return;
      }

      batches[currentBatch].forEach(updateFn);
      currentBatch++;
      
      requestAnimationFrame(processBatch);
    };

    processBatch();
  });
};

// ========== ACCESSIBILITY UTILITIES ==========

/**
 * Generate accessibility label for court cards
 */
export const generateCourtAccessibilityLabel = (court: any): string => {
  return court.name + ', rating ' + court.rating + ' stars, ' + court.pricePerHour + ' dollars per hour, ' + court.surface + ' surface, ' + (court.indoor ? 'indoor' : 'outdoor') + ' court';
};

/**
 * Generate accessibility hint
 */
export const generateAccessibilityHint = (action: string): string => {
  return 'Double tap to ' + action;
};

// ========== ERROR HANDLING ==========

/**
 * Safe function execution with error handling
 */
export const safeExecute = <T>(
  fn: () => T,
  fallback: T,
  onError?: (error: Error) => void
): T => {
  try {
    return fn();
  } catch (error) {
    if (onError) {
      onError(error as Error);
    }
    return fallback;
  }
};

/**
 * Retry function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i === maxRetries - 1) {
        throw lastError;
      }
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

// ========== URL AND STRING UTILITIES ==========

/**
 * Create optimized image URL with size parameters
 */
export const optimizeImageUrl = (url: string): string => {
  if (!url) return '';
  
  // For demo purposes, just return the original URL
  // In a real app, you might append size parameters for CDN optimization
  return url;
};

/**
 * Generate blur hash placeholder (simplified version)
 */
export const generatePlaceholderColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const hue = Math.abs(hash) % 360;
  return 'hsl(' + hue + ', 20%, 90%)';
};
