import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'lg';
  onPress?: (rating: number) => void;
  interactive?: boolean;
}

export default function StarRating({ 
  rating, 
  size = 'sm', 
  onPress, 
  interactive = false 
}: StarRatingProps) {
  const stars = [];
  const starSize = size === 'lg' ? 'text-2xl' : 'text-sm';
  
  for (let i = 1; i <= 5; i++) {
    const isSelected = i <= rating;
    
    if (interactive && onPress) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => onPress(i)}>
          <Text className={`${starSize} ${isSelected ? 'text-yellow-500' : 'text-gray-300'}`}>
            ★
          </Text>
        </TouchableOpacity>
      );
    } else {
      stars.push(
        <Text key={i} className={`${starSize} ${isSelected ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </Text>
      );
    }
  }
  
  return (
    <View className="flex-row items-center">
      {stars}
    </View>
  );
}
