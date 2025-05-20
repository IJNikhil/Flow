import React, { useContext } from 'react';
import CheckoutDetailsUI from './CheckoutDetailsUI';
import { useCheckoutDetailsLogic } from './CheckoutDetailsLogic';
import { CartContext } from '../cart/CartContext';

const CheckoutDetailsScreen = () => {
  const {
    cart,
    addresses,
    userAddress,
    loading,
    handleCheckout,
    handleChangeAddress,
    handleBack,
    formatCurrency,
    setAddresses,
    setUserAddress,
  } = useCheckoutDetailsLogic();

  const { updateQuantity } = useContext(CartContext);

  const handleIncreaseQuantity = async (productId: string, max?: number) => {
    const item = cart.find(i => i.productId === productId);
    if (item && (!max || item.quantity < max)) {
      await updateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = async (productId: string, min = 1) => {
    const item = cart.find(i => i.productId === productId);
    if (item && item.quantity > min) {
      await updateQuantity(productId, item.quantity - 1);
    }
  };

  return (
    <CheckoutDetailsUI
      cart={cart}
      userAddress={userAddress}
      loading={loading}
      handleCheckout={handleCheckout}
      handleChangeAddress={handleChangeAddress}
      handleBack={handleBack}
      formatCurrency={formatCurrency}
      addresses={addresses}
      setAddresses={setAddresses}
      setUserAddress={setUserAddress}
      onIncreaseQuantity={handleIncreaseQuantity}
      onDecreaseQuantity={handleDecreaseQuantity}
    />
  );
};

export default CheckoutDetailsScreen;
