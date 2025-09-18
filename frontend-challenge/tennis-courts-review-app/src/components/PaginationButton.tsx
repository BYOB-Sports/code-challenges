import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

interface PaginationButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  text?: string;
}

export default function PaginationButton({ 
  onPress, 
  loading = false, 
  disabled = false,
  text = "Load More"
}: PaginationButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`py-3 px-6 rounded-lg mx-4 mb-4 ${
        disabled || loading 
          ? 'bg-gray-300' 
          : 'bg-blue-500'
      }`}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <>
            <ActivityIndicator size="small" color="#fff" />
            <Text className="text-white font-semibold ml-2">Loading...</Text>
          </>
        ) : (
          <Text className={`font-semibold ${
            disabled ? 'text-gray-500' : 'text-white'
          }`}>
            {text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
