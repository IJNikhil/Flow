import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useOrderSuccessLogic } from './OrderSuccessLogic';

const OrderSuccessScreen = ({ navigation }: any) => {
  useOrderSuccessLogic();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>Thank you for shopping with us.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'HomeTabs' }],
          })}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6FFF2' },
  content: { alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#388e3c', marginBottom: 16 },
  subtitle: { fontSize: 16, color: '#444', marginBottom: 32 },
  button: { backgroundColor: '#388e3c', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default OrderSuccessScreen;
