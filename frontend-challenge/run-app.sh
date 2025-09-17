#!/bin/bash

# Tennis Court App - Quick Start Script
echo "🎾 Tennis Court Review App - BYOB Sports Challenge"
echo "=================================================="
echo ""

# Navigate to app directory
cd TennisCourtApp

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting the development server..."
echo "   - Press 'w' for Web Browser (easiest)"
echo "   - Press 'i' for iOS Simulator" 
echo "   - Press 'a' for Android Emulator"
echo "   - Scan QR code with Expo Go app on your phone"
echo ""

# Start the Expo development server
npm start
