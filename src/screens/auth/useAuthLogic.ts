// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import { useCallback, useState } from 'react';
// import { RootState } from '../../redux/store';
// import {
//   setAuthLoading,
//   setAuthError,
//   setUser,
//   setUserProfile,
//   logout as logoutAction,
// } from '../../redux/slices/authSlice';
// import * as authService from '../../backend/services/authService';
// // import { checkCategoriesExist } from '../../backend/services/categoryService'; // Uncomment if needed

// export const useAuthLogic = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation<any>();
//   const { loading, error, user, userProfile, isLoggedIn } = useSelector(
//     (state: RootState) => state.auth
//   );
//   const [verificationSent, setVerificationSent] = useState(false);

//   const handleLogin = useCallback(
//     async (email: string, password: string) => {
//       dispatch(setAuthLoading(true));
//       dispatch(setAuthError(null));
//       try {
//         await authService.login(email, password);
//         const userData = authService.getCurrentUser();

//         if (!userData || !userData.emailVerified) {
//           dispatch(
//             setAuthError('Please verify your email before logging in.')
//           );
//           await authService.logout();
//           dispatch(setAuthLoading(false));
//           return;
//         }

//         dispatch(setUser(userData));
//         const userProfileData = await authService.getUserProfile(userData.uid);
//         dispatch(setUserProfile(userProfileData));

//         // If you want to check categories, uncomment below:
//         // const categoriesExist = await checkCategoriesExist();
//         // if (!categoriesExist) {
//         //   dispatch(
//         //     setAuthError('Categories are missing. Please contact admin.')
//         //   );
//         //   dispatch(setAuthLoading(false));
//         //   return;
//         // }

//         navigation.replace('HomeTabs');
//       } catch (err: any) {
//         if (
//           err.code === 'auth/invalid-credential' ||
//           err.code === 'auth/wrong-password' ||
//           err.code === 'auth/user-not-found'
//         ) {
//           dispatch(setAuthError('Invalid email or password.'));
//         } else {
//           dispatch(setAuthError(err?.message || 'Login failed'));
//         }
//       } finally {
//         dispatch(setAuthLoading(false));
//       }
//     },
//     [dispatch, navigation]
//   );

//   const handleRegister = useCallback(
//     async (name: string, email: string, password: string, phone: string = '', avatar: string = '') => {
//       dispatch(setAuthLoading(true));
//       dispatch(setAuthError(null));
//       setVerificationSent(false);
//       try {
//         await authService.signUp(email, password, name, phone, avatar);
//         setVerificationSent(true);
//       } catch (err: any) {
//         if (err.code === 'auth/email-already-in-use') {
//           dispatch(setAuthError('That email address is already in use.'));
//         } else if (err.code === 'auth/invalid-email') {
//           dispatch(setAuthError('That email address is invalid.'));
//         } else if (err.code === 'auth/weak-password') {
//           dispatch(setAuthError('Password is too weak.'));
//         } else {
//           dispatch(setAuthError(err?.message || 'Registration failed'));
//         }
//       } finally {
//         dispatch(setAuthLoading(false));
//       }
//     },
//     [dispatch]
//   );

//   const handleLogout = useCallback(async () => {
//     dispatch(setAuthLoading(true));
//     try {
//       await authService.logout();
//       dispatch(logoutAction());
//       navigation.replace('Login');
//     } catch (err: any) {
//       dispatch(setAuthError(err?.message || 'Logout failed'));
//     } finally {
//       dispatch(setAuthLoading(false));
//     }
//   }, [dispatch, navigation]);

//   return {
//     loading,
//     error,
//     user,
//     userProfile,
//     isLoggedIn,
//     handleLogin,
//     handleRegister,
//     handleLogout,
//     verificationSent,
//   };
// };




import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { RootState } from '../../redux/store';
import {
  setAuthLoading,
  setAuthError,
  setUser,
  setUserProfile,
  logout as logoutAction,
} from '../../redux/slices/authSlice';
import * as authService from '../../backend/services/authService';
import { convertTimestamps } from '../../backend/utils/firestore';

export const useAuthLogic = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { loading, error, user, userProfile, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );
  const [verificationSent, setVerificationSent] = useState(false);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      dispatch(setAuthLoading(true));
      dispatch(setAuthError(null));
      try {
        await authService.login(email, password);
        const userData = authService.getCurrentUser();

        if (!userData || !userData.emailVerified) {
          dispatch(
            setAuthError('Please verify your email before logging in.')
          );
          await authService.logout();
          dispatch(setAuthLoading(false));
          return;
        }

        dispatch(setUser(userData));
        const userProfileData = await authService.getUserProfile(userData.uid);
        // Ensure roles are always ['buyer'] or ['buyer', 'seller']
        if (
          !userProfileData ||
          !Array.isArray(userProfileData.roles) ||
          (userProfileData.roles.length === 1 && userProfileData.roles[0] !== 'buyer') ||
          (userProfileData.roles.length === 2 && (!userProfileData.roles.includes('buyer') || !userProfileData.roles.includes('seller')))
        ) {
          dispatch(setAuthError('Invalid user roles.'));
          dispatch(setAuthLoading(false));
          return;
        }
        const serializableProfile = convertTimestamps(userProfileData);
        dispatch(setUserProfile(serializableProfile));
        navigation.replace('HomeTabs');
      } catch (err: any) {
        if (
          err.code === 'auth/invalid-credential' ||
          err.code === 'auth/wrong-password' ||
          err.code === 'auth/user-not-found'
        ) {
          dispatch(setAuthError('Invalid email or password.'));
        } else {
          dispatch(setAuthError(err?.message || 'Login failed'));
        }
      } finally {
        dispatch(setAuthLoading(false));
      }
    },
    [dispatch, navigation]
  );

  const handleRegister = useCallback(
    async (name: string, email: string, password: string, phone: string = '', avatar: string = '') => {
      dispatch(setAuthLoading(true));
      dispatch(setAuthError(null));
      setVerificationSent(false);
      try {
        await authService.signUp(email, password, name, phone, avatar);
        setVerificationSent(true);
      } catch (err: any) {
        if (err.code === 'auth/email-already-in-use') {
          dispatch(setAuthError('That email address is already in use.'));
        } else if (err.code === 'auth/invalid-email') {
          dispatch(setAuthError('That email address is invalid.'));
        } else if (err.code === 'auth/weak-password') {
          dispatch(setAuthError('Password is too weak.'));
        } else {
          dispatch(setAuthError(err?.message || 'Registration failed'));
        }
      } finally {
        dispatch(setAuthLoading(false));
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(async () => {
    dispatch(setAuthLoading(true));
    try {
      await authService.logout();
      dispatch(logoutAction());
      navigation.replace('Login');
    } catch (err: any) {
      dispatch(setAuthError(err?.message || 'Logout failed'));
    } finally {
      dispatch(setAuthLoading(false));
    }
  }, [dispatch, navigation]);

  return {
    loading,
    error,
    user,
    userProfile,
    isLoggedIn,
    handleLogin,
    handleRegister,
    handleLogout,
    verificationSent,
  };
};
