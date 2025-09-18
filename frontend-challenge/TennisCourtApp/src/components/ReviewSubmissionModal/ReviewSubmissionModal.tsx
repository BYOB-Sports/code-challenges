import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import { COLORS, SPACING } from '@/constants';
import ReviewSubmissionForm from '../ReviewSubmissionForm/ReviewSubmissionForm';
import type { ReviewFormData } from '@/types';

interface ReviewSubmissionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => Promise<void>;
  loading?: boolean;
  courtName?: string;
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.85;
const DISMISS_THRESHOLD = 150;

const ReviewSubmissionModal: React.FC<ReviewSubmissionModalProps> = ({
  visible,
  onClose,
  onSubmit,
  loading = false,
  courtName,
}) => {
  const [draftData, setDraftData] = useState<ReviewFormData>({ rating: 5, comment: '' });
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Keyboard event listeners
  useEffect(() => {
    const { Keyboard } = require('react-native');

    const keyboardWillShowListener = Platform.select({
      ios: 'keyboardWillShow',
      android: 'keyboardDidShow',
    }) || 'keyboardDidShow';

    const keyboardWillHideListener = Platform.select({
      ios: 'keyboardWillHide',
      android: 'keyboardDidHide',
    }) || 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(keyboardWillShowListener, (event: any) => {
      setKeyboardHeight(event.endCoordinates?.height || 0);
    });

    const hideSubscription = Keyboard.addListener(keyboardWillHideListener, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription?.remove();
      hideSubscription?.remove();
    };
  }, []);

  // Handle Android back button
  useEffect(() => {
    if (!visible) return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleClose();
      return true;
    });

    return () => backHandler.remove();
  }, [visible]);

  // Animation effects
  useEffect(() => {
    if (visible) {
      // Show modal
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Hide modal
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: MODAL_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Pan responder for swipe to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical swipes downward
        return gestureState.dy > 0 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow downward movement
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
          overlayOpacity.setValue(1 - (gestureState.dy / MODAL_HEIGHT) * 0.5);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DISMISS_THRESHOLD || gestureState.vy > 0.5) {
          // Dismiss modal
          handleClose();
        } else {
          // Snap back to original position
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: MODAL_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
      // Reset animation values
      translateY.setValue(MODAL_HEIGHT);
      overlayOpacity.setValue(0);
    });
  };

  const handleSubmit = async (data: ReviewFormData) => {
    try {
      await onSubmit(data);
      // Clear draft after successful submission
      setDraftData({ rating: 5, comment: '' });
      handleClose();
    } catch (error) {
      // Error handling is done in the parent component
      console.error('Modal submission error:', error);
    }
  };

  const handleDraftChange = (data: ReviewFormData) => {
    setDraftData(data);
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" />

      <View style={styles.modalContainer}>
        {/* Overlay */}
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: overlayOpacity,
              },
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Modal Content */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          style={styles.keyboardAvoidingView}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY }],
                height: MODAL_HEIGHT - keyboardHeight,
                maxHeight: SCREEN_HEIGHT - (Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24),
              },
            ]}
            {...panResponder.panHandlers}
          >
            <SafeAreaView style={styles.safeArea}>
              {/* Drag Handle */}
              <View style={styles.dragHandle} />

              {/* Form Container */}
              <View style={styles.formContainer}>
                <ReviewSubmissionForm
                  onSubmit={handleSubmit}
                  onCancel={handleClose}
                  loading={loading}
                  courtName={courtName}
                  autoFocus
                  initialData={draftData}
                  onDraftChange={handleDraftChange}
                />
              </View>
            </SafeAreaView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 20,
    width: SCREEN_WIDTH,
    maxWidth: 600, // For tablet/larger screens
    alignSelf: 'center',
  },
  safeArea: {
    flex: 1,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
});

export default ReviewSubmissionModal;