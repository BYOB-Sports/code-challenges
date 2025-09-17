import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { allTennisCourts, TennisCourt } from '../data/mockData';

type RootStackParamList = {
  CourtList: undefined;
  CourtDetail: { court: TennisCourt };
};

type CourtListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CourtList'>;

interface Props {
  navigation: CourtListScreenNavigationProp;
}

const CourtListScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allTennisCourts;
    }
    
    const query = searchQuery.toLowerCase();
    return allTennisCourts.filter(court => 
      court.name.toLowerCase().includes(query) ||
      court.city.toLowerCase().includes(query) ||
      court.state.toLowerCase().includes(query) ||
      court.surface.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={14} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={14} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={14} color="#E0E0E0" />
      );
    }

    return stars;
  };

  const renderCourtCard = ({ item }: { item: TennisCourt }) => (
    <TouchableOpacity
      style={styles.courtCard}
      onPress={() => navigation.navigate('CourtDetail', { court: item })}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.courtImage}
        onError={() => console.log('Image failed to load:', item.image)}
      />
      <View style={styles.courtInfo}>
        <Text style={styles.courtName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.courtLocation} numberOfLines={1}>
          {item.city}, {item.state}
        </Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {renderStarRating(item.rating)}
          </View>
          <Text style={styles.ratingText}>
            {item.rating} ({item.reviewCount} reviews)
          </Text>
        </View>
        
        <View style={styles.courtSpecs}>
          <View style={styles.specItem}>
            <Ionicons 
              name={item.indoor ? "home" : "sunny"} 
              size={14} 
              color="#666" 
            />
            <Text style={styles.specText}>
              {item.indoor ? 'Indoor' : 'Outdoor'}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="tennisball" size={14} color="#666" />
            <Text style={styles.specText}>{item.surface}</Text>
          </View>
          {item.lights && (
            <View style={styles.specItem}>
              <Ionicons name="bulb" size={14} color="#666" />
              <Text style={styles.specText}>Lights</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.priceText}>
          ${item.pricePerHour}/hour
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tennis Courts</Text>
        <Text style={styles.headerSubtitle}>Discover amazing places to play</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courts, cities, or surfaces..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {searchQuery ? 
            `${filteredCourts.length} court${filteredCourts.length !== 1 ? 's' : ''} found` :
            `Discover ${allTennisCourts.length} tennis courts`
          }
        </Text>
        {!searchQuery && (
          <Text style={styles.welcomeText}>
            Find the perfect court for your next game
          </Text>
        )}
      </View>

      <FlatList
        data={filteredCourts}
        renderItem={renderCourtCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No courts found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search terms
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginLeft: 8,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    padding: 20,
  },
  courtCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  courtImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  courtInfo: {
    padding: 16,
  },
  courtName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  courtLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  courtSpecs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    fontSize: 12,
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});

export default CourtListScreen;