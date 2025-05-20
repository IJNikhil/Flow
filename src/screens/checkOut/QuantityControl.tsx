import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuantityControlProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  increaseQuantity,
  decreaseQuantity,
  minQuantity = 1,
  maxQuantity = 99,
}) => {
  return (
    <View style={styles.quantityContainer}>
      <Text style={styles.qtyLabel}>Quantity:</Text>
      <View style={styles.qtyControl}>
        <TouchableOpacity
          style={[styles.qtyButton, quantity === minQuantity && styles.qtyButtonDisabled]}
          onPress={decreaseQuantity}
          disabled={quantity === minQuantity}
        >
          <Text style={styles.qtyButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{quantity}</Text>
        <TouchableOpacity
          style={[styles.qtyButton, quantity === maxQuantity && styles.qtyButtonDisabled]}
          onPress={increaseQuantity}
          disabled={quantity === maxQuantity}
        >
          <Text style={styles.qtyButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 12,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3949AB',
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  qtyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3949AB',
  },
  qtyButtonDisabled: {
    backgroundColor: '#9FA8DA',
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  qtyValue: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#1A237E',
    paddingHorizontal: 8,
  },
});

export default QuantityControl;
