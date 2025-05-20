// screens/PlayVideoLogic.ts
import { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

export function useVideoLogic() {
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index || 0;
      setCurrentVisibleIndex(index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });

  return {
    currentVisibleIndex,
    flatListRef,
    onViewRef,
    viewConfigRef,
  };
}
