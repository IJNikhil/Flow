import { useState, useRef } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent, ScrollView } from 'react-native';
import { useCategories } from '../../hooks/useCategories';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../../navigation/types';
import type { CategoryItem } from '../../types/models';

export type SectionLayout = { top: number; bottom: number };

export function useCategoryLogic() {
  const { categories, loading } = useCategories();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView | null>(null);
  const categoryRefs = useRef<Array<any>>([]);
  const [categoryLayouts, setCategoryLayouts] = useState<SectionLayout[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const handleCategoryLayout = (idx: number) => (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setCategoryLayouts((prev) => {
      const next = [...prev];
      next[idx] = { top: y, bottom: y + height };
      return next;
    });
  };

  const scrollToCategory = (idx: number) => {
    if (!categories.length) {
      return;
    }
    if (idx === categories.length - 1 && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
      setSelectedIndex(idx);
      return;
    }
    const layout = categoryLayouts[idx];
    if (layout && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: layout.top, animated: true });
      setSelectedIndex(idx);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    if (scrollY + layoutHeight >= contentHeight - 20) {
      if (selectedIndex !== categories.length - 1) {
        setSelectedIndex(categories.length - 1);
      }
      return;
    }

    for (let i = 0; i < categoryLayouts.length - 1; i++) {
      const layout = categoryLayouts[i];
      if (layout && scrollY >= layout.top - 10 && scrollY < layout.bottom - 10) {
        if (selectedIndex !== i) {
          setSelectedIndex(i);
        }
        return;
      }
    }
  };

  // Pass categoryId, categoryLabel, and item to the product listing screen
  const onProductCollectionPress = (categoryId: string, categoryLabel: string, item: CategoryItem) => {
    navigation.navigate('ProductListingScreen', {
      categoryId,
      categoryLabel,
      itemId: item.id,
      itemName: item.name,
    });
  };

  return {
    categories,
    loading,
    selectedIndex,
    setSelectedIndex,
    scrollViewRef,
    categoryRefs,
    categoryLayouts,
    setCategoryLayouts,
    handleCategoryLayout,
    scrollToCategory,
    handleScroll,
    onProductCollectionPress,
  };
}
