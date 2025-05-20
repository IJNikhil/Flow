import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { CartItemType } from '../../types/models';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onQuantityChange: (newQuantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onQuantityChange }) => {
  // Defensive: Ensure all numbers are valid
  const price = Number(item.price ?? 0);
  const quantity = Number(item.quantity ?? 1);
  const total = price * quantity;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: item.image || '' }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text numberOfLines={2} style={styles.name}>
            {item.name ?? 'Product'}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{price.toFixed(0)}</Text>
          </View>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => onQuantityChange(Math.max(1, quantity - 1))}
              accessibilityLabel={`Decrease quantity of ${item.name}`}
              accessibilityRole="button"
              disabled={quantity <= 1}
            >
              <MaterialIcons name="remove" size={18} color={quantity <= 1 ? "#ccc" : "#333"} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => onQuantityChange(quantity + 1)}
              accessibilityLabel={`Increase quantity of ${item.name}`}
              accessibilityRole="button"
            >
              <MaterialIcons name="add" size={18} color="#333" />
            </TouchableOpacity>
          </View>
          <Text style={styles.totalText}>Total: ₹{total.toFixed(0)}</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={onRemove} style={styles.actionButton}>
          <Text style={styles.actionText}>REMOVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  row: { flexDirection: 'row' },
  image: {
    width: 90,
    height: 90,
    borderRadius: 6,
    resizeMode: 'contain',
    backgroundColor: '#f8f8f8',
  },
  infoContainer: { flex: 1, paddingLeft: 12 },
  name: { fontSize: 15, fontWeight: '600', color: '#222', marginBottom: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  qtyButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#f2f2f2',
  },
  qtyText: { marginHorizontal: 10, fontSize: 14, fontWeight: '500' },
  totalText: { fontSize: 14, fontWeight: '600', color: '#111', marginTop: 6 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  actionButton: { paddingHorizontal: 12 },
  actionText: { color: '#2874F0', fontWeight: '600', fontSize: 13 },
});

export default CartItem;
