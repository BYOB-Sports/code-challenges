import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Welcome to Home
        </Text>
        
        <Text className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
          Navigate to different sections using the buttons below.
        </Text>

        <View className="w-full max-w-sm space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile' as never)}
            className="bg-blue-500 py-4 px-6 rounded-lg shadow-md active:bg-blue-600"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Go to Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-200 py-4 px-6 rounded-lg shadow-md active:bg-gray-300"
          >
            <Text className="text-gray-700 text-lg font-semibold text-center">
              More Features Coming Soon
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}