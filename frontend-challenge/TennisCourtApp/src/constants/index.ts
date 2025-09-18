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

export const COLORS = {
  primary: '#1a73e8',
  secondary: '#5f6368',
  success: '#34a853',
  warning: '#fbbc04',
  error: '#ea4335',
  background: '#ffffff',
  surface: '#f8f9fa',
  text: {
    primary: '#202124',
    secondary: '#5f6368',
    disabled: '#9aa0a6',
  },
  border: '#dadce0',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const TYPOGRAPHY = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 28,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const API_ENDPOINTS = {
  COURTS: '/api/courts',
  COURT_DETAIL: (id: string) => `/api/courts/${id}`,
  REVIEWS: (courtId: string) => `/api/courts/${courtId}/reviews`,
} as const;

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;
