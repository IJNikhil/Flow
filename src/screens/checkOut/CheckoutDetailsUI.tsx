/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopBar from './TopBar';
import CheckoutButton from './CheckoutButton';
import CurrencyDisplay from './Currency';
import type { UserAddress, CartItemType } from '../../types/models';

type AddressSectionProps = {
  userAddress: UserAddress | null;
  loading: boolean;
  onChangeAddress: () => void;
};

const AddressSection: React.FC<AddressSectionProps> = ({
  userAddress,
  loading,
  onChangeAddress,
}) => (
  <View style={styles.addressSection}>
    {loading ? (
      <ActivityIndicator size="large" color="#6a994e" style={styles.activityIndicator} />
    ) : userAddress ? (
      <View style={styles.addressCard}>
        <View style={styles.changeRow}>
          <Text style={styles.label}>Deliver to this address</Text>
          <Text style={styles.changeBtn} onPress={onChangeAddress}>Change</Text>
        </View>
        <View style={styles.addressRow}>
          <MaterialIcons name="location-on" size={28} color="#6a994e" style={styles.icon} />
          <View style={styles.addressInfo}>
            <Text style={styles.nameText}>{userAddress.recipient}</Text>
            <Text style={styles.addressText}>
              {userAddress.addressLine1}
              {userAddress.addressLine2 ? `, ${userAddress.addressLine2}` : ''}
              , {userAddress.city}, {userAddress.state}, {userAddress.country} - {userAddress.pincode}
            </Text>
            <Text style={styles.addressText}>Phone: {userAddress.phone}</Text>
            {userAddress.isDefault && (
              <Text style={[styles.addressText, styles.defaultText]}>Default</Text>
            )}
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.addressCard}>
        <View style={styles.changeRow}>
          <Text style={styles.label}>No address found.</Text>
          <Text style={styles.changeBtn} onPress={onChangeAddress}>Add</Text>
        </View>
      </View>
    )}
  </View>
);

type CheckoutDetailsUIProps = {
  cart: CartItemType[];
  userAddress: UserAddress | null;
  loading: boolean;
  handleCheckout: () => void;
  handleChangeAddress: () => void;
  handleBack: () => void;
  formatCurrency: (amount: number) => string;
  addresses: UserAddress[];
  setAddresses: (addrs: UserAddress[]) => void;
  setUserAddress: (addr: UserAddress) => void;
  onIncreaseQuantity: (productId: string, max?: number) => void;
  onDecreaseQuantity: (productId: string, min?: number) => void;
};

const CartProductRow: React.FC<{
  item: CartItemType;
  formatCurrency: (amount: number) => string;
  onIncrease: () => void;
  onDecrease: () => void;
}> = ({ item, formatCurrency, onIncrease, onDecrease }) => (
  <View style={styles.productRow}>
    <Image
      source={{ uri: item.image || 'https://via.placeholder.com/80x80.png?text=No+Image' }}
      style={styles.productImage}
    />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
      <View style={styles.qtyRow}>
        <TouchableOpacity
          style={[styles.qtyBtn, item.quantity <= 1 && styles.qtyBtnDisabled]}
          onPress={onDecrease}
          disabled={item.quantity <= 1}
        >
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={onIncrease}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productSubtotal}>
        Subtotal: {formatCurrency(item.price * item.quantity)}
      </Text>
    </View>
  </View>
);

const CheckoutDetailsUI: React.FC<CheckoutDetailsUIProps> = ({
  cart,
  userAddress,
  loading,
  handleCheckout,
  handleChangeAddress,
  handleBack,
  formatCurrency,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar onBack={handleBack} title="Order Summary" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AddressSection
          userAddress={userAddress}
          loading={loading}
          onChangeAddress={handleChangeAddress}
        />
        <Text style={styles.sectionHeader}>Products</Text>
<FlatList
  data={cart}
  keyExtractor={(item, index) => item.productId + '_' + index}
  renderItem={({ item, index }) => (
    <CartProductRow
      key={item.productId + '_' + index}
      item={item}
      formatCurrency={formatCurrency}
      onIncrease={() => onIncreaseQuantity(item.productId)}
      onDecrease={() => onDecreaseQuantity(item.productId)}
    />
  )}
  scrollEnabled={false}
/>

      </ScrollView>
      <View style={styles.bottomRow}>
        <View>
          <CurrencyDisplay
            totalPrice={total}
            formatCurrency={formatCurrency}
          />
        </View>
        <View style={styles.bottomRowFlex}>
          <CheckoutButton
            handleCheckout={handleCheckout}
            disabled={!userAddress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6FFF2' },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  scrollContent: { paddingVertical: 16, paddingBottom: 100 },
  sectionHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#222',
  },
  addressSection: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  addressCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  changeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: { fontSize: 13, color: '#5a7d4c' },
  changeBtn: {
    color: '#6a994e',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: { marginRight: 12 },
  addressInfo: { flex: 1 },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },
  addressText: { fontSize: 15, color: '#444' },
  defaultText: { color: '#43A047', fontWeight: 'bold' },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A237E',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
    marginBottom: 2,
  },
  productSubtotal: {
    fontSize: 13,
    color: '#444',
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 2,
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
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
  },
  bottomRowFlex: { flex: 1, marginLeft: 8 },
  activityIndicator: { marginVertical: 24 },
});

export default CheckoutDetailsUI;
