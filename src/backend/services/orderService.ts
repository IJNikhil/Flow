import firestore from '@react-native-firebase/firestore';
import { OrderHistoryItem } from '../../types/models';

export const getUserOrders = async (uid: string): Promise<OrderHistoryItem[]> => {
  if (!uid) {return [];}
  const userSnap = await firestore().collection('users').doc(uid).get();
  const data = userSnap.data();
  return data?.orderHistory ?? [];
};
