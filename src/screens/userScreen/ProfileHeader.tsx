import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const COLORS = {
  primary: '#2874F0',
};

const FONTS = {
  title: { fontSize: 22, fontWeight: '700' as '700' },
  body: { fontSize: 14, fontWeight: '400' as '400' },
};

export type ProfileHeaderProps = {
  name: string;
  email: string;
  avatar: string;
  onEdit?: () => void;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, avatar, onEdit }) => (
  <View style={styles.headerBanner}>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
    <View style={styles.headerRow}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.headerTextBlock}>
        <Text style={styles.headerName}>{name}</Text>
        <Text style={styles.headerEmail}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
        <Ionicons name="create-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
    <View style={styles.bannerRow}>
      <Ionicons name="star" size={16} color="#ffe082" />
      <Text style={styles.bannerText}>Flipkart Plus Member</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerBanner: {
    backgroundColor: COLORS.primary,
    paddingBottom: 20,
    paddingTop: 36,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextBlock: {
    flex: 1,
    marginLeft: 16,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  headerName: {
    ...FONTS.title,
    color: '#fff',
    marginBottom: 3,
  },
  headerEmail: {
    ...FONTS.body,
    color: '#e3e3e3',
  },
  editIcon: {
    padding: 8,
    backgroundColor: '#2874F0aa',
    borderRadius: 20,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: '#1a53a3',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  bannerText: {
    color: '#ffe082',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 13,
  },
});

export default ProfileHeader;
