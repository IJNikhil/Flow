import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import type { CategoryDoc } from '../types/models';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('categories')
      .onSnapshot(snapshot => {
        setCategories(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as CategoryDoc[]
        );
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  return { categories, loading };
};
