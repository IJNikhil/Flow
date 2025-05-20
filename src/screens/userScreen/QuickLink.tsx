import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type QuickLinkProps = {
  title: string;
  icon: string;
  onPress?: () => void;
};

const COLORS = {
  iconColor: '#2874F0',
  border: '#e0e0e0',
  card: '#fff',
  text: '#222',
};

const FONTS = {
  body: { fontSize: 14, fontWeight: '400' as '400' },
};

const QuickLink: React.FC<QuickLinkProps> = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.quickLink} activeOpacity={0.8} onPress={onPress}>
    <Ionicons name={icon} size={18} color={COLORS.iconColor} style={styles.iconLeft} />
    <Text style={styles.quickLinkText}>{title}</Text>
    <Ionicons name="chevron-forward" size={16} color="#bbb" style={styles.iconRight} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  quickLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    marginHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  quickLinkText: {
    ...FONTS.body,
    color: COLORS.text,
    fontWeight: '500',
  },
  iconLeft: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 'auto',
  },
});

export default QuickLink;
