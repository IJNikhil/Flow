// import React, { useEffect } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { setUser, setUserProfile } from '../../redux/slices/authSlice';
// import * as authService from '../../backend/services/authService';
// import { convertTimestamps } from '../../backend/utils/firestore';

// const SplashScreen = () => {
//   const navigation = useNavigation<any>();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const user = authService.getCurrentUser();
//         if (user && user.emailVerified) {
//           dispatch(setUser(user));
// const userProfile = await authService.getUserProfile(user.uid);
// const serializableProfile = convertTimestamps(userProfile);
// dispatch(setUserProfile(serializableProfile));
//           // dispatch(setUserProfile(userProfile));
//           navigation.replace('HomeTabs');
//         } else {
//           navigation.replace('Login');
//         }
//       } catch {
//         navigation.replace('Login');
//       }
//     };
//     setTimeout(checkAuth, 1500);
//   }, [dispatch, navigation]);

//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" />
//       <Text>Loading...</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });

// export default SplashScreen;

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser, setUserProfile } from '../../redux/slices/authSlice';
import * as authService from '../../backend/services/authService';
import { convertTimestamps } from '../../backend/utils/firestore';
import { persistor } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PURGE_KEY = 'hasPurgedReduxStore';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    const purgeIfNeeded = async () => {
      try {
        const alreadyPurged = await AsyncStorage.getItem(PURGE_KEY);
        if (!alreadyPurged) {
          await persistor.purge();
          await AsyncStorage.setItem(PURGE_KEY, 'true');
        }
      } catch (e) {}
    };

    const checkAuth = async () => {
      await purgeIfNeeded();
      try {
        const user = authService.getCurrentUser();
        if (user && user.emailVerified) {
          dispatch(setUser(user));
          const userProfile = await authService.getUserProfile(user.uid);
          const serializableProfile = convertTimestamps(userProfile);
          dispatch(setUserProfile(serializableProfile));
          navigation.replace('HomeTabs');
        } else {
          navigation.replace('Login');
        }
      } catch {
        navigation.replace('Login');
      }
    };
    setTimeout(checkAuth, 1500);
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SplashScreen;
