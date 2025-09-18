import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';

import HeroSection from '../components/hereSection';
import CourtCard from '../components/courtCard';
import SearchAndFilter from '../components/searchFilter';
import { allCourts, searchCourts } from '../data/court';

const ITEMS_PER_PAGE = 8;

export default function Index() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourts, setFilteredCourts] = useState<any | null>([]);
    const [displayedCourts, setDisplayedCourts] = useState<any | null>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        surface: '',
        priceRange: { min: 0, max: 200 },
        minRating: 0,
        location: '',
    });

    // Apply search and filters
    const applySearchAndFilters = (query: string, currentFilters: any) => {
        let results = searchCourts(query);

        // Apply surface filter
        if (currentFilters.surface) {
            results = results.filter(court => court.surface === currentFilters.surface);
        }

        // Apply price range filter
        results = results.filter(court =>
            court.pricePerHour >= currentFilters.priceRange.min &&
            court.pricePerHour <= currentFilters.priceRange.max
        );

        // Apply rating filter
        if (currentFilters.minRating > 0) {
            results = results.filter(court => court.rating >= currentFilters.minRating);
        }

        return results;
    };

    // Update courts when search or filters change
    useEffect(() => {
        const results = applySearchAndFilters(searchQuery, filters);
        setFilteredCourts(results);
        setCurrentPage(1); // Reset to first page
        setDisplayedCourts(results.slice(0, ITEMS_PER_PAGE));
    }, [searchQuery, filters]);

    // Handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Handle filters
    const handleFilter = (newFilters: any) => {
        setFilters(newFilters);
    };

    // Handle load more
    const handleLoadMore = () => {
        if (loading) return;

        setLoading(true);

        // Simulate loading delay for better UX
        setTimeout(() => {
            const nextPage = currentPage + 1;
            const startIndex = 0;
            const endIndex = nextPage * ITEMS_PER_PAGE;
            const newDisplayedCourts = filteredCourts.slice(startIndex, endIndex);

            setDisplayedCourts(newDisplayedCourts);
            setCurrentPage(nextPage);
            setLoading(false);
        }, 500);
    };

    // Handle court press
    const handleCourtPress = (court: { id: string | number }) => {
        console.log('Court pressed')
        router.push({
            pathname: "/court/[id]",
            params: { id: String(court.id) },
        } satisfies Href);
    };

    // Check if there are more items to load
    const hasMore = displayedCourts.length < filteredCourts.length;

    // Get popular courts (top rated courts for simplicity)
    const popularCourts = allCourts
        .filter(court => court.rating >= 4.7)
        .slice(0, 6);

    // Helper function to check if any filters are active
    const hasActiveFilters = () => {
        return filters.surface !== '' ||
            filters.minRating > 0 ||
            filters.priceRange.min > 0 ||
            filters.priceRange.max < 200;
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar style="light" />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <HeroSection />

                {/* Search and Filter Section */}
                <View style={styles.searchSection}>
                    <Text style={styles.sectionTitle}>Find Your Perfect Court</Text>
                    <SearchAndFilter
                        onSearch={handleSearch}
                        onFilter={handleFilter}
                        activeFilters={filters}
                    />
                </View>

                {/* Popular Courts Section */}
                <View style={styles.content}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Popular Courts</Text>
                        <Text style={styles.sectionSubtitle}>
                            Highly rated courts you'll love
                        </Text>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalScroll}
                    >
                        {popularCourts.map((court) => (
                            <View key={court.id} style={styles.popularCard}>
                                <CourtCard court={court} onPress={() => handleCourtPress(court)} />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* All Courts Section */}
                <View style={styles.content}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {searchQuery || hasActiveFilters()
                                ? `Search Results (${filteredCourts.length})`
                                : 'All Courts'
                            }
                        </Text>
                        {!searchQuery && !hasActiveFilters() && (
                            <Text style={styles.sectionSubtitle}>
                                Discover amazing courts near you
                            </Text>
                        )}
                    </View>

                    {/* Courts List */}
                    <View style={styles.courtsContainer}>
                        {displayedCourts.map((court: any, index: number) => (
                            <CourtCard
                                key={`${court.id}-${index}`}
                                court={court}
                                onPress={() => handleCourtPress(court)}
                            />
                        ))}
                    </View>

                    {/* Load More Button */}
                    {hasMore && (
                        <TouchableOpacity
                            style={styles.loadMoreButton}
                            onPress={handleLoadMore}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <>
                                    <Text style={styles.loadMoreText}>Show More Courts</Text>
                                    <Ionicons name="chevron-down" size={16} color="#fff" />
                                </>
                            )}
                        </TouchableOpacity>
                    )}

                    {/* No Results Message */}
                    {filteredCourts.length === 0 && (searchQuery || hasActiveFilters()) && (
                        <View style={styles.noResultsContainer}>
                            <Ionicons name="search" size={48} color="#ccc" />
                            <Text style={styles.noResultsTitle}>No courts found</Text>
                            <Text style={styles.noResultsText}>
                                Try adjusting your search or filter criteria
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    searchSection: {
        padding: 20,
        backgroundColor: '#f8fafc',
    },
    content: {
        padding: 20,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: '#6b7280',
    },
    horizontalScroll: {
        paddingRight: 20,
    },
    popularCard: {
        width: 280,
        marginRight: 16,
    },
    courtsContainer: {
        gap: 16,
    },
    loadMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginTop: 20,
        gap: 8,
    },
    loadMoreText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    noResultsContainer: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    noResultsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginTop: 16,
        marginBottom: 8,
    },
    noResultsText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
});