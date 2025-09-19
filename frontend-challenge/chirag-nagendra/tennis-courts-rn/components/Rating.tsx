import React from 'react';
import { View, Text } from 'react-native';

export default function Rating({ value, count }: { readonly value: number; readonly count?: number }) {
  const full = Math.round(value);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text accessible accessibilityLabel={`Rating ${value} out of 5`} style={{ fontSize: 14 }}>
        {'★'.repeat(full)}{'☆'.repeat(5 - full)} {value.toFixed(1)}
      </Text>
      {typeof count === 'number' && <Text style={{ marginLeft: 6, color: '#666' }}>({count})</Text>}
    </View>
  );
}
