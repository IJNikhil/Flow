import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const OrderSuccessUI: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Successfully Ordered!</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6FFF6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default OrderSuccessUI;
