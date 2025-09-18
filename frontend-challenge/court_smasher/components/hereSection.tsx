import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const HeroSection = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/hero-court.jpg')} // Replace with your image URL
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Gradient overlay */}
                <View style={styles.gradientOverlay} />

                {/* Content */}
                <View style={styles.contentContainer}>
                    <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
                        <Text style={styles.title}>Find Your Perfect Court</Text>
                        <Text style={styles.subtitle}>
                            Discover and review tennis courts near you
                        </Text>
                    </Animated.View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 256, // equivalent to h-64 (64 * 4 = 256px)
        overflow: 'hidden',
        width: '100%',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Simulates gradient from black/40 to black/60
        // For a more accurate gradient, you could use react-native-linear-gradient
    },
    contentContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 16, // equivalent to px-4
    },
    title: {
        fontSize: 25, // equivalent to text-3xl
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8, // equivalent to mb-2
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15, // equivalent to text-lg
        color: 'white',
        opacity: 0.9,
        textAlign: 'center',
    },
});

export default HeroSection;