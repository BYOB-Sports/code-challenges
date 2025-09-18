import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Court, SearchFilters } from '../types';
import { mockCourts } from '../data/mockData';

type CourtListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CourtList'
>;

interface Props {
  navigation: CourtListScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

const CourtListScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const filteredCourts = useMemo(() => {
    if (!searchQuery.trim()) return mockCourts;

    return mockCourts.filter(
      court =>
        court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.surface.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleCourtPress = useCallback(
    (court: Court) => {
      navigation.navigate('CourtDetail', { court });
    },
    [navigation],
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }

    return stars.join('');
  };

  const renderCourtCard = ({ item: court }: { item: Court }) => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        style={styles.courtCard}
        onPress={() => handleCourtPress(court)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: court.image }} style={styles.courtImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.courtName} numberOfLines={1}>
              {court.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{court.rating}</Text>
              <Text style={styles.stars}>{renderStarRating(court.rating)}</Text>
            </View>
          </View>

          <Text style={styles.courtLocation} numberOfLines={1}>
            📍 {court.location}, {court.city}, {court.state}
          </Text>

          <View style={styles.courtDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Surface</Text>
              <Text style={styles.detailValue}>{court.surface}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>
                {court.indoor ? 'Indoor' : 'Outdoor'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Lights</Text>
              <Text style={styles.detailValue}>
                {court.lights ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.priceText}>${court.price}/hour</Text>
            <Text style={styles.reviewCount}>{court.reviewCount} reviews</Text>
          </View>

          <View style={styles.amenitiesContainer}>
            {court.amenities.slice(0, 3).map((amenity, index) => (
              <View key={index} style={styles.amenityTag}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
            {court.amenities.length > 3 && (
              <Text style={styles.moreAmenities}>
                +{court.amenities.length - 3} more
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No courts found</Text>
      <Text style={styles.emptyStateSubtitle}>
        Try adjusting your search terms
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search courts, locations, surfaces..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredCourts.length} court{filteredCourts.length !== 1 ? 's' : ''}{' '}
          found
        </Text>
        <Text style={styles.resultsSubtext}>
          {searchQuery ? `for "${searchQuery}"` : 'near you'}
        </Text>
      </View>

      <FlatList
        data={filteredCourts}
        renderItem={renderCourtCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#2E7D32"
            colors={['#2E7D32']}
          />
        }
        ListEmptyComponent={renderEmptyState}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  resultsCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultsSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  courtCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  courtImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courtName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  stars: {
    fontSize: 14,
    color: '#FFD700',
    marginTop: 2,
  },
  courtLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  courtDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  amenityTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  amenityText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  moreAmenities: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default CourtListScreen;
