import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mockCourts, TennisCourt } from '../data/mockCourts';
import CourtCard from '../components/CourtCard';

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
          filteredCourts.map((court) => (
            <CourtCard
              key={court.id}
              court={court}
              onPress={() => navigation.navigate('CourtDetail', { courtId: court.id } as never)}
            />
          ))
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