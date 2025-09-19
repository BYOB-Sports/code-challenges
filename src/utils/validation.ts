import { NewReview } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateReview = (review: NewReview): ValidationResult => {
  const errors: string[] = [];

  if (!review.user.trim()) {
    errors.push('Name is required');
  } else if (review.user.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (review.rating < 1 || review.rating > 5) {
    errors.push('Rating must be between 1 and 5 stars');
  }

  if (!review.text.trim()) {
    errors.push('Review text is required');
  } else if (review.text.trim().length < 10) {
    errors.push('Review must be at least 10 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateSearchQuery = (query: string): boolean => {
  return query.length >= 0 && query.length <= 100;
};
