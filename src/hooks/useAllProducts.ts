import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import type { ProductDoc } from '../types/models';

export const useAllProducts = () => {
  const [products, setProducts] = useState<ProductDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .onSnapshot(snapshot => {
        setProducts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as ProductDoc[]
        );
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  return { products, loading };
};
