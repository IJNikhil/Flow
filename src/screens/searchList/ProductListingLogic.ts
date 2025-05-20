import { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootParamList } from '../../navigation/types';
import { CartContext } from '../cart/CartContext';
import firestore from '@react-native-firebase/firestore';
import type { ProductDoc } from '../../types/models';

export const useProductListingLogic = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const route = useRoute<RouteProp<RootParamList, 'ProductListingScreen'>>();
  const { cart } = useContext(CartContext);

  const { categoryId, itemId } = route.params;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductDoc[]>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection('products')
      .where('categoryId', '==', categoryId)
      .where('itemId', '==', itemId)
      .onSnapshot(snapshot => {
        setProducts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as ProductDoc[]
        );
        setLoading(false);
      });
    return () => unsubscribe();
  }, [categoryId, itemId]);

  return {
    navigation,
    cart,
    searchText: '', // Not needed for this flow
    setSearchText: () => {},
    loading,
    list: products,
  };
};
