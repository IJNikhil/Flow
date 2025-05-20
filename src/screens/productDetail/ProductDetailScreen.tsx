import React, { useLayoutEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../navigation/types';
import ProductDetailUI from './ProductDetailUI';
import { useProductDetailLogic } from './ProductDetailLogic';
import type { ProductDoc } from '../../types/models';

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const { product } = route.params as { product: ProductDoc };
  const {
    product: detailProduct,
    loading,
    imgIndex,
    setImgIndex,
    cartCount,
    handleAddToCart,
  } = useProductDetailLogic(product);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Product Details',
    });
  }, [navigation]);

  return (
    <ProductDetailUI
      product={detailProduct}
      loading={loading}
      imgIndex={imgIndex}
      cartCount={cartCount}
      setImgIndex={setImgIndex}
      onAddToCart={handleAddToCart}
      onBuyNow={() =>
        detailProduct &&
        navigation.navigate('CheckoutDetailsScreen', { product: detailProduct })
      }
      onCartPress={() => navigation.navigate('CartScreen')}
    />
  );
};

export default ProductDetailScreen;
