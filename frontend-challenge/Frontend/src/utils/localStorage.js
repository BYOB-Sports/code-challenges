// Local storage utilities for managing reviews and favorites

export const getStoredReviews = () => {
  try {
    const stored = localStorage.getItem('tennisCourtReviews');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading reviews from localStorage:', error);
    return {};
  }
};

export const saveReview = (courtId, review) => {
  try {
    const stored = getStoredReviews();
    if (!stored[courtId]) {
      stored[courtId] = [];
    }
    stored[courtId].push({
      ...review,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('tennisCourtReviews', JSON.stringify(stored));
    return true;
  } catch (error) {
    console.error('Error saving review to localStorage:', error);
    return false;
  }
};

export const getFavorites = () => {
  try {
    const stored = localStorage.getItem('tennisFavorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const toggleFavorite = (courtId) => {
  try {
    const favorites = getFavorites();
    const index = favorites.indexOf(courtId);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(courtId);
    }
    
    localStorage.setItem('tennisFavorites', JSON.stringify(favorites));
    return favorites.includes(courtId);
  } catch (error) {
    console.error('Error updating favorites in localStorage:', error);
    return false;
  }
};
