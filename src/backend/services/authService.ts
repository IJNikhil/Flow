import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserDoc, UserAddress } from '../../types/models';

// SIGN UP
export const signUp = async (
  email: string,
  password: string,
  name: string,
  phone: string = '',
  avatar: string = ''
) => {
  const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  await userCredential.user.updateProfile({ displayName: name, photoURL: avatar });
  await userCredential.user.sendEmailVerification();

  // Save user profile to Firestore
  await firestore().collection('users').doc(userCredential.user.uid).set({
    uid: userCredential.user.uid,
    name,
    email,
    phone,
    avatar: avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
    addressBook: [],
    cart: [],
    orderHistory: [],
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
    isVerified: false,
    lastLogin: firestore.FieldValue.serverTimestamp(),
    roles: ['buyer'], // default role
  });

  return userCredential.user;
};

// LOGIN
export const login = async (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

// LOGOUT
export const logout = async () => {
  if (auth().currentUser) {
    await auth().signOut();
  }
};

// GET CURRENT USER (from Firebase Auth)
export const getCurrentUser = () => {
  const user = auth().currentUser;
  if (!user) {return null;}
  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    phone: user.phoneNumber,
    avatar: user.photoURL,
  };
};

// GET USER PROFILE FROM FIRESTORE (auto-create if missing, never returns null)
export const getUserProfile = async (uid: string): Promise<UserDoc & { docId: string }> => {
  const fallbackUid = uid || auth().currentUser?.uid;
  if (!fallbackUid) {
    throw new Error('No UID provided and no authenticated user found.');
  }

  const userRef = firestore().collection('users').doc(fallbackUid);
  let docSnap = await userRef.get();

  // If user doc does not exist, create it using auth info
  if (!docSnap.exists) {
    const authUser = auth().currentUser || { uid: fallbackUid, email: '', displayName: '', photoURL: '', phoneNumber: '' };
    const newUserDoc: UserDoc = {
      uid: authUser.uid,
      name: authUser.displayName || '',
      email: authUser.email || '',
      phone: authUser.phoneNumber || '',
      avatar: authUser.photoURL || 'https://randomuser.me/api/portraits/men/1.jpg',
      addressBook: [],
      cart: [],
      orderHistory: [],
      createdAt: firestore.FieldValue.serverTimestamp() as any,
      updatedAt: firestore.FieldValue.serverTimestamp() as any,
      isVerified: false,
      lastLogin: firestore.FieldValue.serverTimestamp() as any,
      roles: ['buyer'],
    };

    await userRef.set(newUserDoc);
    docSnap = await userRef.get();
  }

  const data = docSnap.data() || {};
  let roles: UserDoc['roles'] = ['buyer'];
  if (Array.isArray(data.roles) && data.roles.includes('seller')) {
    roles = ['buyer', 'seller'];
  }

  // Always return a valid profile object
  return {
    uid: data.uid ?? fallbackUid,
    name: data.name ?? '',
    email: data.email ?? '',
    phone: data.phone ?? '',
    avatar: data.avatar ?? 'https://randomuser.me/api/portraits/men/1.jpg',
    addressBook: data.addressBook ?? [],
    cart: data.cart ?? [],
    orderHistory: data.orderHistory ?? [],
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
    isVerified: data.isVerified ?? false,
    lastLogin: data.lastLogin ?? null,
    roles,
    docId: docSnap.id,
  } as UserDoc & { docId: string };
};

// UPDATE USER PROFILE
export const updateUserProfile = async (
  uid: string,
  updates: Partial<Pick<UserDoc, 'name' | 'avatar'>>
) => {
  if (!uid) {throw new Error('No user id');}
  await firestore().collection('users').doc(uid).update({
    ...updates,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
  return true;
};

// GET USER ADDRESSES
export const getUserAddresses = async (uid: string): Promise<UserAddress[]> => {
  if (!uid) {return [];}
  const docSnap = await firestore().collection('users').doc(uid).get();
  if (!docSnap.exists) {return [];}
  const data = docSnap.data();
  return data?.addressBook ?? [];
};
