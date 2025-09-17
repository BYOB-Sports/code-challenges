import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import CustomText from "../components/CustomText";
import { fetchCourts, COURTS_PER_PAGE } from "../data/api";
import { Court } from "../types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "CourtsList">;
type CourtsQueryData = { courts: Court[]; total: number };

export default function CourtsList({ navigation }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery<CourtsQueryData, Error>({
    queryKey: ["courts", page, search],
    queryFn: () => fetchCourts(page, search),
    staleTime: 1000 * 60, // 1 minute cache, emulates keepPreviousData
  });

  const totalPages = data ? Math.ceil(data.total / COURTS_PER_PAGE) : 0;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search courts..."
        value={search}
        onChangeText={(text) => { setSearch(text); setPage(1); }}
      />

      {isLoading ? (
        <CustomText>Loading...</CustomText>
      ) : (
        <FlatList
          data={data?.courts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate("CourtDetails", { courtId: item.id })}
            >
              <CustomText style={styles.name}>{item.name}</CustomText>
              <CustomText style={styles.address}>{item.location.address}</CustomText>
              <CustomText style={styles.surface}>Surface: {item.details.surface}</CustomText>
              <CustomText>Status: {item.availability.status}</CustomText>
              <CustomText style={styles.fee}>Fee: {item.availability.fee}</CustomText>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.pagination}>
        <TouchableOpacity disabled={page === 1} onPress={() => setPage((p) => Math.max(p - 1, 1))} style={[styles.pageButton, page === 1 && styles.disabled]}>
          <CustomText>←</CustomText>
        </TouchableOpacity>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <TouchableOpacity key={p} onPress={() => setPage(p)} style={[styles.pageButton, p === page && styles.activePage]}>
            <CustomText style={p === page ? { color: "white" } : {}}>{p}</CustomText>
          </TouchableOpacity>
        ))}

        <TouchableOpacity disabled={page === totalPages} onPress={() => setPage((p) => Math.min(p + 1, totalPages))} style={[styles.pageButton, page === totalPages && styles.disabled]}>
          <CustomText>→</CustomText>
        </TouchableOpacity>
      </View>

      <CustomText style={styles.pageInfo}>Page {page} of {totalPages}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  search: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, marginBottom: 12, backgroundColor: "white" },
  item: { padding: 12, marginBottom: 8, backgroundColor: "white", borderRadius: 8 },
  name: { fontWeight: "700", fontSize: 18 },
  address: { color: "#555" },
  surface: { color: "#333", fontStyle: "italic", marginTop: 10 },
  pagination: { flexDirection: "row", justifyContent: "center", marginTop: 12, flexWrap: "wrap" },
  pageButton: { padding: 8, borderWidth: 1, borderColor: "#ccc", borderRadius: 6, margin: 2 },
  activePage: { backgroundColor: "#003619", borderColor: "#3b82f6" },
  disabled: { opacity: 0.5 },
  pageInfo: { textAlign: "center", marginTop: 8, color: "#555" },
  fee : { fontWeight: "700" }
});
