import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ query, setQuery }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search courts..."
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
