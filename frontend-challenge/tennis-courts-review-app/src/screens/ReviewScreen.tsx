import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { mockCourts } from '../data/mockCourts';

export default function ReviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { courtId } = route.params as { courtId: string };
  
  const court = mockCourts.find(c => c.id === courtId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!court) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Court not found</Text>
      </View>
    );
  }

  const renderStarRating = (selectedRating: number, onPress?: (rating: number) => void) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => onPress?.(i)}
          className="mr-1"
        >
          <Text className={`text-4xl ${i <= selectedRating ? 'text-yellow-500' : 'text-gray-300'}`}>
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Select Rating';
    }
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a rating before submitting your review.');
      return;
    }

    if (comment.trim().length < 10) {
      Alert.alert('Review Too Short', 'Please write at least 10 characters for your review.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    Alert.alert(
      'Review Submitted!',
      'Thank you for your review. It will help other tennis players make informed decisions.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
    
    setIsSubmitting(false);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white p-6 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Write a Review
        </Text>
        <Text className="text-gray-600">{court.name}</Text>
        <Text className="text-gray-500 text-sm">{court.city}, {court.state}</Text>
      </View>

      {/* Rating Section */}
      <View className="bg-white p-6 mb-2">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          How would you rate this tennis court?
        </Text>
        
        <View className="items-center mb-4">
          <View className="flex-row items-center justify-center mb-2">
            {renderStarRating(rating, setRating)}
          </View>
          <Text className={`text-lg font-medium ${
            rating > 0 ? 'text-gray-800' : 'text-gray-500'
          }`}>
            {getRatingText(rating)}
          </Text>
        </View>
      </View>

      {/* Review Section */}
      <View className="bg-white p-6 mb-2">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Tell us about your experience
        </Text>
        
        <TextInput
          placeholder="Share details about the court condition, facilities, staff, or overall experience..."
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          className="bg-gray-50 p-4 rounded-lg text-gray-800 border border-gray-200"
          placeholderTextColor="#9CA3AF"
        />
        
        <Text className="text-gray-500 text-sm mt-2">
          {comment.length}/500 characters (minimum 10)
        </Text>
      </View>

      {/* Review Tips */}
      <View className="bg-blue-50 p-6 mb-2">
        <Text className="text-lg font-semibold text-blue-800 mb-3">
          💡 Review Tips
        </Text>
        <View className="space-y-2">
          <Text className="text-blue-700 text-sm">
            • Mention court condition and surface quality
          </Text>
          <Text className="text-blue-700 text-sm">
            • Comment on amenities like parking, restrooms, lights
          </Text>
          <Text className="text-blue-700 text-sm">
            • Share details about staff friendliness and helpfulness
          </Text>
          <Text className="text-blue-700 text-sm">
            • Note any unique features or concerns
          </Text>
        </View>
      </View>

      {/* Submit Buttons */}
      <View className="p-6">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting || rating === 0}
          className={`py-4 px-6 rounded-lg shadow-md mb-3 ${
            isSubmitting || rating === 0
              ? 'bg-gray-300'
              : 'bg-green-500 active:bg-green-600'
          }`}
        >
          <Text className={`text-lg font-semibold text-center ${
            isSubmitting || rating === 0 ? 'text-gray-500' : 'text-white'
          }`}>
            {isSubmitting ? 'Submitting Review...' : 'Submit Review'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-gray-200 py-4 px-6 rounded-lg active:bg-gray-300"
        >
          <Text className="text-gray-700 text-lg font-semibold text-center">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Padding */}
      <View className="h-20" />
    </ScrollView>
  );
}
