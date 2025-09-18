import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TennisCourt } from '../data/mockCourts';
import StarRating from './StarRating';

interface CourtCardProps {
  court: TennisCourt;
  onPress: () => void;
}

export default function CourtCard({ court, onPress }: CourtCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white mb-4 rounded-lg shadow-sm border border-gray-100 p-4"
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-gray-800 flex-1 mr-2">
          {court.name}
        </Text>
        <View className="flex-row items-center">
          <StarRating rating={Math.floor(court.rating)} size="sm" />
          <Text className="text-gray-600 ml-1">{court.rating}</Text>
        </View>
      </View>
      
      <Text className="text-gray-600 mb-1">{court.location}</Text>
      <Text className="text-gray-500 mb-3">{court.city}, {court.state}</Text>
      
      <Text className="text-gray-700 text-sm leading-5" numberOfLines={2}>
        {court.description}
      </Text>
    </TouchableOpacity>
  );
}
