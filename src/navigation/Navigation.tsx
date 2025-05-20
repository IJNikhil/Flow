// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import SplashScreen from '../screens/auth/SplashScreen';
// import LoginScreen from '../screens/auth/LoginScreen';
// import SignUpScreen from '../screens/auth/SignUpScreen';
// import SearchScreen from '../screens/search/SearchScreen';
// import ProductListingScreen from '../screens/searchList/ProductListingScreen';
// import CartScreen from '../screens/cart/CartScreen';
// import HomeTabs from './HomeTabs';
// import { RootParamList } from './types';
// import ProductDetailScreen from '../screens/productDetail/ProductDetailScreen';
// import CheckoutDetailsScreen from '../screens/checkOut/CheckoutDetailsScreen';
// import OrderSuccessScreen from '../screens/orderPlaced/OrderSuccessScreen';
// import ChangeAddressScreen from '../screens/changeUserDetails/ChangeAddressScreen';
// import { CartProvider } from '../screens/cart/CartContext';
// import ProfileScreen from '../screens/userScreen/ProfileScreen';
// import EditProfileScreen from '../screens/userScreen/EditProfileScreen';
// import OrdersScreen from '../screens/userScreen/OrdersScreen';
// import SavedAddressesScreen from '../screens/userScreen/SavedAddressesScreen';

// const Stack = createNativeStackNavigator<RootParamList>();

// function NavigationStack() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen
//           name="Splash"
//           component={SplashScreen}
//           listeners={{ focus: () => console.log('Splash Screen focused') }}
//         />
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           listeners={{ focus: () => console.log('Login Screen focused') }}
//         />
//         <Stack.Screen
//           name="SignUp"
//           component={SignUpScreen}
//           listeners={{ focus: () => console.log('SignUp Screen focused') }}
//         />
//         <Stack.Screen
//           name="HomeTabs"
//           component={HomeTabs}
//           listeners={{ focus: () => console.log('HomeTabs Screen focused') }}
//         />
//         <Stack.Screen
//           name="SearchScreen"
//           component={SearchScreen}
//           listeners={{ focus: () => console.log('Search Screen focused') }}
//         />
//         <Stack.Screen
//           name="ProductListingScreen"
//           component={ProductListingScreen}
//           listeners={{ focus: () => console.log('ProductListingScreen focused') }}
//         />
//         <Stack.Screen
//           name="CartScreen"
//           component={CartScreen}
//           listeners={{ focus: () => console.log('CartScreen focused') }}
//         />
//         <Stack.Screen
//           name="ProductDetailScreen"
//           component={ProductDetailScreen}
//           listeners={{ focus: () => console.log('ProductDetailScreen focused') }}
//         />
//         <Stack.Screen
//           name="CheckoutDetailsScreen"
//           component={CheckoutDetailsScreen}
//           listeners={{ focus: () => console.log('CheckoutDetailsScreen focused') }}
//         />
//         <Stack.Screen
//           name="OrderSuccessScreen"
//           component={OrderSuccessScreen}
//           listeners={{ focus: () => console.log('OrderSuccessScreen focused') }}
//         />
//         <Stack.Screen
//           name="ChangeAddressScreen"
//           component={ChangeAddressScreen}
//           listeners={{ focus: () => console.log('ChangeAddressScreen focused') }}
//         />
//           <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
//       <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ title: 'My Orders' }} />
//       <Stack.Screen name="SavedAddressesScreen" component={SavedAddressesScreen} options={{ title: 'Saved Addresses' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// // Wrap the exported navigator with CartProvider for global cart access
// export default function Navigation() {
//   return (
//     <CartProvider>
//       <NavigationStack />
//     </CartProvider>
//   );
// }


import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SearchScreen from '../screens/search/SearchScreen';
import ProductListingScreen from '../screens/searchList/ProductListingScreen';
import CartScreen from '../screens/cart/CartScreen';
import HomeTabs from './HomeTabs';
import { RootParamList } from './types';
import ProductDetailScreen from '../screens/productDetail/ProductDetailScreen';
import CheckoutDetailsScreen from '../screens/checkOut/CheckoutDetailsScreen';
import OrderSuccessScreen from '../screens/orderPlaced/OrderSuccessScreen';
import ChangeAddressScreen from '../screens/changeUserDetails/ChangeAddressScreen';
import { CartProvider } from '../screens/cart/CartContext';
import ProfileScreen from '../screens/userScreen/ProfileScreen';
import EditProfileScreen from '../screens/userScreen/EditProfileScreen';
import OrdersScreen from '../screens/userScreen/OrdersScreen';
import SavedAddressesScreen from '../screens/userScreen/SavedAddressesScreen';
import SellerProductListScreen from '../screens/seller/sellerScreen/SellerProductListScreen';
import SellerAddProductScreen from '../screens/seller/sellerScreen/SellerAddProductScreen';
import SellerEditProductScreen from '../screens/seller/sellerScreen/SellerEditProductScreen';
import SellerApplicationScreen from '../screens/seller/sellerScreen/SellerApplicationScreen';


const Stack = createNativeStackNavigator<RootParamList>();

function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          listeners={{ focus: () => console.log('Splash Screen focused') }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          listeners={{ focus: () => console.log('Login Screen focused') }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          listeners={{ focus: () => console.log('SignUp Screen focused') }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          listeners={{ focus: () => console.log('HomeTabs Screen focused') }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          listeners={{ focus: () => console.log('Search Screen focused') }}
        />
        <Stack.Screen
          name="ProductListingScreen"
          component={ProductListingScreen}
          listeners={{ focus: () => console.log('ProductListingScreen focused') }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          listeners={{ focus: () => console.log('CartScreen focused') }}
        />
        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          listeners={{ focus: () => console.log('ProductDetailScreen focused') }}
        />
        <Stack.Screen
          name="CheckoutDetailsScreen"
          component={CheckoutDetailsScreen}
          listeners={{ focus: () => console.log('CheckoutDetailsScreen focused') }}
        />
        <Stack.Screen
          name="OrderSuccessScreen"
          component={OrderSuccessScreen}
          listeners={{ focus: () => console.log('OrderSuccessScreen focused') }}
        />
        <Stack.Screen
          name="ChangeAddressScreen"
          component={ChangeAddressScreen}
          listeners={{ focus: () => console.log('ChangeAddressScreen focused') }}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ title: 'Edit Profile', headerShown: true }} />
        <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ title: 'My Orders', headerShown: true }} />
        <Stack.Screen name="SavedAddressesScreen" component={SavedAddressesScreen} options={{ title: 'Saved Addresses', headerShown: true }} />

        {/* Seller screens */}
        <Stack.Screen name="SellerProductListScreen" component={SellerProductListScreen} options={{ title: 'My Products', headerShown: true }} />
        <Stack.Screen name="SellerAddProductScreen" component={SellerAddProductScreen} options={{ title: 'Add Product', headerShown: true }} />
        <Stack.Screen name="SellerEditProductScreen" component={SellerEditProductScreen} options={{ title: 'Edit Product', headerShown: true }} />
        <Stack.Screen name="SellerApplicationScreen" component={SellerApplicationScreen} options={{ title: 'Apply as Seller', headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Wrap the exported navigator with CartProvider for global cart access
export default function Navigation() {
  return (
    <CartProvider>
      <NavigationStack />
    </CartProvider>
  );
}
