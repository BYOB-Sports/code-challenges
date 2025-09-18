import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCourts } from '../hooks/useCourts';
import CourtCard from '../components/CourtCard';
import PaginationButton from '../components/PaginationButton';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    courts, 
    loading, 
    error, 
    hasMore, 
    loadMore, 
    refresh, 
    searchCourts,
    currentPage,
    totalPages
  } = useCourts({ pageSize: 10 });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchCourts(query);
  };

  const handleRefresh = () => {
    refresh();
  };


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
            onChangeText={handleSearch}
            className="text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Results Count */}
      <View className="px-4 py-2 bg-gray-50">
        <Text className="text-gray-600 text-sm">
          {courts.length} courts found
          {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
        </Text>
      </View>

      {/* Loading State */}
      {loading && courts.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-gray-600 mt-4">Loading courts...</Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-red-500 text-lg text-center mb-4">{error}</Text>
          <TouchableOpacity
            onPress={handleRefresh}
            className="bg-blue-500 py-3 px-6 rounded-lg"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Courts List */}
      {!loading && !error && (
        <ScrollView 
          className="flex-1 px-4"
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
        >
          {courts.length > 0 ? (
            <>
              {courts.map((court) => (
                <CourtCard
                  key={court.id}
                  court={court}
                  onPress={() => navigation.navigate('CourtDetail', { courtId: court.id } as never)}
                />
              ))}
              
              {/* Pagination Button */}
              {hasMore && (
                <PaginationButton
                  onPress={loadMore}
                  loading={loading}
                  text={`Load More (${currentPage}/${totalPages})`}
                />
              )}
            </>
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
      )}
    </View>
  );
}