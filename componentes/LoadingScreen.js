import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Rockeala</Text>
        <Text style={{ fontSize: 10, fontWeight: '200', color: 'gray' }}>hair rock and coffee</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  spinnerContainer: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
