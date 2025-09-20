import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CourtCard } from "../components/CourtCard";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import type { Court } from "../types/court";
import courtsData from "../assets/tennis_courts_mock.json";
import { useRouter } from "expo-router";

const ITEMS_PER_PAGE = 8;
const AIRBNB_RED = "#FF5A5F";

export default function CourtsListScreen() {
  const [allCourts, setAllCourts] = useState<Court[]>([]);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const courts = courtsData.courts as Court[];
      setAllCourts(courts);
      setFilteredCourts(courts);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    const filtered = allCourts.filter(
      (court) =>
        court.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.location?.address
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setFilteredCourts(filtered);
    setCurrentPage(1);
  }, [searchQuery, allCourts]);

  const totalPages = Math.ceil(filteredCourts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCourts = filteredCourts.slice(startIndex, endIndex);

  const handleCourtPress = (court: Court) => {
    router.push({
      pathname: `/courts/[id]`,
      params: { id: court.id.toString() },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={AIRBNB_RED} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        <FlatList
          data={currentCourts}
          renderItem={({ item }) => (
            <CourtCard court={item} onPress={handleCourtPress} />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  list: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 16,
  },
});
