# Tennis Court App

A React Native application built with TypeScript for browsing tennis courts and submitting reviews.
This app is designed to handle 50+ tennis courts efficiently with optimal performance.

## Features

- **Courts List**: Browse available tennis courts with filtering and search
- **Court Details**: View detailed information about each court
- **Reviews System**: Submit and view reviews for courts
- **Mobile-First Design**: Optimized for iOS and Android devices
- **TypeScript**: Full type safety throughout the application
- **Scalable Architecture**: Clean folder structure for maintainability

## Tech Stack

- **React Native** with Expo
- **TypeScript** with strict configuration
- **React Navigation** for screen navigation
- **Path Aliases** for cleaner imports
- **Custom Hooks** for state management
- **Reusable UI Components**

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components
│   └── ui/             # Basic UI components (Button, Card)
├── screens/            # Screen components
│   ├── CourtsListScreen/
│   └── CourtDetailScreen/
├── services/           # API services
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── constants/          # App constants and theme
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. Navigate to the project directory:

   ```bash
   cd TennisCourtApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Run on specific platforms:

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## Development

### TypeScript Configuration

The project uses strict TypeScript settings for better type safety:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `exactOptionalPropertyTypes: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedIndexedAccess: true`

### Path Aliases

Clean imports are configured using path aliases:

```typescript
import { Court } from '@/types';
import { COLORS } from '@/constants';
import CourtCard from '@/components/common/CourtCard';
```

Available aliases:

- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/screens/*` → `src/screens/*`
- `@/utils/*` → `src/utils/*`
- `@/types/*` → `src/types/*`
- `@/services/*` → `src/services/*`
- `@/constants/*` → `src/constants/*`
- `@/hooks/*` → `src/hooks/*`

### Key Components

#### Screens

- **CourtsListScreen**: Displays a list of tennis courts with search and filtering
- **CourtDetailScreen**: Shows detailed court information and reviews

#### Custom Hooks

- **useCourts**: Manages court data fetching, filtering, and pagination

#### Services

- **API Service**: Handles all API communications with proper error handling

#### Types

Comprehensive TypeScript definitions for:

- Court data structures
- Navigation parameters
- API responses
- Filter options

## Performance Optimizations

- **Efficient List Rendering**: Using FlatList for optimal performance with large datasets
- **Pagination Support**: Load courts in chunks to reduce initial load time
- **Debounced Search**: Prevents excessive API calls during search
- **Memoization**: Strategic use of React hooks for performance
- **Type Safety**: Comprehensive TypeScript coverage prevents runtime errors

## API Integration

The app is structured to easily integrate with a real API. The `apiService` class provides:

- RESTful API calls
- Request timeout handling
- Error handling and recovery
- Authentication token management
- Base URL configuration

## Testing

```bash
# Type checking
npx tsc --noEmit

# Run tests (when implemented)
npm test
```

## Building for Production

```bash
# Build for production
expo build:android
expo build:ios
```

## Contributing

1. Follow the established folder structure
2. Use TypeScript for all new code
3. Follow the naming conventions
4. Add proper type definitions
5. Test on both iOS and Android platforms

## Architecture Decisions

- **Expo over bare React Native**: Faster development and easier dependency management
- **Stack Navigator**: Simple navigation pattern suitable for this app structure
- **Custom hooks**: Centralized state management without additional dependencies
- **Path aliases**: Improved code organization and import clarity
- **Strict TypeScript**: Enhanced code quality and developer experience
