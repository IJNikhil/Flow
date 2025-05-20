import React from 'react';
import { View, Image, Text, ImageSourcePropType } from 'react-native';
import iconTabsStyles from './iconTabsStyles';
import COLORS from '../colors';

type TabIconWithLabelProps = {
  source: ImageSourcePropType;
  label: string;
  focused: boolean;
};

const TabIconWithLabel: React.FC<TabIconWithLabelProps> = ({
  source,
  label,
  focused,
}) => {
  const tintColor = focused ? COLORS.activeTab : COLORS.inactiveTab;

  // Log whenever the tab icon is rendered or focused
  console.log(`TabIconWithLabel rendered for ${label} with focus: ${focused}`);

  return (
    <View style={iconTabsStyles.tabItem}>
      <Image
        source={source}
        style={[iconTabsStyles.icon, { tintColor }]}
        resizeMode="contain"
      />
      <Text
        style={[iconTabsStyles.label, { color: tintColor }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </View>
  );
};

export default TabIconWithLabel;
