import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center py-8 px-6">
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-purple-500 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">JD</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            John Doe
          </Text>
          <Text className="text-gray-600">
            john.doe@example.com
          </Text>
        </View>

        {/* Profile Stats */}
        <View className="w-full max-w-sm mb-8">
          <View className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-3 border border-gray-100">
            <Text className="text-gray-600">Projects Completed</Text>
            <Text className="text-xl font-bold text-blue-600">12</Text>
          </View>
          
          <View className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-3 border border-gray-100">
            <Text className="text-gray-600">Experience</Text>
            <Text className="text-xl font-bold text-green-600">3 years</Text>
          </View>
          
          <View className="flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <Text className="text-gray-600">Location</Text>
            <Text className="text-xl font-bold text-purple-600">San Francisco</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="w-full max-w-sm space-y-4 mb-8">
          <TouchableOpacity
            onPress={() => navigation.navigate('Home' as never)}
            className="bg-purple-500 py-4 px-6 rounded-lg shadow-md active:bg-purple-600"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Back to Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-green-500 py-4 px-6 rounded-lg shadow-md active:bg-green-600"
          >
            <Text className="text-white text-lg font-semibold text-center">
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-200 py-4 px-6 rounded-lg shadow-md active:bg-gray-300"
          >
            <Text className="text-gray-700 text-lg font-semibold text-center">
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}