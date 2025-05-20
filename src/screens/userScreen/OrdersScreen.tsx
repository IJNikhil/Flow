import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getUserProfile, getCurrentUser } from '../../backend/services/authService';
import { OrderHistoryItem } from '../../types/models';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

function formatTimestamp(ts?: FirebaseFirestoreTypes.Timestamp | string) {
  if (!ts) {return '';}
  if (typeof ts === 'string') {return ts;}
  const date = ts.toDate();
  return date.toLocaleString();
}

const OrdersScreen: React.FC = () => {
  const user = getCurrentUser();
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getUserProfile(user.uid)
        .then(profile => setOrders(profile?.orderHistory ?? []))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?.uid]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#2874F0" />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.orderId}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.orderId}>
                {item.products && item.products.length > 0
                  ? `Product${item.products.length > 1 ? 's' : ''}: ${item.products.map(p => `${p.name} (x${p.quantity})`).join(', ')}`
                  : 'Product: -'}
              </Text>
              <Text>Status: {item.status}</Text>
              <Text>Total: ₹{item.total}</Text>
              <Text>Date: {formatTimestamp(item.placedAt)}</Text>
              <Text>
                Address: {item.address ? `${item.address.recipient}, ${item.address.addressLine1}, ${item.address.city}` : ''}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  orderCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  orderId: { fontWeight: 'bold', marginBottom: 6 },
});

export default OrdersScreen;
