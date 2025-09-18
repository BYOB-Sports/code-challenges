# Tennis Court Review App 🎾

A beautiful, interactive mobile-first React Native app for discovering and reviewing tennis courts. Built with modern UI/UX principles and optimized for mobile devices.

## Features

### 🏆 Core Functionality
- **Court Discovery**: Browse through 60+ mock tennis courts with detailed information
- **Smart Search**: Search courts by name, location, surface type, and amenities
- **Detailed Views**: Comprehensive court information including ratings, amenities, and location
- **Review System**: Interactive review submission with star ratings and comments
- **Mobile-First Design**: Optimized for mobile devices with beautiful, responsive UI

### 🎨 UI/UX Highlights
- **Beautiful Cards**: Elegant court cards with high-quality images and smooth animations
- **Interactive Elements**: Touch-friendly buttons, animated transitions, and haptic feedback
- **Modern Design**: Clean, professional interface with tennis-themed color scheme
- **Smooth Navigation**: Seamless transitions between court list and detail views
- **Loading States**: Elegant loading animations and refresh controls
- **Empty States**: Helpful empty state messages when no results are found

### 📱 Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Navigation**: Stack-based navigation between screens
- **Mock Data**: 60+ realistic tennis courts with comprehensive details
- **Performance Optimized**: Efficient rendering with FlatList and proper memoization
- **Responsive Design**: Adapts beautifully to different screen sizes
- **Accessibility**: Proper accessibility labels and touch targets

## Tech Stack

- **React Native 0.81.4**
- **TypeScript**
- **React Navigation 6**
- **React Native Safe Area Context**
- **React Native Vector Icons**

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AnimatedCard.tsx
│   ├── LoadingSpinner.tsx
│   ├── SplashScreen.tsx
│   └── StarRating.tsx
├── data/               # Mock data and data models
│   └── mockData.ts
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── screens/           # Main app screens
│   ├── CourtListScreen.tsx
│   └── CourtDetailScreen.tsx
└── types/             # TypeScript type definitions
    └── index.ts
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Run the App**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## Key Components

### CourtListScreen
- Displays all available tennis courts in beautiful card format
- Real-time search functionality with instant filtering
- Pull-to-refresh capability
- Smooth animations and loading states
- Empty state handling

### CourtDetailScreen
- Comprehensive court information display
- Interactive review system with star ratings
- User review display with verification badges
- Modal-based review submission form
- Amenities and facility details

### Mock Data
- 60+ realistic tennis courts across various US cities
- Diverse court types (indoor/outdoor, different surfaces)
- Comprehensive amenities and pricing information
- User reviews with ratings and comments
- High-quality placeholder images

## Design Principles

### Mobile-First Approach
- Optimized for mobile device interactions
- Touch-friendly interface elements
- Responsive design that works on all screen sizes
- Gesture-based navigation

### User Experience
- Intuitive navigation flow
- Clear visual hierarchy
- Consistent design language
- Smooth animations and transitions
- Helpful feedback and loading states

### Performance
- Efficient list rendering with FlatList
- Proper component memoization
- Optimized image loading
- Minimal re-renders

## AI Assistant Prompts Used

This project was developed with the assistance of AI coding tools. Here are the key prompts used:

1. **Initial Setup**: "Create a mobile first, two page app for reviewing tennis courts. A user should be able to see a display of courts, search for a specific court, select a court detail view, and leave a review."

2. **UI Enhancement**: "make sure the UI should be very interactive and beautiful ui ux"

3. **Data Generation**: "Generate mock data for 50+ tennis courts with reviews" - This was expanded to 60+ courts for better scalability demonstration.

4. **Component Creation**: Various prompts for creating reusable components like StarRating, LoadingSpinner, and AnimatedCard.

5. **Navigation Setup**: "Set up React Navigation for two-page app structure"

6. **Search Implementation**: "Add search functionality with filtering and debouncing"

7. **Review System**: "Create interactive review form with rating stars and text input"

8. **Polish & Animations**: "Add animations, loading states, and polish the overall UX"

## Future Enhancements

- Backend integration for real data
- User authentication and profiles
- Court booking functionality
- Map integration for location-based search
- Push notifications for court updates
- Social features and user interactions
- Advanced filtering options
- Offline support

## Screenshots

The app features:
- Beautiful splash screen with tennis ball animation
- Elegant court cards with ratings and amenities
- Comprehensive search functionality
- Detailed court information pages
- Interactive review submission system
- Smooth animations and transitions

## License

This project is created as part of a coding assessment and is for demonstration purposes.