import React, { use } from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import { AppProvider, useApp } from "./src/context/AppContext";
import List from './src/components/List';
import Details from './src/components/Details';
import colors from './src/theme/theme';

function Router() {
    const {nav} = useApp();

    return nav.route === 'list' ? <List /> : <Details courtId={nav.courtId}/>;
}

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <Router />
      </SafeAreaView>
    </AppProvider>
  );
}