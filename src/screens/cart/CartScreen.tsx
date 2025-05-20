import React from 'react';
import CartUI from './CartUI';
import { useCartLogic } from './CartLogic';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const {
    cart,
    loading,
    error,
    totalAmount,
    handleRemove,
    handleUpdateQuantity,
  } = useCartLogic();

  const handleGoBack = () => navigation.goBack();
  const handleCheckout = () => {
    navigation.navigate('CheckoutDetailsScreen', { cart });
  };

  return (
    <CartUI
      cart={cart}
      loading={loading}
      error={error}
      totalAmount={totalAmount}
      onRemove={handleRemove}
      onUpdateQuantity={handleUpdateQuantity}
      onGoBack={handleGoBack}
      onCheckout={handleCheckout}
    />
  );
};

export default CartScreen;
