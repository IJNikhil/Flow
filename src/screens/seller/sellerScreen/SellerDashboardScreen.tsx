import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import type { ProductDoc } from '../../../types/models';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SellerStackParamList } from '../SellerStack';

const SellerDashboardScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SellerStackParamList>>();
  const user = auth().currentUser;
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) { setLoading(false); return; }
    const unsubscribe = firestore()
      .collection('products')
      .where('sellerId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          setProducts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ProductDoc)));
          setLoading(false);
        },
        error => {
          Alert.alert('Error', error.message || 'Failed to load products');
          setLoading(false);
        }
      );
    return () => unsubscribe();
  }, [user?.uid]);

  const handleDelete = (productId: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setDeletingId(productId);
            try {
              await firestore().collection('products').doc(productId).delete();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete product');
            } finally {
              setDeletingId(null);
            }
          },
        },
      ]
    );
  };

  const renderProduct = ({ item }: { item: ProductDoc }) => (
    <View style={styles.productCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.meta}>Price: ₹{item.price} | Stock: {item.stockLeft}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('SellerEditProductScreen', { product: item })}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item.id)}
          disabled={deletingId === item.id}
        >
          <Text style={styles.actionText}>
            {deletingId === item.id ? 'Deleting...' : 'Delete'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Products</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#2874F0" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No products found. Tap below to add your first product!</Text>
          }
          contentContainerStyle={products.length === 0 && { flex: 1, justifyContent: 'center' }}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('SellerAddProductScreen')}
        activeOpacity={0.85}
      >
        <Text style={styles.addButtonText}>+ Add New Product</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: '#2e7d32' }]}
        onPress={() => navigation.navigate('SellerOrdersScreen')}
        activeOpacity={0.85}
      >
        <Text style={styles.addButtonText}>View Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#f5f7fa' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 18, color: '#2874F0' },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  productName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#222' },
  meta: { color: '#555', fontSize: 13, marginBottom: 2 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  editBtn: {
    backgroundColor: '#2874F0',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: '#e53935',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  actionText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  addButton: {
    backgroundColor: '#2874F0',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    elevation: 1,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 60, fontSize: 16 },
});

export default SellerDashboardScreen;
