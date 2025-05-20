import { StyleSheet } from 'react-native';

const iconTabsStyles = StyleSheet.create({
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    minWidth: 50,
  },
  icon: {
    height: 24,
    width: 24,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
    width: '100%',
  },
});

export default iconTabsStyles;
