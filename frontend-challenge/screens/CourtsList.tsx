"use client";
import React, { useState, useMemo } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import courtsData from "../data/tennis_courts.json";

type Props = NativeStackScreenProps<RootStackParamList, "CourtsList">;
const COURTS_PER_PAGE = 10;

export default function CourtsList({ navigation }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourts = useMemo(
    () => courtsData.filter(court => court.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]
  );

  const totalPages = Math.ceil(filteredCourts.length / COURTS_PER_PAGE);
  const start = (currentPage - 1) * COURTS_PER_PAGE;
  const paginatedCourts = filteredCourts.slice(start, start + COURTS_PER_PAGE);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search courts..."
        value={searchTerm}
        onChangeText={(text) => { setSearchTerm(text); setCurrentPage(1); }}
      />

      <FlatList
        data={paginatedCourts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("CourtDetails", { courtId: item.id })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.location.address}</Text>
            <Text>Surface: {item.details.surface}</Text>
            <Text>Status: {item.availability.status}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
          style={[styles.pageButton, currentPage === 1 && styles.disabled]}
        >
          <Text>←</Text>
        </TouchableOpacity>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <TouchableOpacity
            key={page}
            onPress={() => setCurrentPage(page)}
            style={[styles.pageButton, page === currentPage && styles.activePage]}
          >
            <Text style={page === currentPage ? { color: "white" } : {}}>{page}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}
          style={[styles.pageButton, currentPage === totalPages && styles.disabled]}
        >
          <Text>→</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  search: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 12, backgroundColor: "white" },
  item: { backgroundColor: "white", padding: 12, marginBottom: 8, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, elevation: 2 },
  name: { fontWeight: "bold", fontSize: 16 },
  address: { color: "#555", marginBottom: 4 },
  pagination: { flexDirection: "row", justifyContent: "center", marginTop: 12, flexWrap: "wrap", gap: 4 },
  pageButton: { padding: 8, borderWidth: 1, borderColor: "#ccc", borderRadius: 6, margin: 2 },
  activePage: { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
  disabled: { opacity: 0.5 },
  pageInfo: { textAlign: "center", marginTop: 8, color: "#555" },
});
