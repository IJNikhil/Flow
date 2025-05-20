import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useHomeScreenLogic = () => {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [gradientOpacity, setGradientOpacity] = useState(1);

  const loadMoreItems = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, i) => `Item ${items.length + i + 1}`);
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setItems(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
      setRefreshing(false);
    }, 1500);
  };

  const handleScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    setGradientOpacity(Math.max(0, 1 - y / 200));
  };

  return {
    insets,
    items,
    setItems,
    loading,
    setLoading,
    refreshing,
    setRefreshing,
    gradientOpacity,
    setGradientOpacity,
    loadMoreItems,
    onRefresh,
    handleScroll,
  };
};
