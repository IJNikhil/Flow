import firestore from '@react-native-firebase/firestore';

// Approve seller application (admin only)
export const approveSellerApplication = async (uid: string, adminUid: string) => {
  await firestore().collection('sellers').doc(uid).update({
    status: 'approved',
    approvedAt: firestore.FieldValue.serverTimestamp(),
    approvedBy: adminUid,
  });
  await firestore().collection('users').doc(uid).update({
    roles: ['buyer', 'seller'],
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
};

// Seller exits seller mode (or admin revokes)
export const revokeSellerRole = async (uid: string) => {
  await firestore().collection('users').doc(uid).update({
    roles: ['buyer'],
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
};
