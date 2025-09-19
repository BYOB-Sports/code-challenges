import React from 'react';
import { View, Text } from 'react-native';
import Rating from './Rating';

export function AmenityChip({ label }: { label: string }) {
  return (
    <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: '#eef', marginRight: 6 }}>
      <Text style={{ fontSize: 12, color: '#334' }}>{label}</Text>
    </View>
  );
}

export default function CourtCard({
  name, city, state, surface, lights, indoor, avgRating, reviewsCount,
}: Readonly<{
  name: string; city: string; state: string; surface: string; lights: boolean; indoor: boolean;
  avgRating: number; reviewsCount: number;
}>) {
  return (
    <View style={{ padding: 12, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#eee' }}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>{name}</Text>
      <Text style={{ color: '#666', marginTop: 2 }}>{city}, {state} • {surface}</Text>
      <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
        <Rating value={avgRating || 0} count={reviewsCount || 0} />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {lights && <AmenityChip label="Lights" />}
        {indoor && <AmenityChip label="Indoor" />}
      </View>
    </View>
  );
}
