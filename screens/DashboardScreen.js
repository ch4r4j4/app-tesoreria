import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Provider as PaperProvider } from 'react-native-paper';

export default function DashboardScreen() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="titleLarge">Panel de Control</Text>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
