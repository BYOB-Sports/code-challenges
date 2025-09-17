import React, { useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useCourts } from "../lib/store/courts";
import SearchBar from "../components/SearchBar";
import CourtCard from "../components/CourtCard";
import EmptyState from "../components/EmptyState";

export default function CourtsList() {
  const setQuery = useCourts((s) => s.setQuery);
  const filtered = useCourts((s) => s.filtered());
  const clear = useCallback(() => setQuery(""), [setQuery]);

  return (
    <View style={styles.container}>
      <SearchBar onChange={setQuery} />
      {filtered.length === 0 ? (
        <EmptyState onClear={clear} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourtCard
              name={item.name}
              city={item.city}
              surface={item.surface}
              indoor={item.indoor}
              lights={item.lights}
              rating={item.rating}
              onPress={() => router.push(`/court/${item.id}`)}
            />
          )}
          initialNumToRender={12}
          windowSize={5}
          removeClippedSubviews
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
});
