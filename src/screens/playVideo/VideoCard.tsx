import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { WebView } from 'react-native-webview';

const {height } = Dimensions.get('window');
const VIDEO_HEIGHT_RATIO = 0.6;

interface VideoPlayerProps {
  videoUrl: string;
  autoplay: boolean;
  id: string;
  isActive: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, autoplay, id, isActive }) => {
  return (
    <View style={styles.videoWrapper}>
      <Animated.View style={[
        styles.videoContainer,
        isActive && styles.activeVideoContainer,
      ]}>
        <WebView
          key={`${id}-${autoplay}`}
          source={{ uri: videoUrl }}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabledAndroid
          startInLoadingState
          originWhitelist={['*']}
        />
        {!isActive && <View style={styles.overlay} />}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoWrapper: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  videoContainer: {
    width: '100%',
    height: height * VIDEO_HEIGHT_RATIO,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#121212',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  activeVideoContainer: {
    borderColor: '#FFFFFF20',
    shadowColor: '#FFFFFF10',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  webview: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000040',
  },
});

export default VideoPlayer;
