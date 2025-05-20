import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../navigation/types';
import ProductListingUI from './ProductListingUI';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import { useProductListingLogic } from './ProductListingLogic';

const styles = StyleSheet.create({
  headerCartIcon: {
    marginRight: 16,
  },
});

const ProductListingScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootParamList, 'ProductListingScreen'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const { categoryLabel, itemName } = route.params;
  const { cart, loading, list } = useProductListingLogic();

  // Move headerRight out of render to avoid unstable nested component
  const HeaderCartIcon = React.useCallback(
    () => <Icon name="shopping-cart" size={22} color="#2874F0" style={styles.headerCartIcon} />,
    []
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: HeaderCartIcon,
      headerTitle: `${categoryLabel} - ${itemName}`,
    });
  }, [navigation, categoryLabel, itemName, HeaderCartIcon]);

  return (
    <ProductListingUI
      cartCount={cart.length}
      searchText={''}
      setSearchText={() => {}}
      loading={loading}
      list={list}
      onCartPress={() => navigation.navigate('CartScreen')}
      onProductPress={(product) =>
        navigation.navigate('ProductDetailScreen', { product })
      }
    />
  );
};

export default ProductListingScreen;
