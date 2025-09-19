import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS } from '../constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            We're sorry for the inconvenience. Please try again.
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleRetry}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: DIMENSIONS.fontTitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: DIMENSIONS.md,
    textAlign: 'center',
  },
  message: {
    fontSize: DIMENSIONS.fontLarge,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: DIMENSIONS.xl,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: DIMENSIONS.lg,
    paddingVertical: DIMENSIONS.md,
    borderRadius: DIMENSIONS.radiusMedium,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontLarge,
    fontWeight: '600',
  },
});
