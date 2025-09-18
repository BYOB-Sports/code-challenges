// components/CourtCard.js
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';


const CourtCard = ({ court, onPress }: { court: any, onPress: any }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress(court)}
            activeOpacity={0.7}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: court.image }}
                    defaultSource={require("../assets/images/grass-court.jpg")} // iOS only
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.surfaceBadge}>
                    <Text style={styles.surfaceText}>{court.surface}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={2}>{court.name}</Text>

                <View style={styles.locationRow}>
                    <MaterialIcons name="location-on" size={14} color="#666" />
                    <Text style={styles.location} numberOfLines={1}>{court.location}</Text>
                </View>

                <View style={styles.ratingRow}>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={styles.rating}>{court.rating}</Text>
                    </View>
                    <Text style={styles.reviewCount}>({court.reviewCount})</Text>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>${court.pricePerHour}</Text>
                    <Text style={styles.priceUnit}>/hr</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 16,
    },
    imageContainer: {
        position: 'relative',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    surfaceBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    surfaceText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#333',
    },
    content: {
        padding: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 6,
        lineHeight: 18,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    location: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
        flex: 1,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 6,
    },
    rating: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1a1a1a',
        marginLeft: 2,
    },
    reviewCount: {
        fontSize: 11,
        color: '#666',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2563eb',
    },
    priceUnit: {
        fontSize: 12,
        color: '#666',
        marginLeft: 2,
    },
});

export default CourtCard;