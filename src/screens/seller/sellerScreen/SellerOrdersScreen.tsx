import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import type { OrderDoc } from '../../../types/models';

const orderDefaults: Partial<OrderDoc> = {
  orderId: '',
  buyerId: '',
  sellerId: '',
  products: [],
  total: 0,
  status: 'pending',
  address: {
    id: '',
    recipient: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    isDefault: false,
  },
  placedAt: firestore.Timestamp.now(),
  updatedAt: firestore.Timestamp.now(),
  updatedBy: '',
};

const SellerOrdersScreen: React.FC = () => {
  const user = auth().currentUser;
  const [orders, setOrders] = useState<OrderDoc[]>([]);

  useEffect(() => {
    if (!user?.uid) { return; }
    const unsubscribe = firestore()
      .collection('orders')
      .where('sellerId', '==', user.uid)
      .orderBy('placedAt', 'desc')
      .onSnapshot(snapshot => {
        setOrders(
          snapshot.docs.map(doc => ({
            ...orderDefaults,
            ...doc.data(),
            id: doc.id,
          }) as OrderDoc)
        );
      });
    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders for My Products</Text>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total: ₹{item.total}</Text>
            <Text>Buyer: {item.buyerId}</Text>
            <Text>
              Placed: {item.placedAt?.toDate?.().toLocaleString?.() || ''}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders yet.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#f5f7fa' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 18, color: '#2874F0' },
  orderCard: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 10, elevation: 1 },
  orderId: { fontWeight: 'bold', marginBottom: 2 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 50 },
});

export default SellerOrdersScreen;
