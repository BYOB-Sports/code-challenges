import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCourtDetails } from '../hooks/useCourtDetails';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import { getRatingText, validateReview } from '../utils/ratingUtils';

export default function CourtDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { courtId } = route.params as { courtId: string };
  
  const { court, loading, error } = useCourtDetails(courtId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-4">Loading court details...</Text>
      </View>
    );
  }
  
  if (error || !court) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-red-500 text-lg mb-4">{error || 'Court not found'}</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-blue-500 py-3 px-6 rounded-lg"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }


  const handleSubmit = async () => {
    const validation = validateReview(rating, comment);
    if (!validation.isValid) {
      Alert.alert('Validation Error', validation.error);
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
          onPress: () => {
            setRating(0);
            setComment('');
            setIsSubmitting(false);
          },
        },
      ]
    );
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
              <StarRating rating={Math.floor(court.rating)} size="lg" />
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
      </View>

      {/* Reviews Section */}
      <View className="bg-white mt-2 p-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Reviews ({court.reviews.length})
        </Text>
        
        {court.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </View>

      {/* Write Review Section */}
      <View className="bg-white mt-2 p-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Write a Review
        </Text>
        
        {/* Rating */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Rating</Text>
          <View className="flex-row items-center mb-2">
            <StarRating rating={rating} size="lg" interactive onPress={setRating} />
          </View>
          <Text className={`text-sm ${rating > 0 ? 'text-gray-800' : 'text-gray-500'}`}>
            {getRatingText(rating)}
          </Text>
        </View>

        {/* Comment */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Your Review</Text>
          <TextInput
            placeholder="Share your experience with this tennis court..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="bg-gray-50 p-4 rounded-lg text-gray-800 border border-gray-200"
            placeholderTextColor="#9CA3AF"
          />
          <Text className="text-gray-500 text-xs mt-1">
            {comment.length}/500 characters (minimum 10)
          </Text>
        </View>

        {/* Submit Button */}
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
      </View>

      {/* Bottom Padding */}
      <View className="h-20" />
    </ScrollView>
  );
}
