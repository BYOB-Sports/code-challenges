import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StarRating from './StarRating';
import { CourtReview } from '../data/mockCourts';

interface ReviewCardProps {
  review: CourtReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <View className="bg-white p-4 mb-3 rounded-lg border border-gray-100">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="font-semibold text-gray-800">{review.userName}</Text>
          <View className="flex-row items-center mt-1">
            <StarRating rating={review.rating} size="sm" />
            <Text className="text-gray-500 text-xs ml-2">
              {new Date(review.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-gray-700 text-sm leading-5">{review.comment}</Text>
      <View className="flex-row items-center mt-2">
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-gray-500 text-xs">👍 Helpful ({review.helpful})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
