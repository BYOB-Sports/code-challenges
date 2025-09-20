import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { CourtCard } from "../components/CourtCard";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import type { Court } from "../types/court";
import courtsData from "../assets/tennis_courts_mock.json";
import { useRouter } from "expo-router";

const ITEMS_PER_PAGE = 8;

export default function CourtsListScreen() {
  const [allCourts, setAllCourts] = useState<Court[]>([]);
  const [filteredCourts, setFilteredCourts] = useState<Court[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const courts = courtsData.courts as Court[];
    setAllCourts(courts);
    setFilteredCourts(courts);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        {/* <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {filteredCourts.length} court
            {filteredCourts.length !== 1 ? "s" : ""} found
          </Text>
        </View> */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 64,
  },
  header: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  resultsInfo: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    color: "#717171",
    fontWeight: "400",
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
