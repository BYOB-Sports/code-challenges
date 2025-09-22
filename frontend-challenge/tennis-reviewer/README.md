# Tennis Court Review App 🎾

A comprehensive mobile application built with Expo and React Native for discovering and reviewing tennis courts across major US cities. The app includes features like court listings, detailed views, user reviews, and location-based filtering.

## Project Structure

The project consists of two main parts:

### 1. Tennis API (`tennis-api/`)
A Node.js/Express backend server that provides:
- Court listings and search functionality
- User authentication
- Review management
- Location services
- Mock data for development

### 2. Tennis Reviewer App (`tennis-reviewer/`)
An Expo/React Native mobile application with features including:
- Location-based court discovery
- Detailed court information
- User reviews and ratings
- Interactive maps
- Search and filtering
- Authentication system

## Getting Started

### Setting up the API Server

1. Navigate to the API directory:
   ```bash
   cd tennis-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```
   The API will be available at http://localhost:4000

### Setting up the Mobile App

1. Navigate to the app directory:
   ```bash
   cd tennis-reviewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Use one of the following methods to run the app:
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator
   - Scan QR code with Expo Go app on your device

## Development Notes

### API Endpoints

- `POST /auth/login` - User authentication
- `GET /locations` - Available locations list
- `GET /geocode` - Location search
- `GET /courts` - Court listings with filters
- `GET /courts/:id` - Court details
- `GET /courts/:id/reviews` - Court reviews
- `POST /courts/:id/reviews` - Submit review (authenticated)

### Mobile App Features

- Location-based court discovery
- Detailed court information with images
- User reviews and ratings
- Interactive maps integration
- Search and filtering capabilities
- Authentication system
- Offline data persistence

## Common Development Questions

Below are questions that were asked to ChatGPT during development:

1. "Why does Metro keep referencing expo-router even after I removed it from package.json?"

2. "What causes the .plugins is not a valid Plugin property error even when my babel.config.js looks fine?"

3. "Is there a cleaner way to handle >50 courts in FlatList without noticeable frame drops?"

4. "How can I make sure search input changes don't trigger too many re-renders in the court list?"

5. "Why does navigation lose state when going back from the court detail screen to the list?"

6. "What's the reason iPhone Expo Go sometimes shows a blank screen while Android works fine?"

7. "How can I safely mock multiple static users so reviews feel realistic across sessions?"

8. "Why does Metro still bundle old config even after running expo start -c?"

9. "What is the best way to persist locally submitted reviews so they survive app reloads?"

10. "Why do AsyncStorage updates sometimes not reflect immediately in the UI?"

11. "How can I structure the mock API so it feels scalable, instead of just a hardcoded array?"

12. "Why do I get Invariant Violation: main not registered after changing the entry file?"

13. "How do I avoid stale cached credentials when switching GitHub accounts on Windows?"

14. "What could cause Expo bundler to keep failing only on iOS while Android builds succeed?"

These questions were asked during the development process to address various challenges encountered while building the application.


