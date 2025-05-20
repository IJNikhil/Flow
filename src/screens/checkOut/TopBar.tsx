/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TopBarProps {
  onBack: () => void;
  title?: string;
}

const TopBar: React.FC<TopBarProps> = ({ onBack, title = 'Order Summary' }) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <Icon
          name={I18nManager.isRTL ? 'chevron-forward' : 'chevron-back'}
          size={24}
          color="#333"
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {typeof title === 'string' ? title : 'Order Summary'}
      </Text>
      <View style={{ width: 24 }} />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  topBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TopBar;
