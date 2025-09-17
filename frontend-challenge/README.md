# Tennis Court Review App - BYOB Sports Challenge

## 🎾 Project Overview

A beautiful, mobile-first React Native application for discovering and reviewing tennis courts. Built with modern design principles and optimized for mobile devices.

## 📁 Project Structure

```
TennisCourtApp/
├── App.tsx                    # Main app component
├── data/mockData.ts          # 60+ tennis courts data
├── screens/                  # App screens
├── components/               # Reusable components
├── styles/                   # Design system
├── INSTRUCTIONS.md           # Detailed setup instructions
└── package.json              # Dependencies and scripts
```

## 📋 Prerequisites

- Node.js (v20.19.2 or higher)
- npm or yarn
- Expo CLI (optional but recommended)

## 🚀 Quick Start

### Option 1: Using the Script (Recommended)

```bash
./run-app.sh
```

This script will automatically:

- Navigate to the TennisCourtApp directory
- Install dependencies
- Start the development server

### Option 2: Manual Setup

1. **Install Dependencies**

   ```bash
   cd TennisCourtApp
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm start
   ```

### 3. Run on Your Preferred Platform

When the Expo development server starts, you'll see a QR code and menu options:

**For Web Browser (Easiest):**

- Press `w` in the terminal
- Or visit `http://localhost:19006` in your browser

**For Mobile Device (Best Experience):**

- Install "Expo Go" app on your phone
- Scan the QR code with:
  - **iOS**: Camera app → tap notification
  - **Android**: Expo Go app → scan QR code

**For iOS Simulator:**

- Press `i` in the terminal
- Requires Xcode installed

**For Android Emulator:**

- Press `a` in the terminal
- Requires Android Studio with emulator running
