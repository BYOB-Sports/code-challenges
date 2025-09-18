import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { mockCourts } from '../data/mockCourts';

export default function CourtDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { courtId } = route.params as { courtId: string };
  
  const court = mockCourts.find(c => c.id === courtId);
  
  if (!court) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Court not found</Text>
      </View>
    );
  }

  const renderStarRating = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const stars = [];
    const starSize = size === 'lg' ? 'text-2xl' : 'text-sm';
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} className={`${starSize} ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Court Info */}
      <View className="bg-white p-6">
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-1 mr-4">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              {court.name}
            </Text>
            <Text className="text-gray-600 mb-1">{court.location}</Text>
            <Text className="text-gray-500">{court.city}, {court.state}</Text>
          </View>
          <View className="items-end">
            <View className="flex-row items-center mb-2">
              {renderStarRating(Math.floor(court.rating), 'lg')}
              <Text className="text-gray-600 ml-2 text-lg">{court.rating}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <Text className="text-gray-700 leading-6">
            {court.description}
          </Text>
        </View>

        {/* Write Review Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Review', { courtId: court.id } as never)}
          className="bg-blue-500 py-4 px-6 rounded-lg shadow-md mb-6"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Write a Review
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Padding */}
      <View className="h-20" />
    </ScrollView>
  );
}
