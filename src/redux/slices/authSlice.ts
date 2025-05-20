import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// Use your existing models for consistency
export interface UserAddress {
  id: string;
  recipient: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault: boolean;
}

export interface CartItemType {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  addedAt: FirebaseFirestoreTypes.Timestamp | Date;
}

export interface OrderHistoryProductSummary {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderHistoryItem {
  orderId: string;
  placedAt: FirebaseFirestoreTypes.Timestamp | Date;
  products: OrderHistoryProductSummary[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  address: UserAddress;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  addressBook: UserAddress[];
  cart: CartItemType[];
  orderHistory: OrderHistoryItem[];
  createdAt?: FirebaseFirestoreTypes.Timestamp | Date;
  updatedAt?: FirebaseFirestoreTypes.Timestamp | Date;
  isVerified: boolean;
  lastLogin?: FirebaseFirestoreTypes.Timestamp | Date;
  roles: ['buyer'] | ['buyer', 'seller'];
  docId?: string;
}

interface User {
  uid: string;
  email: string | null;
  emailVerified?: boolean;
  displayName?: string | null;
  phone?: string | null;
  avatar?: string | null;
}

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  userProfile: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.userProfile = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.userProfile = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

export const { setAuthLoading, setAuthError, setUser, setUserProfile, logout } = authSlice.actions;
export default authSlice.reducer;
