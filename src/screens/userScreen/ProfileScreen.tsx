import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import ProfileHeader from './ProfileHeader';
import AccountOption from './AccountOption';
import QuickLink from './QuickLink';
import LogoutButton from './LogoutButton';
import { getUserProfile, getCurrentUser } from '../../backend/services/authService';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootParamList } from '../../navigation/types';
import firestore from '@react-native-firebase/firestore';

const quickLinks = [
  { title: 'Help Center', icon: 'help-circle-outline' },
  { title: 'About Us', icon: 'information-circle-outline' },
  { title: 'Terms & Policies', icon: 'document-text-outline' },
];

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<{ name: string; email: string; avatar: string; roles?: string[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = getCurrentUser();
        if (!user) {
          setProfile({
            name: 'Guest',
            email: 'guest@example.com',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            roles: ['buyer'],
          });
          setLoading(false);
          return;
        }
        const data = await getUserProfile(user.uid);
        setProfile({
          name: data?.name || user.displayName || 'No Name',
          email: data?.email || user.email || 'No Email',
          avatar: data?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
          roles: data?.roles || ['buyer'],
        });
      } catch (error) {
        setProfile({
          name: 'Error',
          email: 'error@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          roles: ['buyer'],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // SELLER ENTRY LOGIC
  const handleSellOnFarmflow = useCallback(async () => {
    const user = getCurrentUser();
    if (!user?.uid) {
      Alert.alert('Please log in to continue.');
      return;
    }
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    const roles = userDoc.data()?.roles || ['buyer'];
    if (roles.includes('seller')) {
      // Go to seller stack
      navigation.navigate('SellerStack');
    } else {
      // Go to seller application
      navigation.navigate('SellerApplicationScreen');
    }
  }, [navigation]);

  // Account options
  const accountOptions = [
    { title: 'Orders', icon: 'cube-outline', screen: 'OrdersScreen' as keyof RootParamList },
    { title: 'Saved Address', icon: 'location-outline', screen: 'SavedAddressesScreen' as keyof RootParamList },
    { title: 'Edit Profile', icon: 'create-outline', screen: 'EditProfileScreen' as keyof RootParamList },
    { title: 'Sell on Farmflow', icon: 'storefront-outline' },
    { title: 'Become a Chef Star', icon: 'star-outline' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {loading || !profile ? (
        <ActivityIndicator size="large" color="#2874F0" style={styles.loadingIndicator} />
      ) : (
        <ProfileHeader
          {...profile}
          onEdit={() => navigation.navigate('EditProfileScreen')}
        />
      )}

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>My Account</Text>
        {accountOptions.map((item) => (
          <AccountOption
            key={item.title}
            title={item.title}
            icon={item.icon}
            onPress={() => {
              if (item.title === 'Sell on Farmflow') {
                handleSellOnFarmflow();
              } else if (item.screen) {
                navigation.navigate(item.screen);
              }
            }}
          />
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        {quickLinks.map((item) => (
          <QuickLink key={item.title} title={item.title} icon={item.icon} />
        ))}
      </View>

      <LogoutButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 14,
    marginBottom: 18,
    paddingVertical: 10,
    paddingHorizontal: 6,
    elevation: 1,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
    marginLeft: 8,
    marginTop: 8,
  },
  loadingIndicator: {
    marginTop: 60,
  },
});

export default ProfileScreen;
