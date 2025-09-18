import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mockCourts, TennisCourt } from '../data/mockCourts';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourts = useMemo(() => {
    return mockCourts.filter(court => {
      const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           court.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           court.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [searchQuery]);

  const renderCourtCard = (court: TennisCourt) => (
    <TouchableOpacity
      key={court.id}
      onPress={() => navigation.navigate('CourtDetail', { courtId: court.id } as never)}
      className="bg-white mb-4 rounded-lg shadow-sm border border-gray-100 p-4"
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-gray-800 flex-1 mr-2">
          {court.name}
        </Text>
        <View className="flex-row items-center">
          <Text className="text-yellow-500 text-lg">★</Text>
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

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 pt-4 pb-2 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Tennis Courts
        </Text>
        
        {/* Search Bar */}
        <View className="bg-gray-100 rounded-lg px-4 py-3 mb-4">
          <TextInput
            placeholder="Search courts, locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Results Count */}
      <View className="px-4 py-2 bg-gray-50">
        <Text className="text-gray-600 text-sm">
          {filteredCourts.length} courts found
        </Text>
      </View>

      {/* Courts List */}
      <ScrollView className="flex-1 px-4">
        {filteredCourts.length > 0 ? (
          filteredCourts.map(renderCourtCard)
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-500 text-lg text-center">
              No courts found matching your search
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}