// import { CartItemType, Product, UserAddress } from '../types/models';

// export type RootParamList = {
//   Splash: undefined;
//   Login: undefined;
//   HomeTabs: undefined;
//   SignUp: undefined;
//   SearchScreen: undefined;
//   ProductListingScreen: { products: Product[]; title: string };
//   CartScreen: undefined;
//   ProductDetailScreen: { product: Product };
//   CheckoutDetailsScreen:
//     | {
//         cart: CartItemType[];
//         fromOrderFlow?: boolean;
//         address?: UserAddress;
//       }
//     | {
//         product: Product;
//         fromOrderFlow?: boolean;
//         address?: UserAddress;
//       };
//   OrderSuccessScreen: { orderId: string };

//   ChangeAddressScreen: {
//     addresses: UserAddress[];
//     selectedAddress?: UserAddress;
//     cart?: CartItemType[];
//     product?: Product;
//     fromCheckout?: boolean;
//   };
//   OrdersScreen: undefined;
//   SavedAddressesScreen: undefined;
//   EditProfileScreen: undefined;
//   ProfileScreen: undefined;
// };




import { CartItemType, ProductDoc, UserAddress } from '../types/models';

export type RootParamList = {
  Splash: undefined;
  Login: undefined;
  HomeTabs: undefined;
  SignUp: undefined;
  SearchScreen: undefined;
  ProductListingScreen: {
    categoryId: string;
    categoryLabel: string;
    itemId: string;
    itemName: string;
  };
  SearchResultsScreen: {
    products: ProductDoc[];
    title: string;
  };
  CartScreen: undefined;
  ProductDetailScreen: { product: ProductDoc };
  CheckoutDetailsScreen:
    | {
        cart: CartItemType[];
        fromOrderFlow?: boolean;
        address?: UserAddress;
      }
    | {
        product: ProductDoc;
        fromOrderFlow?: boolean;
        address?: UserAddress;
      };
  OrderSuccessScreen: { orderId: string };
  ChangeAddressScreen: {
    addresses: UserAddress[];
    selectedAddress?: UserAddress;
    cart?: CartItemType[];
    product?: ProductDoc;
    fromCheckout?: boolean;
  };
  OrdersScreen: undefined;
  SavedAddressesScreen: undefined;
  EditProfileScreen: undefined;
  ProfileScreen: undefined;

  // Seller screens (as a nested stack)
  SellerStack: undefined;

  // If you want to keep direct access too, you can keep these:
  SellerProductListScreen: undefined;
  SellerAddProductScreen: undefined;
  SellerEditProductScreen: { product: ProductDoc };
  SellerApplicationScreen: undefined;
};
