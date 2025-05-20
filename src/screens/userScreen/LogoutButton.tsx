import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { logout } from '../../backend/services/authService';
import { CommonActions, useNavigation } from '@react-navigation/native';

const COLORS = {
  logoutBg: '#fff0f0',
  logoutText: '#e53935',
  logoutBorder: '#ffcdd2',
  shadow: '#00000010',
};

const FONTS = {
  logoutText: { fontSize: 15, fontWeight: '700' as '700' },
};

const LogoutButton: React.FC = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error: any) {
      Alert.alert('Logout failed', error.message || 'Please try again.');
    }
  };

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleLogout}
      activeOpacity={0.8}
    >
      <Ionicons name="log-out-outline" size={18} color={COLORS.logoutText} style={styles.logoutIcon} />
      <Text style={styles.logoutText}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 28,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 38,
    borderWidth: 1,
    borderColor: COLORS.logoutBorder,
    borderRadius: 24,
    backgroundColor: COLORS.logoutBg,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  logoutText: {
    ...FONTS.logoutText,
    color: COLORS.logoutText,
  },
  logoutIcon: {
    marginRight: 8,
  },
});

export default LogoutButton;
