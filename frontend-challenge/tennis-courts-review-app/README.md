# Tennis Courts Review App

A mobile-first React Native application built with Expo for reviewing tennis courts. The app features a clean, modern UI with search functionality, pagination, and detailed court information with user reviews.

## 🚀 Features

- **Court Discovery**: Browse through 60+ tennis courts with detailed information
- **Search & Filter**: Real-time search across court names, locations, cities, and descriptions
- **Pagination**: Efficient loading with "Load More" functionality
- **Court Details**: Comprehensive court information with ratings and reviews
- **Review System**: Leave ratings and reviews for courts
- **Responsive Design**: Mobile-first design with Tailwind CSS styling
- **API Simulation**: Realistic API calls with loading states and error handling

## 🛠️ Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Tailwind CSS** with NativeWind for styling
- **Custom Hooks** for data management
- **Component Architecture** for reusability

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tennis-courts-review-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

### Development Commands

```bash
# Install dependencies
npm install

# Run on iOS simulator
npm run ios
```

**Note**: This app has been tested only on iOS due to time constraints.

## 🤖 AI Development Commands Used

This project was developed with the assistance of AI. Here are the key UI development commands used:

- **Navigation Setup**: `can you create two pages and add navigations` - Implemented React Navigation with stack navigator
- **Clean Architecture**: `can you clean up unsued code and dead code. and follow clean archtectucere for folder structure?` - Organized code into proper folder structure
- **Data Model**: `can you change the data modal in mocks id, name, location, city,state rating. descrption for courts` - Simplified court data structure

- **API Simulation**: `move mockReviews to mock courts files also for while fetchin details simulate a api call` - Implemented custom hooks with API simulation
- **Search Enhancement**: `the text should disaplay current details after the search` - Enhanced search results display
- **Pagination Logic**: `totalPages should reflect filtered list` - Fixed pagination to reflect filtered results

## 🚀 If I Had More Time

### Unit Testing
- **Jest & React Native Testing Library**: Comprehensive test suite
- **Component Testing**: Test all reusable components (StarRating, CourtCard, ReviewCard)
- **Hook Testing**: Test custom hooks (useCourts, useCourtDetails)
- **Integration Testing**: Test screen interactions and navigation
- **Mock Testing**: Test API simulation and error handling

### Build Pipeline & Deployment
- **CI/CD Pipeline**: GitHub Actions for automated testing and building
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks
- **Automated Testing**: Run tests on every pull request
- **Build Automation**: Automated builds for iOS and Android
- **App Store Deployment**: Automated submission to App Store and Google Play
- **Environment Management**: Separate staging and production environments

### UX Optimizations
- **Performance**: Implement FlatList for better scrolling performance
- **Caching**: Add data caching and offline support
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: Screen reader support and accessibility features
- **Dark Mode**: Theme switching capability
- **Push Notifications**: Real-time updates for new reviews
- **Image Optimization**: Court photos and user avatars

### API Integrations
- **Real Backend**: Replace mock data with actual REST API
- **Authentication**: User login/signup with JWT tokens
- **Real-time Updates**: WebSocket integration for live reviews
- **Image Upload**: Photo upload for court images and user avatars
- **Maps Integration**: Google Maps or Apple Maps for court locations
- **Push Notifications**: Firebase for real-time notifications
- **Analytics**: User behavior tracking and app analytics
- **Error Monitoring**: Sentry or similar for crash reporting

### Advanced Features
- **Favorites**: Save favorite courts
- **Social Features**: Follow other users, share reviews
- **Advanced Search**: Filter by rating, location, amenities
- **Booking System**: Court reservation functionality
- **Weather Integration**: Weather data for outdoor courts
- **Reviews Moderation**: Admin panel for review management
- **Multi-language**: Internationalization support
