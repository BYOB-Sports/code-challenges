import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import type { Court, CourtsFilter, RootStackParamList } from '@/types';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';

type CourtsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CourtsList'
>;

type CourtsListScreenRouteProp = RouteProp<RootStackParamList, 'CourtsList'>;

interface Props {
  navigation: CourtsListScreenNavigationProp;
  route: CourtsListScreenRouteProp;
}

const CourtsListScreen: React.FC<Props> = ({ navigation }) => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter] = useState<CourtsFilter>({});

  // Mock data for demonstration - replace with actual API call
  const mockCourts: Court[] = [
    {
      id: '1',
      name: 'Royal Tennis Club',
      location: 'Downtown',
      surface: 'clay',
      indoor: false,
      pricePerHour: 50,
      rating: 4.5,
      imageUrl: 'https://example.com/court1.jpg',
      description: 'Premium clay court with professional lighting',
      amenities: ['Parking', 'Lockers', 'Showers'],
      availability: [],
    },
    {
      id: '2',
      name: 'Elite Sports Center',
      location: 'Uptown',
      surface: 'hard',
      indoor: true,
      pricePerHour: 75,
      rating: 4.8,
      imageUrl: 'https://example.com/court2.jpg',
      description: 'State-of-the-art indoor hard court',
      amenities: ['AC', 'Parking', 'Pro Shop'],
      availability: [],
    },
  ];

  useEffect(() => {
    loadCourts();
  }, [filter]);

  const loadCourts = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCourts(mockCourts);
    } catch (error) {
      Alert.alert('Error', 'Failed to load courts');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCourts();
    setRefreshing(false);
  };

  const handleCourtPress = (courtId: string) => {
    navigation.navigate('CourtDetail', { courtId });
  };

  const renderCourtItem = ({ item }: { item: Court }) => (
    <TouchableOpacity
      style={styles.courtCard}
      onPress={() => handleCourtPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.courtInfo}>
        <Text style={styles.courtName}>{item.name}</Text>
        <Text style={styles.courtLocation}>{item.location}</Text>
        <View style={styles.courtDetails}>
          <Text style={styles.surface}>{item.surface.toUpperCase()}</Text>
          <Text style={styles.indoor}>
            {item.indoor ? 'Indoor' : 'Outdoor'}
          </Text>
          <Text style={styles.price}>${item.pricePerHour}/hr</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading courts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tennis Courts</Text>
      <FlatList
        data={courts}
        renderItem={renderCourtItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  courtCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    elevation: 5,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  courtDetails: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  courtInfo: {
    flex: 1,
  },
  courtLocation: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginBottom: SPACING.sm,
  },
  courtName: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.xs,
  },
  indoor: {
    backgroundColor: `${COLORS.secondary}20`,
    borderRadius: 6,
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  listContent: {
    padding: SPACING.md,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    marginTop: SPACING.md,
  },
  price: {
    color: COLORS.success,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  rating: {
    color: COLORS.warning,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  surface: {
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: 6,
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  title: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.bold,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
});

export default CourtsListScreen;
