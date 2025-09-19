// Colors
export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  
  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F5F5F5',
  gray200: '#E0E0E0',
  gray300: '#CCCCCC',
  gray400: '#999999',
  gray500: '#666666',
  gray600: '#333333',
  
  // Semantic
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  border: '#E0E0E0',
  
  // Star rating
  starFilled: '#FFD700',
  starEmpty: '#CCCCCC',
} as const;

// Dimensions
export const DIMENSIONS = {
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Border radius
  radiusSmall: 8,
  radiusMedium: 12,
  radiusLarge: 16,
  
  // Font sizes
  fontSmall: 12,
  fontMedium: 14,
  fontLarge: 16,
  fontXLarge: 18,
  fontXXLarge: 20,
  fontTitle: 24,
  fontHeader: 28,
  
  // Component sizes
  buttonHeight: 48,
  inputHeight: 48,
  cardImageHeight: 200,
  headerHeight: 60,
} as const;

// Animation configurations
export const ANIMATIONS = {
  fast: {
    duration: 200,
    useNativeDriver: true,
  },
  medium: {
    duration: 300,
    useNativeDriver: true,
  },
  slow: {
    duration: 500,
    useNativeDriver: true,
  },
  spring: {
    tension: 100,
    friction: 8,
    useNativeDriver: true,
  },
} as const;


// App configuration
export const CONFIG = {
  MAX_RATING: 5,
  MIN_RATING: 1,
  SEARCH_DEBOUNCE_MS: 300,
  IMAGE_PLACEHOLDER: 'https://picsum.photos/300/200',
  REVIEWS_PER_PAGE: 10,
} as const;
