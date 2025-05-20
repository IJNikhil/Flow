// import { useState, useEffect, useContext } from 'react';
// import { Alert } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import type { CartItemType, UserAddress } from '../../types/models';
// import { CartContext } from '../cart/CartContext';
// import { getApp } from '@react-native-firebase/app';
// import {
//   getFirestore,
//   doc,
//   setDoc,
//   updateDoc,
// } from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import { RootParamList } from '../../navigation/types';
// import { cleanUndefined } from '../../backend/utils/cleanUndefined';

// function generateOrderId() {
//   return 'order_' + Date.now();
// }

// function getFormattedDateString(date: Date): string {
//   const datePart = date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
//   const timePart = date.toLocaleTimeString('en-US', {
//     hour: 'numeric',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true,
//     timeZoneName: 'short',
//   });
//   return `${datePart} at ${timePart}`;
// }

// export function useCheckoutDetailsLogic() {
//   const route = useRoute<any>();
//   const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
//   const { cart: contextCart, clearCart } = useContext(CartContext);
//   const { cart, product, address } = route.params || {};

//   const cartItems: CartItemType[] = contextCart.length
//     ? contextCart
//     : cart
//     ? cart
//     : product
//     ? [{ ...product, quantity: 1 }]
//     : [];

//   const [addresses, setAddresses] = useState<UserAddress[]>([]);
//   const [userAddress, setUserAddress] = useState<UserAddress | null>(address ?? null);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     if (address) {
//       setUserAddress(address);
//     }
//   }, [address]);

//   const handleCheckout = async () => {
//     if (!userAddress) {
//       Alert.alert('Please add a delivery address before placing your order.');
//       return;
//     }
//     if (!cartItems.length) {
//       Alert.alert('Cart is empty.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const user = auth().currentUser;
//       const userId = user?.uid;
//       if (!userId) {
//         Alert.alert('You must be logged in to place an order.');
//         setLoading(false);
//         return;
//       }

//       const app = getApp();
//       const db = getFirestore(app);

//       // Generate orderId
//       const orderId = generateOrderId();
//       const orderRef = doc(db, 'users', userId, 'orders', orderId);

//       // Calculate total
//       const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//       // Format the placedAt string
//       const now = new Date();
//       const formattedPlacedAt = getFormattedDateString(now);

//       // Prepare order data, clean undefined fields
//       const orderData = cleanUndefined({
//         orderId,
//         placedAt: formattedPlacedAt,
//         total,
//         status: 'pending',
//         items: cartItems.map(item => cleanUndefined({
//           productId: item.productId,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price,
//           image: item.image,
//         })),
//         address: cleanUndefined(userAddress),
//       });

//       // Store order details
//       await setDoc(orderRef, orderData);

//       // Prepare product summary for order history
//       const productsSummary = cartItems.map(item => ({
//         productId: item.productId,
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//       }));

//       // Add summary to orderHistory array in user doc
//       const userDocRef = doc(db, 'users', userId);
//       await updateDoc(userDocRef, {
//         orderHistory: [
//           cleanUndefined({
//             orderId,
//             placedAt: formattedPlacedAt,
//             products: productsSummary,
//             total,
//             status: 'pending',
//             address: cleanUndefined(userAddress),
//           }),
//         ],
//       });

//       if (clearCart) {
//         await clearCart();
//       }

//       setLoading(false);
//       navigation.navigate('OrderSuccessScreen', { orderId });
//     } catch (err: any) {
//       setLoading(false);
//       Alert.alert('Order failed', err?.message || 'Could not place order. Please try again.');
//     }
//   };

//   const handleChangeAddress = () => {
//     navigation.navigate('ChangeAddressScreen', {
//       addresses,
//       selectedAddress: userAddress ?? undefined,
//       cart: cartItems.length > 0 ? cartItems : undefined,
//       fromCheckout: true,
//     });
//   };

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

//   return {
//     cart: cartItems,
//     addresses,
//     userAddress,
//     loading,
//     handleCheckout,
//     handleChangeAddress,
//     handleBack,
//     formatCurrency,
//     setAddresses,
//     setUserAddress,
//   };
// }



import { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CartItemType, UserAddress, OrderHistoryProductSummary, OrderHistoryItem } from '../../types/models';
import { CartContext } from '../cart/CartContext';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { RootParamList } from '../../navigation/types';
import { cleanUndefined } from '../../backend/utils/cleanUndefined';

function generateOrderId() {
  return 'order_' + Date.now();
}

export function useCheckoutDetailsLogic() {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const { cart: contextCart, clearCart } = useContext(CartContext);
  const { cart, product, address } = route.params || {};

  const cartItems: CartItemType[] = contextCart.length
    ? contextCart
    : cart
    ? cart
    : product
    ? [{ ...product, quantity: 1 }]
    : [];

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [userAddress, setUserAddress] = useState<UserAddress | null>(address ?? null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      setUserAddress(address);
    }
  }, [address]);

  const handleCheckout = async () => {
    if (!userAddress) {
      Alert.alert('Please add a delivery address before placing your order.');
      return;
    }
    if (!cartItems.length) {
      Alert.alert('Cart is empty.');
      return;
    }

    try {
      setLoading(true);
      const user = auth().currentUser;
      const userId = user?.uid;
      if (!userId) {
        Alert.alert('You must be logged in to place an order.');
        setLoading(false);
        return;
      }

      // Generate orderId
      const orderId = generateOrderId();

      // Calculate total
      const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Prepare product summary for order history
      const productsSummary: OrderHistoryProductSummary[] = cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      // Prepare order data for global orders collection
      const orderData = cleanUndefined({
        orderId,
        buyerId: userId,
        sellerId: '', // Fill if you support multi-seller carts
        products: productsSummary,
        total,
        status: 'pending',
        address: cleanUndefined(userAddress),
        placedAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        updatedBy: userId,
      });

      // Store order in global orders collection
      await firestore().collection('orders').doc(orderId).set(orderData);

      // Prepare order history item for user doc
const orderHistoryItem: OrderHistoryItem = {
  orderId,
  placedAt: firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp, // ✅ This is a Timestamp
  products: productsSummary,
  total,
  status: 'pending',
  address: cleanUndefined(userAddress),
};

      // Append to user's orderHistory array
      const userDocRef = firestore().collection('users').doc(userId);
      await userDocRef.update({
        orderHistory: firestore.FieldValue.arrayUnion(orderHistoryItem),
        cart: [],
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      if (clearCart) {
        await clearCart();
      }

      setLoading(false);
      navigation.navigate('OrderSuccessScreen', { orderId });
    } catch (err: any) {
      setLoading(false);
      Alert.alert('Order failed', err?.message || 'Could not place order. Please try again.');
    }
  };

  const handleChangeAddress = () => {
    navigation.navigate('ChangeAddressScreen', {
      addresses,
      selectedAddress: userAddress ?? undefined,
      cart: cartItems.length > 0 ? cartItems : undefined,
      fromCheckout: true,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const formatCurrency = (amount: number) => `₹${amount.toFixed(2)}`;

  return {
    cart: cartItems,
    addresses,
    userAddress,
    loading,
    handleCheckout,
    handleChangeAddress,
    handleBack,
    formatCurrency,
    setAddresses,
    setUserAddress,
  };
}
