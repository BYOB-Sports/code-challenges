import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getCourtById } from '@/data/court';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CourtDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const court = getCourtById(id);

    if (!court) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundTitle}>Court Not Found</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Back to Courts</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderAmenityIcon = (amenity: any) => {
        switch (amenity) {
            case "Parking":
                return <FontAwesome5 name="car" size={16} color="#666" />
            case "Lighting":
                return <FontAwesome5 name="clock" size={16} color="#666" />;
            case "Equipment Rental":
                return <FontAwesome5 name="wifi" size={15} color="#666" />;
            default:
                return null;
        }
    };
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const renderStars = (rating: any) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <FontAwesome key={index} name="star" size={14} color="#FFD700" />
        ));
    };


    const insets = useSafeAreaInsets();

    useEffect(() => {
        console.log(court, 'HEYYYYYYYYYY')
    }, [court])


    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <FontAwesome5 name="arrow-alt-circle-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>
                    {court.name}
                </Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Court Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: court.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.surfaceBadge}>
                        <Text style={styles.surfaceText}>{court.surface} Court</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Court Info */}
                    <View style={styles.card}>
                        <Text style={styles.courtName}>{court.name}</Text>

                        <View style={styles.locationRow}>
                            <FontAwesome5 name="map-pin" size={20} color="#666" />
                            <Text style={styles.locationText}>{court.location}</Text>
                        </View>

                        <View style={styles.ratingPriceRow}>
                            <View style={styles.ratingContainer}>
                                <View style={styles.ratingSubContainer}>
                                    <FontAwesome name="star" size={22} color="#FFD700" />
                                    <Text style={styles.ratingText}>{court.rating}</Text>
                                </View>
                                <Text style={styles.reviewCountText}>
                                    ({court.reviewCount} review{court.reviewCount !== 1 ? 's' : ''})
                                </Text>
                            </View>

                            <View style={styles.priceContainer}>
                                <FontAwesome5 name="dollar-sign" size={17} color="#2563eb" />
                                <Text style={styles.priceText}>{court.pricePerHour}/hr</Text>
                            </View>
                        </View>

                        <Text style={styles.description}>{court.description}</Text>

                        <View style={styles.amenitiesSection}>
                            <Text style={styles.sectionTitle}>Amenities</Text>
                            <View style={styles.amenitiesContainer}>
                                {court.amenities.map((amenity) => (
                                    <View key={amenity} style={styles.amenityBadge}>
                                        {renderAmenityIcon(amenity)}
                                        <Text style={styles.amenityText}>{amenity}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Book Now Button */}
                    <TouchableOpacity style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>Book This Court</Text>
                    </TouchableOpacity>
                </View>

                {/* Reviews Section */}
                <View style={styles.reviewsSection}>
                    <Text style={styles.sectionTitle}>Reviews</Text>

                    {court.reviews && court.reviews.length === 0 ? (
                        <View style={styles.noReviewsContainer}>
                            <Text style={styles.noReviewsText}>This court has no reviews yet</Text>
                            <Text style={styles.noReviewsSubtext}>Be the first to share your experience!</Text>
                        </View>
                    ) : (
                        <View style={styles.reviewsList}>
                            {court.reviews.map((review) => (
                                <View key={review.id} style={styles.reviewCard}>
                                    <View style={styles.reviewHeader}>
                                        <View style={styles.reviewerInfo}>
                                            <View style={styles.avatar}>
                                                <FontAwesome name="user" size={16} color="#666" />
                                            </View>
                                            <Text style={styles.reviewerName}>{review.author}</Text>
                                        </View>
                                        <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
                                    </View>

                                    <View style={styles.ratingStars}>
                                        {renderStars(review.rating)}
                                    </View>

                                    <Text style={styles.reviewComment}>{review.comment}</Text>
                                </View>
                            ))}
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
    notFoundContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    notFoundTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1f2937',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 4,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        position: 'relative',
        height: 250,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    surfaceBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    surfaceText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    content: {
        padding: 16,
        gap: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    courtName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#666',
    },
    ratingPriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    ratingText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginLeft: 2,
    },
    reviewCountText: {
        fontSize: 14,
        color: '#666',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2563eb',
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 16,
    },
    amenitiesSection: {
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 12,
    },
    amenitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    amenityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        gap: 4,
    },
    amenityText: {
        fontSize: 12,
        color: '#666',
    },
    bookButton: {
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    reviewsSection: {
        marginTop: 8,
        padding: 8
    },
    noReviewsContainer: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
    },
    noReviewsText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 4,
    },
    noReviewsSubtext: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
    reviewsList: {
        gap: 16,
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    reviewerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1f2937',
    },
    reviewDate: {
        fontSize: 12,
        color: '#6b7280',
    },
    ratingStars: {
        flexDirection: 'row',
        gap: 2,
        marginBottom: 12,
    },
    reviewComment: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
});