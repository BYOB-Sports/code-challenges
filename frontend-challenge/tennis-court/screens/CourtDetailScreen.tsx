import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  Modal,
  Dimensions,
  PanResponder,
} from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import ReviewScreen from "./ReviewScreen";
import type { Court } from "../types/court";

interface Props {
  court: Court;
  onBack: () => void;
}

export default function CourtDetailScreen({ court, onBack }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % court.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + court.images.length) % court.images.length
    );
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      const { dx } = gestureState;

      if (Math.abs(dx) > 50) {
        if (dx > 0) {
          prevImage();
        } else {
          nextImage();
        }
      }
    },
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <AntDesign
        key={i}
        name="star"
        size={12}
        color={i < rating ? "#FF385C" : "#E5E7EB"}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer} {...panResponder.panHandlers}>
        <Image
          source={{ uri: court.images[currentImageIndex] || "" }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.topControlsBlur}>
          <View style={styles.topControls}>
            <Pressable style={styles.circleButton} onPress={onBack}>
              <Feather name="arrow-left" size={18} color="#222" />
            </Pressable>
          </View>
        </View>

        <View style={styles.imageCounter}>
          <Text style={styles.counterText}>
            {currentImageIndex + 1} / {court.images.length}
          </Text>
        </View>
      </View>

      <View style={styles.contentCard}>
        <View style={styles.cardHandle} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          bounces={true}
        >
          <View style={styles.content}>
            <View style={styles.headerSection}>
              <Text style={styles.title}>{court.name}</Text>
              {court.location?.address && (
                <Text style={styles.subtitle}>{court.location.address}</Text>
              )}
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.ratingNumber}>
                  {court.average_rating.toFixed(1)}
                </Text>
                <View style={styles.starsContainer}>
                  {renderStars(Math.round(court.average_rating))}
                </View>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <MaterialIcons name="emoji-events" size={18} color="#FF385C" />
                <Text style={styles.badgeText}>Guest Favorite</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Text style={styles.reviewCount}>{court.reviews.length}</Text>
                <Text style={styles.reviewLabel}>
                  Review{court.reviews.length !== 1 ? "s" : ""}
                </Text>
              </View>
            </View>

            <View style={styles.hostSection}>
              <View style={styles.hostInfo}>
                <View style={styles.hostAvatar}>
                  <MaterialIcons name="person" size={20} color="#717171" />
                </View>
                <View style={styles.hostDetails}>
                  <Text style={styles.hostTitle}>Premium Tennis Court</Text>
                  <Text style={styles.hostSubtitle}>
                    Professional-grade facility
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.amenitiesSection}>
              <View style={styles.amenityItem}>
                <MaterialIcons name="flash-on" size={20} color="#717171" />
                <Text style={styles.amenityText}>Professional lighting</Text>
              </View>

              <View style={styles.amenityItem}>
                <MaterialIcons name="sports-tennis" size={20} color="#717171" />
                <Text style={styles.amenityText}>Premium court surface</Text>
              </View>

              <View style={styles.amenityItem}>
                <MaterialIcons name="local-parking" size={20} color="#717171" />
                <Text style={styles.amenityText}>Free parking</Text>
              </View>
            </View>

            <View style={styles.reviewsSection}>
              <View style={styles.reviewsHeader}>
                <View style={styles.reviewsTitle}>
                  <View style={styles.reviewsRatingRow}>
                    <Text style={styles.reviewsRating}>
                      {court.average_rating.toFixed(1)}
                    </Text>
                    <View style={styles.reviewsStarsContainer}>
                      {renderStars(Math.round(court.average_rating))}
                    </View>
                  </View>
                  <Text style={styles.reviewsCount}>
                    {court.reviews.length} review
                    {court.reviews.length !== 1 ? "s" : ""}
                  </Text>
                </View>
              </View>

              <View style={styles.reviewsList}>
                {court.reviews.slice(0, 2).map((review, index) => (
                  <View key={index} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewerAvatar}>
                        <Text style={styles.reviewerInitial}>
                          {review.user.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.reviewerInfo}>
                        <Text style={styles.reviewerName}>{review.user}</Text>
                        {review.rating && (
                          <View style={styles.reviewStars}>
                            {renderStars(review.rating)}
                          </View>
                        )}
                      </View>
                    </View>
                    {review.comment && (
                      <Text style={styles.reviewText} numberOfLines={3}>
                        {review.comment}
                      </Text>
                    )}
                  </View>
                ))}
              </View>

              {court.reviews.length > 2 && (
                <Pressable style={styles.showAllButton}>
                  <Text style={styles.showAllText}>
                    Show all {court.reviews.length} reviews
                  </Text>
                </Pressable>
              )}
            </View>

            <View style={{ height: 120 }} />
          </View>
        </ScrollView>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>$25</Text>
            <Text style={styles.perHour}> per hour</Text>
          </View>
          <Text style={styles.priceLabel}>Starting rate</Text>
        </View>

        <Pressable
          style={styles.reserveButton}
          onPress={() => setShowReviewModal(true)}
        >
          <Text style={styles.reserveButtonText}>Leave Review</Text>
        </Pressable>
      </View>

      <Modal
        visible={showReviewModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowReviewModal(false)}
      >
        <ReviewScreen
          courtName={court.name}
          onClose={() => setShowReviewModal(false)}
          onSubmit={(rating, comment) => {
            console.log("Review submitted:", { rating, comment });
            setShowReviewModal(false);
          }}
        />
      </Modal>
    </View>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  imageContainer: {
    width: "100%",
    height: height * 0.5,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  topControlsBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    paddingTop: 50,
    paddingBottom: 20,
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  circleButton: {
    width: 32,
    height: 32,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  imageCounter: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  counterText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  prevButton: {
    position: "absolute",
    left: 20,
    top: "50%",
    marginTop: -20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  nextButton: {
    position: "absolute",
    right: 20,
    top: "50%",
    marginTop: -20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  contentCard: {
    position: "absolute",
    top: height * 0.45,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },

  headerSection: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#222222",
    lineHeight: 32,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#717171",
    fontWeight: "400",
  },

  statsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    gap: 6,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#EBEBEB",
    alignSelf: "center",
  },

  ratingNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
  },
  starsContainer: {
    flexDirection: "row",
    gap: 1,
  },

  badgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
    textAlign: "center",
  },

  reviewCount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
  },
  reviewLabel: {
    fontSize: 12,
    color: "#717171",
    textAlign: "center",
  },

  hostSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  hostDetails: {
    flex: 1,
  },
  hostTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 2,
  },
  hostSubtitle: {
    fontSize: 14,
    color: "#717171",
  },

  amenitiesSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
    gap: 16,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  amenityText: {
    fontSize: 16,
    color: "#222222",
  },

  reviewsSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEBEB",
  },
  reviewsHeader: {
    marginBottom: 24,
  },
  reviewsTitle: {
    gap: 8,
  },
  reviewsRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reviewsRating: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222222",
  },
  reviewsStarsContainer: {
    flexDirection: "row",
    gap: 1,
  },
  reviewsCount: {
    fontSize: 16,
    color: "#717171",
  },
  reviewsList: {
    gap: 20,
  },
  reviewCard: {
    gap: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  reviewerInitial: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  reviewerInfo: {
    flex: 1,
    gap: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  reviewStars: {
    flexDirection: "row",
    gap: 1,
  },
  reviewText: {
    fontSize: 16,
    color: "#222222",
    lineHeight: 24,
    marginLeft: 52,
  },
  showAllButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#222222",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  showAllText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EBEBEB",
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  priceSection: {
    alignItems: "flex-start",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222222",
  },
  perHour: {
    fontSize: 16,
    fontWeight: "400",
    color: "#717171",
  },
  priceLabel: {
    fontSize: 14,
    color: "#717171",
    marginTop: 2,
  },
  reserveButton: {
    backgroundColor: "#FF385C",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 140,
    alignItems: "center",
  },
  reserveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
