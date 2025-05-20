// screens/PlayVideoUI.tsx
import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { convertShortsToEmbed } from './additional/youtube';
import VideoPlayer from './VideoCard';
import { videoData } from './videos';

const { height } = Dimensions.get('window');
const VIDEO_HEIGHT_RATIO = 0.6;

type PlayVideoUIProps = {
  currentVisibleIndex: number;
  flatListRef: React.RefObject<FlatList>;
  onViewRef: React.MutableRefObject<({ viewableItems }: { viewableItems: ViewToken[] }) => void>;
  viewConfigRef: React.MutableRefObject<{ viewAreaCoveragePercentThreshold: number }>;
};

const PlayVideoUI: React.FC<PlayVideoUIProps> = ({
  currentVisibleIndex,
  flatListRef,
  onViewRef,
  viewConfigRef,
}) => {
  const renderItem = ({ item, index }: { item: { id: string; url: string }; index: number }) => {
    const shouldAutoplay = index === currentVisibleIndex;
    const videoUri = convertShortsToEmbed(item.url, shouldAutoplay);
    return (
      <VideoPlayer
        videoUrl={videoUri}
        autoplay={shouldAutoplay}
        id={item.id}
        isActive={shouldAutoplay}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        horizontal={false}
        snapToInterval={height * VIDEO_HEIGHT_RATIO + 32}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        contentContainerStyle={styles.listPadding}
        maxToRenderPerBatch={3}
        initialNumToRender={3}
        windowSize={3}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  listPadding: {
    paddingVertical: 16,
  },
});

export default PlayVideoUI;
