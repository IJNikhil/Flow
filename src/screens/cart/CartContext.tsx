import React, { createContext, useEffect, useState, ReactNode, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CartItemType } from '../../types/models';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type CartContextType = {
  cart: CartItemType[];
  addToCart: (item: CartItemType) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  loading: false,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const user = auth().currentUser;
  const userId = user?.uid || null;

  useEffect(() => {
    if (!userId) {
      setCart([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(docSnap => {
        const data = docSnap.data();
        setCart(data?.cart ?? []);
        setLoading(false);
      });
    return () => unsubscribe();
  }, [userId]);

  // Wrap updateCartInFirestore in useCallback and include userId as a dependency
  const updateCartInFirestore = useCallback(
    async (newCart: CartItemType[]) => {
      if (!userId) {return;}
      await firestore().collection('users').doc(userId).update({
        cart: newCart,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    },
    [userId]
  );

  const addToCart = useCallback(
    async (item: CartItemType) => {
      if (!userId) {return;}
      const currentCart = [...cart];
      const index = currentCart.findIndex(ci => ci.productId === item.productId);
      if (index > -1) {
        currentCart[index].quantity += item.quantity;
      } else {
        currentCart.push({
          ...item,
          addedAt: firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
        });
      }
      await updateCartInFirestore(currentCart);
    },
    [cart, userId, updateCartInFirestore]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      if (!userId) {return;}
      const newCart = cart.filter(item => item.productId !== productId);
      await updateCartInFirestore(newCart);
    },
    [cart, userId, updateCartInFirestore]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (!userId) {return;}
      const newCart = cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      await updateCartInFirestore(newCart);
    },
    [cart, userId, updateCartInFirestore]
  );

  const clearCart = useCallback(
    async () => {
      if (!userId) {return;}
      await updateCartInFirestore([]);
    },
    [userId, updateCartInFirestore]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
