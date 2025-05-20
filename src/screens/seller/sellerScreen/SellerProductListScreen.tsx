import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import type { ProductDoc } from '../../../types/models';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SellerStackParamList } from '../SellerStack';

const SellerProductListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SellerStackParamList>>();
  const user = auth().currentUser;
  const [products, setProducts] = useState<ProductDoc[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = firestore()
      .collection('products')
      .where('sellerId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProductDoc)));
      });
    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Products</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('SellerEditProductScreen', { product: item })}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productMeta}>Price: ₹{item.price} | Stock: {item.stockLeft}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 50 }}>No products yet. Tap below to add one!</Text>
        }
      />
      <Button title="Add New Product" onPress={() => navigation.navigate('SellerAddProductScreen')} />
      <Button title="View Orders" onPress={() => navigation.navigate('SellerOrdersScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#f5f7fa' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 18, color: '#2874F0' },
  productCard: { backgroundColor: '#fff', borderRadius: 8, padding: 14, marginBottom: 10, elevation: 1 },
  productName: { fontWeight: 'bold', fontSize: 16, marginBottom: 2 },
  productMeta: { color: '#555', fontSize: 13 },
});

export default SellerProductListScreen;
