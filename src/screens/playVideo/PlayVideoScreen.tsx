// screens/PlayVideoScreen.tsx
import React from 'react';
import PlayVideoUI from './PlayVideoUI';
import { useVideoLogic } from './PlayVideoLogic';

const PlayVideoScreen = () => {
  const videoLogic = useVideoLogic();

  return (
    <PlayVideoUI
      currentVisibleIndex={videoLogic.currentVisibleIndex}
      flatListRef={videoLogic.flatListRef}
      onViewRef={videoLogic.onViewRef}
      viewConfigRef={videoLogic.viewConfigRef}
    />
  );
};

export default PlayVideoScreen;
