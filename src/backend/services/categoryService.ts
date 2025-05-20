import firestore from '@react-native-firebase/firestore';

// Check if categories exist in Firestore
export const checkCategoriesExist = async () => {
  const snapshot = await firestore().collection('categories').get();
  return !snapshot.empty;
};
