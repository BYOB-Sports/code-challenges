// Mobile-first development rules and best practices for React Native
module.exports = {
  rules: {
    // Performance
    'react-native/no-single-element-style-arrays': 'error',
    'react-native/no-inline-styles': 'warn',

    // Accessibility
    'react/jsx-no-bind': ['warn', { allowArrowFunctions: true }], // Softer for mobile

    // Design consistency
    'react-native/no-color-literals': 'warn',
    'react-native/sort-styles': 'warn',

    // Platform-specific
    'react-native/split-platform-components': 'error',

    // Code organization
    'react-native/no-unused-styles': 'warn',

    // Touch targets and mobile UX
    // Custom rules would go here if we had a plugin for mobile-specific linting
  },

  settings: {
    'react-native': {
      // Configuration for React Native specific settings
      version: 'detect',
    },
  },
};