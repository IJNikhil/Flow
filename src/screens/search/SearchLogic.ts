import { useState, useRef, useEffect } from 'react';
import { Keyboard, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootParamList } from '../../navigation/types';
import { useAllProducts } from '../../hooks/useAllProducts';
import type { ProductDoc } from '../../types/models';

export const useSearchLogic = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const inputRef = useRef<TextInput | null>(null);

  // Fetch all products for search
  const { products: allProducts } = useAllProducts();

  useEffect(() => {
    console.log('[SearchScreen] Mounted');
    return () => {
      console.log('[SearchScreen] Unmounted');
    };
  }, []);

  const handlePress = () => {
    setIsEditable(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSearchSubmit = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 0) {
      Keyboard.dismiss();
      // Filter products by search query
      const filteredProducts: ProductDoc[] = allProducts.filter((p) =>
        p.name.toLowerCase().includes(trimmedQuery.toLowerCase())
      );
      navigation.navigate('SearchResultsScreen', {
        products: filteredProducts,
        title: trimmedQuery,
      });
    } else {
      Alert.alert('Search Required', 'Please enter a search query.');
    }
  };

  const handleChangeText = (text: string) => {
    setSearchQuery(text);
  };

  return {
    isEditable,
    setIsEditable,
    searchQuery,
    setSearchQuery,
    inputRef,
    handlePress,
    handleSearchSubmit,
    handleChangeText,
  };
};
