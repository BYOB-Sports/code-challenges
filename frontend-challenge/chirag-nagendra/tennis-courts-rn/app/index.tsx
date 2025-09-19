import React, { useEffect } from 'react';
import { View } from 'react-native';
import CourtsListScreen from '../screens/CourtsListScreen';
import { useCourtsStore } from '../store/useCourtsStore';
import { generateSeedData } from '../data/mock';

export default function Index() {
  const bootstrap = useCourtsStore(s => s.bootstrap);

  useEffect(() => {
    const { courts, reviews } = generateSeedData(100);
    bootstrap(courts, reviews);
  }, [bootstrap]);

  return <View style={{ flex: 1 }}><CourtsListScreen /></View>;
}