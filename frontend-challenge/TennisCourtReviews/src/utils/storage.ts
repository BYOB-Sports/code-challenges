import AsyncStorage from '@react-native-async-storage/async-storage';
import { Review } from '../types';

const REVIEWS_KEY = 'tennis_court_reviews';

export const saveReviews = async (reviews: Review[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  } catch (error) {
    console.error('Error saving reviews:', error);
  }
};

export const loadReviews = async (): Promise<Review[]> => {
  try {
    const reviewsData = await AsyncStorage.getItem(REVIEWS_KEY);
    return reviewsData ? JSON.parse(reviewsData) : [];
  } catch (error) {
    console.error('Error loading reviews:', error);
    return [];
  }
};

export const addReview = async (review: Review): Promise<void> => {
  try {
    const existingReviews = await loadReviews();
    const updatedReviews = [review, ...existingReviews];
    await saveReviews(updatedReviews);
  } catch (error) {
    console.error('Error adding review:', error);
  }
};
