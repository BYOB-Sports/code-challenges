import { Platform, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const SURFACE_TYPES = {
  CLAY: 'clay' as const,
  GRASS: 'grass' as const,
  HARD: 'hard' as const,
  SYNTHETIC: 'synthetic' as const,
} as const;

export const SURFACE_LABELS = {
  clay: 'Clay',
  grass: 'Grass',
  hard: 'Hard Court',
  synthetic: 'Synthetic',
} as const;

// Enhanced color system with gradients and semantic colors
export const COLORS = {
  primary: '#1a73e8',
  primaryDark: '#1557b0',
  primaryLight: '#4285f4',
  secondary: '#5f6368',
  secondaryDark: '#3c4043',
  secondaryLight: '#9aa0a6',
  accent: '#ff6b35',
  accentLight: '#ff8a65',
  success: '#34a853',
  successLight: '#81c784',
  warning: '#fbbc04',
  warningLight: '#fff176',
  error: '#ea4335',
  errorLight: '#ef5350',
  info: '#4fc3f7',

  // Backgrounds
  background: '#ffffff',
  backgroundSecondary: '#f8f9fa',
  surface: '#ffffff',
  surfaceElevated: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',

  // Text colors
  text: {
    primary: '#202124',
    secondary: '#5f6368',
    tertiary: '#9aa0a6',
    disabled: '#dadce0',
    inverse: '#ffffff',
    link: '#1a73e8',
    accent: '#ff6b35',
  },

  // Border colors
  border: {
    default: '#dadce0',
    light: '#f1f3f4',
    focus: '#1a73e8',
    error: '#ea4335',
    success: '#34a853',
  },

  // Gradients
  gradients: {
    primary: ['#1a73e8', '#4285f4'],
    success: ['#34a853', '#81c784'],
    warm: ['#ff6b35', '#ff8a65'],
    cool: ['#4fc3f7', '#81d4fa'],
    sunset: ['#ff6b35', '#ffab40', '#ffd54f'],
    ocean: ['#1a73e8', '#4fc3f7', '#81d4fa'],
  },

  // Surface specific colors
  surfaces: {
    clay: '#D2691E',
    grass: '#228B22',
    hard: '#4169E1',
    synthetic: '#8A2BE2',
  },
} as const;

// Responsive spacing system
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,

  // Responsive spacing based on screen size
  responsive: {
    xs: screenWidth < 375 ? 2 : 4,
    sm: screenWidth < 375 ? 6 : 8,
    md: screenWidth < 375 ? 12 : 16,
    lg: screenWidth < 375 ? 20 : 24,
    xl: screenWidth < 375 ? 28 : 32,
    xxl: screenWidth < 375 ? 36 : 40,
  },
} as const;

// Enhanced typography with responsive scaling
export const TYPOGRAPHY = {
  families: {
    regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
    medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
  },

  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 28,
    hero: 32,

    // Responsive sizes
    responsive: {
      xs: screenWidth < 375 ? 11 : 12,
      sm: screenWidth < 375 ? 13 : 14,
      md: screenWidth < 375 ? 15 : 16,
      lg: screenWidth < 375 ? 17 : 18,
      xl: screenWidth < 375 ? 19 : 20,
      xxl: screenWidth < 375 ? 22 : 24,
      title: screenWidth < 375 ? 26 : 28,
      hero: screenWidth < 375 ? 30 : 32,
    },
  },

  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
} as const;

// Platform-specific shadows and elevations
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }),

  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),

  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }),

  xlarge: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 16,
    },
  }),
} as const;

// Animation constants
export const ANIMATIONS = {
  timing: {
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },

  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },

  spring: {
    gentle: {
      tension: 120,
      friction: 14,
    },
    wobbly: {
      tension: 180,
      friction: 12,
    },
    stiff: {
      tension: 200,
      friction: 20,
    },
  },
} as const;

// Platform-specific shadows and elevations
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }),

  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),

  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }),

  xlarge: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {
      elevation: 16,
    },
  }),
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  small: 375,
  medium: 414,
  large: 768,
  xlarge: 1024,
} as const;

// Screen dimensions
export const SCREEN = {
  width: screenWidth,
  height: screenHeight,
  isSmall: screenWidth < BREAKPOINTS.small,
  isMedium: screenWidth >= BREAKPOINTS.small && screenWidth < BREAKPOINTS.large,
  isLarge: screenWidth >= BREAKPOINTS.large,
  isTablet: screenWidth >= BREAKPOINTS.large,
} as const;

// Border radius constants
export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 50,
  pill: 100,
} as const;

// Z-index constants
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  max: 99,
} as const;

// API endpoints (keeping existing exports at the end)
export const API_ENDPOINTS = {
  COURTS: '/api/courts',
  COURT_DETAIL: (id: string) => `/api/courts/${id}`,
  REVIEWS: (courtId: string) => `/api/courts/${courtId}/reviews`,
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
