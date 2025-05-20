import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AccountOptionProps = {
  title: string;
  icon: string;
  onPress?: () => void;
};

const COLORS = {
  actionIcon: '#2874F0',
  border: '#e0e0e0',
  card: '#fff',
  text: '#222',
};

const FONTS = {
  buttonText: { fontSize: 15, fontWeight: '500' as '500' },
};

const AccountOption: React.FC<AccountOptionProps> = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.actionButton} activeOpacity={0.8} onPress={onPress}>
    <View style={styles.actionIconContainer}>
      <Ionicons name={icon} size={22} color={COLORS.actionIcon} />
    </View>
    <Text style={styles.actionButtonText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#bbb" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginHorizontal: 4,
    backgroundColor: COLORS.card,
  },
  actionIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e3f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionButtonText: {
    flex: 1,
    ...FONTS.buttonText,
    color: COLORS.text,
  },
});

export default AccountOption;
