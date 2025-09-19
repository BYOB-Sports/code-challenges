# 🎾 Tennis Court Reviews

A modern React Native application for discovering and reviewing tennis courts worldwide. Built with TypeScript, featuring smooth animations, real-time search, and a comprehensive review system.

## 📱 Features

- **Court Discovery**: Browse 52+ tennis courts from around the world
- **Real-time Search**: Instant filtering by court name or location
- **Detailed Reviews**: View and add reviews with star ratings
- **Smooth Animations**: Professional UI with custom animations
- **Cross-platform**: Runs on both iOS and Android devices

## 🏗️ Project Structure

```
TennisCourtReviews/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CourtCard.tsx    # Court listing card component
│   │   ├── ErrorBoundary.tsx # Error handling wrapper
│   │   ├── LoadingSpinner.tsx # Loading state component
│   │   └── StarRating.tsx   # Interactive star rating component
│   ├── constants/           # App-wide constants
│   │   └── index.ts         # Colors, dimensions, animations config
│   ├── context/             # State management
│   │   └── CourtsContext.tsx # Global courts state with Context API
│   ├── data/                # Static data
│   │   └── courts.ts        # Tennis courts dataset (52 courts)
│   ├── hooks/               # Custom React hooks
│   │   ├── useAnimations.ts # Animation utilities
│   │   └── useDebounce.ts   # Search debouncing hook
│   ├── screens/             # App screens
│   │   ├── CourtsListScreen.tsx  # Main listing screen
│   │   └── CourtDetailScreen.tsx # Court details & reviews
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Interfaces and types
│   └── utils/               # Utility functions
│       └── validation.ts    # Form validation helpers
├── android/                 # Android-specific files
├── ios/                     # iOS-specific files
├── App.tsx                  # Root component with navigation
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🛠️ Technology Stack

- **React Native 0.81.4** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation 7** - Screen navigation
- **Context API** - State management
- **React Native Vector Icons** - Icon library
- **Animated API** - Smooth animations

## 📋 Prerequisites

Before running the app, ensure you have:

- **Node.js** (>= 20.0.0)
- **npm** or **yarn**
- **React Native CLI** (`npm install -g @react-native-community/cli`)

### For iOS Development:
- **Xcode** (latest version)
- **iOS Simulator** or physical iOS device
- **CocoaPods** (`sudo gem install cocoapods`)

### For Android Development:
- **Android Studio** with SDK
- **Android Emulator** or physical Android device
- **Java Development Kit (JDK 11)**

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TennisCourtReviews
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

## 📱 Running the App

### Start Metro Bundler
First, start the Metro development server:
```bash
npm start
# or
npx react-native start
```

### Run on iOS
```bash
# Using npm script
npm run ios

# Or using React Native CLI
npx react-native run-ios

# For specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### Run on Android
```bash
# Using npm script
npm run android

# Or using React Native CLI
npx react-native run-android

# For specific device
npx react-native run-android --deviceId=<device-id>
```

## 🎯 App Architecture

### State Management
The app uses **React Context API** for global state management:
- `CourtsContext` manages courts data, search functionality, and reviews
- Reducer pattern for predictable state updates
- Optimized with `useMemo` for filtered results

### Navigation
**React Navigation Stack Navigator** handles screen transitions:
- `CourtsList` - Main screen with search and court cards
- `CourtDetail` - Detailed view with reviews and add review form

### Performance Optimizations
- **FlatList virtualization** for smooth scrolling
- **React.memo** for component memoization
- **useCallback** for function optimization
- **Debounced search** to prevent excessive filtering
- **Image lazy loading** with placeholder URLs

### Animation System
Custom hooks provide smooth animations:
- `useScaleAnimation` - Touch feedback for cards
- `useFadeAnimation` - Smooth content transitions
- `useSlideAnimation` - Screen navigation effects

## 🔧 Available Scripts

```bash
npm start          # Start Metro bundler
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator/device
npm run lint       # Run ESLint
npm test          # Run Jest tests
```

## 📊 Data Structure

### Court Object
```typescript
interface Court {
  id: number;
  name: string;
  location: string;
  image: string;
  averageRating: number;
  reviews: Review[];
}
```

### Review Object
```typescript
interface Review {
  id: number;
  user: string;
  rating: number;
  text: string;
  createdAt?: Date;
}
```

## 🎨 Design System

The app follows a consistent design system:

### Colors
- **Primary**: #007AFF (iOS Blue)
- **Surface**: #FFFFFF (White)
- **Background**: #F5F5F5 (Light Gray)
- **Text**: #333333 (Dark Gray)
- **Star Rating**: #FFD700 (Gold)

### Typography
- **Header**: 28px, Bold
- **Title**: 24px, Bold
- **Large**: 18px, Regular
- **Medium**: 16px, Regular
- **Small**: 14px, Regular

## 🔍 Key Features Explained

### 1. Court Listing Screen
- Displays all tennis courts in a scrollable list
- Real-time search with 300ms debouncing
- Smooth card animations on touch
- Performance optimized with FlatList

### 2. Court Detail Screen
- Large court image and detailed information
- Star rating display and review list
- Add new review form with validation
- Smooth navigation transitions

### 3. Search Functionality
- Searches across court names and locations
- Instant results with debounced input
- Clear search button for easy reset
- Case-insensitive matching

### 4. Review System
- 5-star rating system
- Form validation for user input
- Real-time average rating calculation
- Optimistic UI updates

## 🐛 Troubleshooting

### Common Issues

**Metro bundler port conflict:**
```bash
npx react-native start --port 8082
```

**Android build fails:**
```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

**iOS build fails:**
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

**Clear cache:**
```bash
npx react-native start --reset-cache
```

### Performance Issues
- Ensure you're running on a physical device for best performance
- Use Release build for production testing:
  ```bash
  npx react-native run-android --variant=release
  npx react-native run-ios --configuration Release
  ```

## 📈 Future Enhancements

- [ ] Offline data caching
- [ ] User authentication
- [ ] Court booking system
- [ ] Photo upload for reviews
- [ ] Push notifications
- [ ] Social sharing features
- [ ] Map integration
- [ ] Advanced filtering options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Built with ❤️ by the development team for tennis enthusiasts worldwide.

---

**Happy Tennis! 🎾**
