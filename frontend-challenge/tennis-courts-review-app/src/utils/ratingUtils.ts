export const getRatingText = (rating: number): string => {
  switch (rating) {
    case 1: return 'Poor';
    case 2: return 'Fair';
    case 3: return 'Good';
    case 4: return 'Very Good';
    case 5: return 'Excellent';
    default: return 'Select Rating';
  }
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const validateReview = (rating: number, comment: string): { isValid: boolean; error?: string } => {
  if (rating === 0) {
    return { isValid: false, error: 'Please select a rating before submitting your review.' };
  }

  if (comment.trim().length < 10) {
    return { isValid: false, error: 'Please write at least 10 characters for your review.' };
  }

  return { isValid: true };
};
