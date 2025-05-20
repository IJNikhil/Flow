import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Platform } from 'react-native';

import HomeScreen from '../screens/homeScreen/HomeScreen';
import Category from '../screens/category/Category';
import PlayVideoScreen from '../screens/playVideo/PlayVideoScreen';
import ProfileScreen from '../screens/userScreen/ProfileScreen';
import CartScreen from '../screens/cart/CartScreen';
import TabIconWithLabel from './TabIconWithLabel';
import COLORS from '../colors';
import SCREENS from '../screens/screenNames';
import TABS from './tabs';

const Tab = createBottomTabNavigator();

const HomeTabs: React.FC = () => {
  const insets = useSafeAreaInsets();

  console.log('HomeTabs component rendered'); // Log when the tabs component is rendered

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
            height: 60 + insets.bottom,
          },
        ],
        tabBarShowLabel: false,
      }}
    >
      {TABS.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={getScreenComponent(tab.name)}
          listeners={{
            focus: () => console.log(`${tab.name} focused`), // Log when a tab is focused
          }}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused }) => (
              <TabIconWithLabel
                source={tab.icon}
                label={tab.label}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

// Function to get screen component for each tab
const getScreenComponent = (screenName: string) => {
  switch (screenName) {
    case SCREENS.HOME:
      return HomeScreen;
    case SCREENS.PLAY:
      return PlayVideoScreen;
    case SCREENS.CATEGORY:
      return Category;
    case SCREENS.USER:
      return ProfileScreen;
    case SCREENS.TROLLEY:
      return CartScreen; // Ensure CartScreen exists in your project
    default:
      return HomeScreen;
  }
};

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.backgroundWhite,
    borderTopColor: COLORS.borderGray,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default HomeTabs;
