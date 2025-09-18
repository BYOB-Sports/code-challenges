import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchAndFilter = ({ onSearch, onFilter, activeFilters }: { onSearch: any, onFilter: any, activeFilters: any }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [tempFilters, setTempFilters] = useState(activeFilters);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        onSearch(text);
    };

    const handleApplyFilters = () => {
        onFilter(tempFilters);
        setShowFilterModal(false);
    };

    const handleResetFilters = () => {
        const resetFilters = {
            surface: '',
            priceRange: { min: 0, max: 200 },
            minRating: 0,
            location: '',
        };
        setTempFilters(resetFilters);
        onFilter(resetFilters);
        setShowFilterModal(false);
    };

    const surfaces = ['Hard', 'Clay', 'Grass'];
    const ratings = [4.5, 4.0, 3.5, 3.0];
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search courts by name..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="#999"
                />
            </View>

            {/* Filter Button */}
            <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setShowFilterModal(true)}
            >
                <Ionicons name="filter" size={20} color="#2563eb" />
                <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>

            {/* Filter Modal */}
            <Modal
                visible={showFilterModal}
                animationType="slide"
                transparent={false}
                onRequestClose={() => setShowFilterModal(false)}
            >
                <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Filter Courts</Text>
                        <TouchableOpacity onPress={handleApplyFilters}>
                            <Text style={styles.applyText}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.modalContent}>
                        {/* Surface Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Court Surface</Text>
                            <View style={styles.optionsContainer}>
                                {surfaces.map((surface) => (
                                    <TouchableOpacity
                                        key={surface}
                                        style={[
                                            styles.option,
                                            tempFilters.surface === surface && styles.selectedOption,
                                        ]}
                                        onPress={() =>
                                            setTempFilters({
                                                ...tempFilters,
                                                surface: tempFilters.surface === surface ? '' : surface,
                                            })
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                tempFilters.surface === surface && styles.selectedOptionText,
                                            ]}
                                        >
                                            {surface}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Rating Filter */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Minimum Rating</Text>
                            <View style={styles.optionsContainer}>
                                {ratings.map((rating) => (
                                    <TouchableOpacity
                                        key={rating}
                                        style={[
                                            styles.option,
                                            tempFilters.minRating === rating && styles.selectedOption,
                                        ]}
                                        onPress={() =>
                                            setTempFilters({
                                                ...tempFilters,
                                                minRating: tempFilters.minRating === rating ? 0 : rating,
                                            })
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                tempFilters.minRating === rating && styles.selectedOptionText,
                                            ]}
                                        >
                                            {rating}+ ⭐
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Price Range */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterLabel}>Price Range (per hour)</Text>
                            <View style={styles.priceContainer}>
                                <View style={styles.priceInputContainer}>
                                    <Text style={styles.priceLabel}>Min: $</Text>
                                    <TextInput
                                        style={styles.priceInput}
                                        value={tempFilters.priceRange.min.toString()}
                                        onChangeText={(text) =>
                                            setTempFilters({
                                                ...tempFilters,
                                                priceRange: {
                                                    ...tempFilters.priceRange,
                                                    min: parseInt(text) || 0,
                                                },
                                            })
                                        }
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={styles.priceInputContainer}>
                                    <Text style={styles.priceLabel}>Max: $</Text>
                                    <TextInput
                                        style={styles.priceInput}
                                        value={tempFilters.priceRange.max.toString()}
                                        onChangeText={(text) =>
                                            setTempFilters({
                                                ...tempFilters,
                                                priceRange: {
                                                    ...tempFilters.priceRange,
                                                    max: parseInt(text) || 200,
                                                },
                                            })
                                        }
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Reset Filters */}
                        <TouchableOpacity style={styles.resetButton} onPress={handleResetFilters}>
                            <Text style={styles.resetText}>Reset All Filters</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        gap: 4,
    },
    filterText: {
        color: '#2563eb',
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    cancelText: {
        color: '#666',
        fontSize: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    applyText: {
        color: '#2563eb',
        fontSize: 16,
        fontWeight: '600',
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    filterSection: {
        marginBottom: 24,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    selectedOption: {
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
    },
    optionText: {
        color: '#666',
        fontSize: 14,
    },
    selectedOptionText: {
        color: '#fff',
    },
    priceContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    priceInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
    },
    priceLabel: {
        color: '#666',
        fontSize: 14,
    },
    priceInput: {
        flex: 1,
        marginLeft: 4,
        fontSize: 14,
        color: '#333',
    },
    resetButton: {
        backgroundColor: '#f87171',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    resetText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default SearchAndFilter;