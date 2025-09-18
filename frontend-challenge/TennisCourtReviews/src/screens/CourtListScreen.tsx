import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { CourtListScreenProps, TennisCourt } from '../types';
import { mockCourts } from '../data/mockData';

const { width } = Dimensions.get('window');

const CourtListScreen: React.FC<CourtListScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSurface, setSelectedSurface] = useState<string>('All');

  const surfaces = ['All', 'Hard', 'Clay', 'Grass', 'Indoor Hard', 'Artificial Grass'];

  const filteredCourts = useMemo(() => {
    return mockCourts.filter(court => {
      const matchesSearch = 
        court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.amenities.some(amenity => 
          amenity.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesSurface = selectedSurface === 'All' || court.surface === selectedSurface;
      
      return matchesSearch && matchesSurface;
    });
  }, [searchQuery, selectedSurface]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Text key={i} style={styles.star}>★</Text>);
    }
    
    if (hasHalfStar) {
      stars.push(<Text key="half" style={styles.star}>☆</Text>);
    }

    return stars;
  };

  const renderCourtCard = ({ item }: { item: TennisCourt }) => (
    <TouchableOpacity
      style={styles.courtCard}
      onPress={() => navigation.navigate('CourtDetail', { courtId: item.id })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.images[0] }} style={styles.courtImage} />
      <View style={styles.cardContent}>
        <Text style={styles.courtName}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.ratingRow}>
          <View style={styles.starsContainer}>
            {renderStars(item.rating)}
          </View>
          <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount} reviews)</Text>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.surfaceTag}>
            <Text style={styles.surfaceText}>{item.surface}</Text>
          </View>
          <Text style={styles.price}>${item.pricePerHour}/hr</Text>
        </View>
        <Text style={styles.amenities} numberOfLines={1}>
          {item.amenities.slice(0, 3).join(' • ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSurfaceFilter = () => (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={surfaces}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedSurface === item && styles.activeFilter
            ]}
            onPress={() => setSelectedSurface(item)}
          >
            <Text style={[
              styles.filterText,
              selectedSurface === item && styles.activeFilterText
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search courts, locations, amenities..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>
      
      {renderSurfaceFilter()}
      
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredCourts.length} courts found
        </Text>
      </View>

      <FlatList
        data={filteredCourts}
        keyExtractor={(item) => item.id}
        renderItem={renderCourtCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  filterContainer: {
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginLeft: 16,
  },
  activeFilter: {
    backgroundColor: '#2E7D4F',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  courtCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courtImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  cardContent: {
    padding: 16,
  },
  courtName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    color: '#FFD700',
    fontSize: 16,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  surfaceTag: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  surfaceText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D4F',
  },
  amenities: {
    fontSize: 14,
    color: '#666',
  },
});

export default CourtListScreen;
