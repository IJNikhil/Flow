import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellerDashboardScreen from './sellerScreen/SellerDashboardScreen';
import SellerAddProductScreen from './sellerScreen/SellerAddProductScreen';
import SellerEditProductScreen from './sellerScreen/SellerEditProductScreen';
import SellerOrdersScreen from './sellerScreen/SellerOrdersScreen';
import SellerApplicationScreen from './sellerScreen/SellerApplicationScreen';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

export type SellerStackParamList = {
  SellerDashboardScreen: undefined;
  SellerAddProductScreen: undefined;
  SellerEditProductScreen: { product: any };
  SellerOrdersScreen: undefined;
  SellerApplicationScreen: undefined;
};

const Stack = createNativeStackNavigator<SellerStackParamList>();

const SellerStack = () => {
  const navigationRef = useNavigationContainerRef();

  React.useEffect(() => {
    if (!__DEV__) return;
    const unsubscribe = navigationRef.addListener('state', () => {
      const route = navigationRef.getCurrentRoute();
      if (route) {
        // eslint-disable-next-line no-console
        console.log(`[SellerStack] Navigated to: ${route.name}`, route.params);
      }
    });
    return unsubscribe;
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SellerDashboardScreen">
        <Stack.Screen
          name="SellerDashboardScreen"
          component={SellerDashboardScreen}
          options={{ title: 'My Products' }}
        />
        <Stack.Screen
          name="SellerAddProductScreen"
          component={SellerAddProductScreen}
          options={{ title: 'Add Product' }}
        />
        <Stack.Screen
          name="SellerEditProductScreen"
          component={SellerEditProductScreen}
          options={{ title: 'Edit Product' }}
        />
        <Stack.Screen
          name="SellerOrdersScreen"
          component={SellerOrdersScreen}
          options={{ title: 'My Orders' }}
        />
        <Stack.Screen
          name="SellerApplicationScreen"
          component={SellerApplicationScreen}
          options={{ title: 'Apply as Seller' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SellerStack;
