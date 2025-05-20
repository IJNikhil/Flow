import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import type { ProductDoc } from '../../../types/models';

interface ProductCardUIProps {
  product: ProductDoc;
  quantity: number;
  formatCurrency: (amount: number) => string;
  unitLabel: string;
  price: number;
  subtotal: number;
  discount: number;
  discountPercentage: number;
  totalAmount: number;
  handleDecrease: (e: GestureResponderEvent) => void;
  handleIncrease: (e: GestureResponderEvent) => void;
  handleCardPress: () => void;
  stockLeft?: number;
}

const ProductCardUI: React.FC<ProductCardUIProps> = ({
  product,
  quantity,
  formatCurrency,
  unitLabel,
  price,
  subtotal,
  discount,
  discountPercentage,
  totalAmount,
  handleDecrease,
  handleIncrease,
  handleCardPress,
  stockLeft,
}) => (
  <TouchableOpacity
    activeOpacity={0.92}
    accessibilityLabel={`View details for ${product.name}`}
    accessibilityRole="button"
    style={styles.card}
    onPress={handleCardPress}
  >
    <View style={styles.row}>
      {product.images?.[0] ? (
        <Image source={{ uri: product.images[0] }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.details}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.rowCenter}>
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.delivery}>Delivery by: {product.deliveryUpto}</Text>
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.price}>{formatCurrency(price)}</Text>
          {discount > 0 && (
            <Text style={styles.originalPrice}>{formatCurrency(subtotal)}</Text>
          )}
          {discountPercentage > 0 && (
            <Text style={styles.discount}>({discountPercentage}% OFF)</Text>
          )}
        </View>
        <View style={styles.qtyRow}>
          <Text style={styles.qtyLabel}>Quantity:</Text>
          <TouchableOpacity
            style={[styles.qtyBtn, quantity <= 1 && styles.qtyBtnDisabled]}
            onPress={handleDecrease}
            disabled={quantity <= 1}
            accessibilityLabel="Decrease quantity"
            accessibilityRole="button"
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{quantity} {unitLabel}</Text>
          <TouchableOpacity
            style={[
              styles.qtyBtn,
              stockLeft !== undefined && quantity >= stockLeft ? styles.qtyBtnDisabled : undefined,
            ]}
            onPress={handleIncrease}
            disabled={stockLeft !== undefined ? quantity >= stockLeft : false}
            accessibilityLabel="Increase quantity"
            accessibilityRole="button"
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    {/* Price Details Section */}
    <View style={styles.priceDetailsSection}>
      <Text style={styles.priceDetailsHeader}>Price Details</Text>
      <View style={styles.breakdownRow}>
        <Text style={styles.priceLabel}>Subtotal</Text>
        <Text style={styles.priceValue}>{formatCurrency(subtotal)}</Text>
      </View>
      {discount > 0 && (
        <View style={styles.breakdownRow}>
          <Text style={styles.priceLabel}>Discount</Text>
          <Text style={styles.discountValue}>- {formatCurrency(discount)}</Text>
        </View>
      )}
      <View style={styles.breakdownRow}>
        <Text style={styles.priceLabel}>Delivery</Text>
        <Text style={styles.deliveryValue}>FREE</Text>
      </View>
      <View style={styles.breakdownRow}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8fff5',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
    gap: 8,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  imagePlaceholder: {
    width: 100,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A237E',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E65100',
  },
  star: {
    fontSize: 12,
    color: '#E65100',
  },
  delivery: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2E7D32',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C62828',
  },
  qtyLabel: {
    fontSize: 14,
    color: '#444',
    marginRight: 8,
  },
  qtyBtn: {
    backgroundColor: '#eafbe7',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  qtyBtnDisabled: {
    opacity: 0.5,
  },
  qtyBtnText: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
  },
  qtyValue: {
    fontSize: 15,
    fontWeight: '500',
    marginHorizontal: 8,
    color: '#222',
  },
  priceDetailsSection: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 14,
  },
  priceDetailsHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A237E',
    marginBottom: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  priceLabel: {
    fontSize: 14,
    color: '#333',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
  },
  discountValue: {
    fontSize: 14,
    color: '#388E3C',
  },
  deliveryValue: {
    fontSize: 14,
    color: '#388E3C',
  },
  totalLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700',
  },
});

export default ProductCardUI;
