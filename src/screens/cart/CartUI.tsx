import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartItem from './CartItem';
import { CartItemType } from '../../types/models';

interface CartUIProps {
  cart: CartItemType[];
  loading: boolean;
  error: string | null;
  totalAmount: number;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onGoBack: () => void;
  onCheckout: () => void;
}

const CartUI: React.FC<CartUIProps> = ({
  cart,
  loading,
  error,
  totalAmount,
  onRemove,
  onUpdateQuantity,
  onGoBack,
  onCheckout,
}) => (
  <SafeAreaView style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onGoBack}
        accessibilityLabel="Go back"
        accessibilityRole="button"
        style={styles.headerBack}
      >
        <Icon name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'} size={22} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>My Cart</Text>
    </View>

    {/* Error/Loading */}
    {loading && <ActivityIndicator size="large" color="#4CAF50" style={{ margin: 16 }} />}
    {error && <Text style={styles.error}>{error}</Text>}

    {/* Cart List */}
    <FlatList
      data={cart}
      keyExtractor={item => item.productId}
      renderItem={({ item }) => (
        <CartItem
          item={item}
          onRemove={() => onRemove(item.productId)}
          onQuantityChange={qty => onUpdateQuantity(item.productId, qty)}
        />
      )}
      ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      accessibilityLabel="Cart items list"
    />

    {/* Sticky Checkout Bar */}
    {cart.length > 0 && (
      <View style={styles.stickyBar} accessible accessibilityRole="summary">
        <Text style={styles.totalText}>Total: ₹{totalAmount.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          accessibilityLabel="Proceed to checkout"
          accessibilityRole="button"
          onPress={onCheckout}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    )}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD',
    backgroundColor: '#F5F5F5',
  },
  headerBack: { marginRight: 12, padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#333' },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 18, color: '#888' },
  error: { color: 'red', textAlign: 'center', marginVertical: 8 },
  stickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    zIndex: 100,
  },
  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    minWidth: 180,
  },
  checkoutText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});

export default CartUI;
