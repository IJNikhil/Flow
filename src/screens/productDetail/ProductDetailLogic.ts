import { useState, useContext } from 'react';
import { CartContext } from '../cart/CartContext';
import type { ProductDoc } from '../../types/models';
import firestore from '@react-native-firebase/firestore';

export const useProductDetailLogic = (product?: ProductDoc) => {
  const { addToCart, cart } = useContext(CartContext);
  const [imgIndex, setImgIndex] = useState(0);

  const loading = !product;

  // For "Add to Cart"
  const handleAddToCart = () => {
    if (!product) {
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] ?? '',
      addedAt: firestore.Timestamp.now(),
    });
  };

  // For "Buy Now"
  const handleBuyNow = (navigate: (params: any) => void) => {
    if (!product) {
      return;
    }
    navigate({
      product,
    });
  };

  return {
    product,
    loading,
    imgIndex,
    setImgIndex,
    cartCount: cart.length,
    handleAddToCart,
    handleBuyNow,
  };
};
