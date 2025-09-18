import React, { useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../context/AppContext";
import { SortKey, Court } from "../types";
import { SURFACES } from "../data/mock";
import Badge from "../components/Badge";
import RatingStars from "../components/RatingStars";
import Segmented from "../components/Segmented";
import PillToggle from "../components/PillToggle";
import { colors, spacing } from "../theme/theme";

type SurfaceFilter = "All" | (typeof SURFACES)[number];

export default function List() {
  const { courts, setNav } = useApp();
  const [q, setQ] = useState("");
  const [surface, setSurface] = useState<SurfaceFilter>("All");
  const [sort, setSort] = useState<SortKey>("best");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let res = courts.filter((c) => {
      const inText =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.city.toLowerCase().includes(query) ||
        c.surface.toLowerCase().includes(query);
      const surfaceOk = surface === "All" || c.surface === surface;
      return inText && surfaceOk;
    });

    switch (sort) {
      case "best":
        res = res.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "mostRecent":
        res = res.slice().sort((a, b) => {
          const aLatest = a.reviews[0]?.createdAt ?? 0;
          const bLatest = b.reviews[0]?.createdAt ?? 0;
          return bLatest - aLatest;
        });
        break;
      case "name":
        res = res.slice().sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return res;
  }, [courts, q, surface, sort]);

  const renderItem = useCallback(
    ({ item }: { item: Court }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() => setNav({ route: "detail", courtId: item.id })}
        accessibilityRole="button"
      >
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Badge>{item.surface}</Badge>
        </View>
        <Text style={styles.cardSub}>{item.city}</Text>
        <View style={styles.cardMetaRow}>
          <RatingStars rating={item.rating} />
          <Text style={styles.cardMeta}>{item.reviews.length} reviews</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.cardMeta}>{item.courts} courts</Text>
        </View>
      </TouchableOpacity>
    ),
    [setNav]
  );

  const sortOptions = [
    { key: "best", label: "Best Rated" },
    { key: "mostRecent", label: "Most Recent" },
    { key: "name", label: "Name" },
  ] as const;

  return (
    <View style={styles.wrap}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Text style={styles.headerTitle}>Tennis Courts</Text>
      </SafeAreaView>

      <View style={styles.searchRow}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search by name, city, or surface…"
          placeholderTextColor="#98a2b3"
          style={styles.input}
          clearButtonMode="while-editing"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.filtersRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          <Segmented<SurfaceFilter> options={["All", ...SURFACES]} value={surface} onChange={(v) => setSurface(v)} />
        </ScrollView>
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort:</Text>
        <View style={styles.sortPills}>
          <PillToggle<SortKey> options={sortOptions} value={sort} onChange={setSort} />
        </View>
        <Text style={styles.countLabel}>{filtered.length} found</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listPad}
        initialNumToRender={12}
        windowSize={10}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.bgRoot,
  },
  headerTitle: { color: colors.text, fontSize: 20, fontWeight: "700" },
  searchRow: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  input: {
    backgroundColor: colors.inputBg,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    fontSize: 16,
  },
  filtersRow: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  filtersScroll: { paddingRight: spacing.lg },
  sortRow: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    rowGap: 8,
    columnGap: 10,
  },
  sortLabel: { color: "#cbd5e1" },
  sortPills: { flexDirection: "row", flexShrink: 1, minWidth: 0 },
  countLabel: { color: colors.textFaint, marginLeft: "auto", paddingLeft: 6 },
  listPad: { paddingHorizontal: 12, paddingVertical: 8 },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    marginVertical: 6,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  cardTitle: { flex: 1, color: colors.text, fontSize: 16, fontWeight: "700" },
  cardSub: { color: colors.textMuted, marginTop: 4 },
  cardMetaRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 },
  cardMeta: { color: colors.textMuted },
  dot: { color: "#415b86" },
});
