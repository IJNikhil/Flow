// import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// export interface UserAddress {
//   id: string;
//   recipient: string;
//   phone: string;
//   addressLine1: string;
//   addressLine2: string;
//   city: string;
//   state: string;
//   country: string;
//   pincode: string;
//   isDefault: boolean;
// }

// export interface CartItemType {
//   productId: string;
//   name: string;
//   quantity: number;
//   price: number;
//   image: string;
//   addedAt: FirebaseFirestoreTypes.Timestamp; // or Date
// }

// export interface OrderHistoryProductSummary {
//   productId: string;
//   name: string;
//   quantity: number;
//   price: number;
// }

// export interface OrderHistoryItem {
//   orderId: string;
//   placedAt: string;
//   products: OrderHistoryProductSummary[];
//   total: number;
//   status: string;
//   address: UserAddress;
// }


// export interface UserDoc {
//   uid: string;
//   name: string;
//   email: string;
//   phone: string;
//   avatar: string;
//   addressBook: UserAddress[];
//   cart: CartItemType[];
//   orderHistory: OrderHistoryItem[];
//   createdAt: FirebaseFirestoreTypes.Timestamp; // or Date
//   updatedAt: FirebaseFirestoreTypes.Timestamp; // or Date
//   isVerified: boolean;
//   lastLogin: FirebaseFirestoreTypes.Timestamp; // or Date
//   roles: string[];
// }

// export interface Product {
//   id: string;
//   name: string;
//   images: string[];
//   originalPrice: number;
//   price: number;
//   rating: number;
//   discountPercentage: number;
//   deliveryUpto: string;
//   stockLeft?: number;
//   categoryId?: string;
//   categoryLabel?: string;
//   itemId?: string;
//   itemName?: string;
//   unit?: string;
// }

// export interface CategoryItem {
//   id: string;
//   name: string;
//   products: Product[];
// }

// export interface Category {
//   id: string;
//   label: string;
//   icon: string;
//   items: CategoryItem[];
//   image?: string;
// }

// export type CheckoutParams = {
//   cart?: CartItemType[];
//   product?: CartItemType;
//   fromOrderFlow?: boolean;
//   address?: UserAddress;
// };










import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

// Address for users and sellers
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

// Cart item for users
export interface CartItemType {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  addedAt: FirebaseFirestoreTypes.Timestamp; // or Date
}

// Order product summary
export interface OrderHistoryProductSummary {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

// Order history for users
export interface OrderHistoryItem {
  orderId: string;
  placedAt: FirebaseFirestoreTypes.Timestamp; // or string
  products: OrderHistoryProductSummary[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  address: UserAddress;
}

// User document (buyer or buyer/seller)
export interface UserDoc {
  uid: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  roles: ['buyer'] | ['buyer', 'seller'];
  isVerified: boolean;
  lastLogin: FirebaseFirestoreTypes.Timestamp;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  addressBook: UserAddress[];
  cart: CartItemType[];
  orderHistory: OrderHistoryItem[];
}

// Seller document (separate collection)
export interface SellerDoc {
  uid: string;
  businessName: string;
  gstNumber: string;
  address: UserAddress;
  appliedAt: FirebaseFirestoreTypes.Timestamp;
  approvedAt?: FirebaseFirestoreTypes.Timestamp | null;
  approvedBy?: string | null;
  status: 'pending' | 'approved' | 'rejected';
}

// Category item (sub-category)
export interface CategoryItem {
  id: string;
  name: string;
}

// Category document
export interface CategoryDoc {
  id: string;
  label: string;
  icon: string;
  image?: string;
  items: CategoryItem[];
}

// Product document
export interface ProductDoc {
  id: string;
  name: string;
  images: string[];
  originalPrice: number;
  price: number;
  rating: number;
  discountPercentage: number;
  deliveryUpto: string;
  stockLeft: number;
  categoryId: string;
  categoryLabel: string;
  itemId: string;
  itemName: string;
  unit: string;
  sellerId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
}

// Order document
export interface OrderDoc {
  orderId: string;
  buyerId: string;
  sellerId: string;
  products: OrderHistoryProductSummary[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  address: UserAddress;
  placedAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  updatedBy: string;
}
