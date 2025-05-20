import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootParamList } from '../../navigation/types';

export function useOrderSuccessLogic() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  useEffect(() => {
    // Disable hardware back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);

    const timer = setTimeout(() => {
      // Reset navigation stack to HomeTabs
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      });
    }, 3000);

    return () => {
      clearTimeout(timer);
      backHandler.remove();
    };
  }, [navigation]);
}
