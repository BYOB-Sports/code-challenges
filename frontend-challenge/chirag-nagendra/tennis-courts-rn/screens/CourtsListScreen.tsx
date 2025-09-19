// screens/CourtsListScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { useCourtsStore } from '../store/useCourtsStore';
import CourtCard from '../components/CourtCard';
import { generateSeedData } from '../data/mock';

const SORTS: { key: 'rating'|'distance'|'name'; label: string }[] = [
  { key: 'rating', label: 'Top Rated' },
  { key: 'distance', label: 'Nearby' },
  { key: 'name', label: 'Name' },
];

const ORIGIN = { lat: 37.7749, lng: -122.4194 };

export default function CourtsListScreen() {
  const router = useRouter();

  // Subscribe to concrete slices so renders happen on updates
  const courts = useCourtsStore(s => s.courts);
  const query = useCourtsStore(s => s.query);
  const sortBy = useCourtsStore(s => s.sortBy);
  const setQuery = useCourtsStore(s => s.setQuery);
  const setSortBy = useCourtsStore(s => s.setSortBy);
  const bootstrap = useCourtsStore(s => s.bootstrap);

  const [refreshing, setRefreshing] = useState(false);

  // Pure derived list from subscribed slices
  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? courts.filter(c =>
          c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
        )
      : courts.slice();

    if (sortBy === 'rating') list.sort((a,b) => b.avgRating - a.avgRating || b.reviewsCount - a.reviewsCount);
    if (sortBy === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
    if (sortBy === 'distance') {
      const d = (c: any) => Math.hypot(c.lat - ORIGIN.lat, c.lng - ORIGIN.lng);
      list.sort((a,b) => d(a) - d(b));
    }
    return list;
  }, [courts, query, sortBy]);

  const onRefresh = () => {
    setRefreshing(true);
    const { courts: nextCourts, reviews } = generateSeedData(100);
    bootstrap(nextCourts, reviews);
    setTimeout(() => setRefreshing(false), 400);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7', paddingTop: 12 }}>
      <View style={{ paddingHorizontal: 12 }}>
        <TextInput
          placeholder="Search courts or cities"
          value={query}
          onChangeText={setQuery}
          style={{
            backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 12, height: 44, borderWidth: 1, borderColor: '#eee',
          }}
          returnKeyType="search"
        />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          {SORTS.map(s => (
            <TouchableOpacity
              key={s.key}
              onPress={() => setSortBy(s.key)}
              style={{
                paddingHorizontal: 12, height: 36, borderRadius: 18, justifyContent: 'center', marginRight: 8,
                backgroundColor: sortBy === s.key ? '#335CFF' : 'white',
                borderWidth: 1, borderColor: sortBy === s.key ? '#335CFF' : '#eee',
              }}
            >
              <Text style={{ color: sortBy === s.key ? 'white' : '#334', fontWeight: '600' }}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/court/${item.id}`)} activeOpacity={0.7}>
            <CourtCard
              name={item.name}
              city={item.city}
              state={item.state}
              surface={item.surface}
              lights={item.lights}
              indoor={item.indoor}
              avgRating={item.avgRating}
              reviewsCount={item.reviewsCount}
            />
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text>No courts match that search.</Text>
          </View>
        }
      />
    </View>
  );
}
