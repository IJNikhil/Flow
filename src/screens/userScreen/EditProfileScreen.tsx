import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { updateUserProfile, getCurrentUser } from '../../backend/services/authService';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen: React.FC = () => {
  const user = getCurrentUser();
  const [name, setName] = useState(user?.displayName || '');
  const [localAvatar, setLocalAvatar] = useState<string | null>(user?.avatar || null);
  const [loading, setLoading] = useState(false);

const handlePickImage = async () => {
  launchImageLibrary({ mediaType: 'photo' }, (response) => {
    if (response.didCancel) { return; }
    if (response.errorCode) {
      Alert.alert('Image Picker Error', response.errorMessage || 'Unknown error');
      return;
    }
    if (response.assets && response.assets.length > 0) {
      setLocalAvatar(response.assets[0].uri || null);
    }
  });
};

  const uploadImageToStorage = async (uri: string, uid: string) => {
    const ref = storage().ref(`avatars/${uid}.jpg`);
    await ref.putFile(uri);
    return await ref.getDownloadURL();
  };

const handleSave = async () => {
  if (!user?.uid) {
    Alert.alert('Not logged in');
    return;
  }
  setLoading(true);
  try {
    let avatarUrl = localAvatar;
    if (localAvatar && !localAvatar.startsWith('http')) {
      avatarUrl = await uploadImageToStorage(localAvatar, user.uid);
    }
    await updateUserProfile(user.uid, { name, avatar: avatarUrl ?? undefined });
    Alert.alert('Profile updated!');
  } catch (e: any) {
    Alert.alert('Error', e.message || 'Could not update profile');
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Avatar</Text>
      <TouchableOpacity style={styles.avatarPicker} onPress={handlePickImage}>
        {localAvatar ? (
          <Image source={{ uri: localAvatar }} style={styles.avatarImg} />
        ) : (
          <Text style={styles.avatarPlaceholder}>Select Image</Text>
        )}
      </TouchableOpacity>
      <Button title={loading ? 'Saving...' : 'Save'} onPress={handleSave} disabled={loading} />
      {loading && <ActivityIndicator style={styles.loadingIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 15, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    marginBottom: 12,
  },
  avatarPicker: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    marginTop: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    backgroundColor: '#f7f7f7',
  },
  avatarImg: { width: 80, height: 80, borderRadius: 40 },
  avatarPlaceholder: { color: '#888', fontSize: 14, padding: 25 },
  loadingIndicator: { marginTop: 10 },
});

export default EditProfileScreen;
