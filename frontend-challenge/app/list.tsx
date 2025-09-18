import { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import courts from "../data/courts";
import CourtCard from "../components/CourtCard";

const { width } = Dimensions.get("window");
const CARD_SIZE = (width - 60) / 3; // 3 per row, with spacing

export default function ListScreen() {
  const [search, setSearch] = useState("");

  const filtered = courts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Find your court"
        placeholderTextColor="#555"
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* 🎾 Courts Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        renderItem={({ item }) => (
          <CourtCard
            name={item.name}
            location={item.location}
            rating={item.rating}
            onPress={() => router.push(`/detail/${item.id}`)}
            size={CARD_SIZE}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  search: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 15,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});



