import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootParamList } from '../../navigation/types';
import type { RouteProp } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import type { UserAddress } from '../../types/models';

export function useChangeAddressLogic() {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const route = useRoute<RouteProp<RootParamList, 'ChangeAddressScreen'>>();

  const user = auth().currentUser;
  const userId = user?.uid;

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    if (!userId) {
      setAddresses([]);
      setLoading(false);
      setSelectedIndex(-1);
      return;
    }
    setLoading(true);
    const userDocRef = firestore().collection('users').doc(userId);
    const unsubscribe = userDocRef.onSnapshot((docSnap) => {
      const data = docSnap.data();
      const fetchedAddresses: UserAddress[] = data?.addressBook ?? [];
      setAddresses(fetchedAddresses);

      let idx = -1;
      // 1. If a selectedAddress is provided in route params, use that
      if (route.params?.selectedAddress) {
        idx = fetchedAddresses.findIndex(
          (a) => a.id === route.params.selectedAddress?.id
        );
      }
      // 2. Otherwise, select the default address if it exists
      if (idx === -1) {
        idx = fetchedAddresses.findIndex((a) => a.isDefault);
      }
      setSelectedIndex(idx);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId, route.params?.selectedAddress]);

  // Form and edit state
  const [showAddNew, setShowAddNew] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Address fields
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const resetForm = () => {
    setRecipient('');
    setPhone('');
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setStateName('');
    setCountry('');
    setPincode('');
    setIsDefault(false);
    setEditIndex(null);
  };

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    setShowAddNew(false);
    resetForm();
  };

  const handleAddNew = () => {
    setShowAddNew(true);
    resetForm();
  };

  const handleEdit = (idx: number) => {
    const addr = addresses[idx];
    setEditIndex(idx);
    setRecipient(addr.recipient);
    setPhone(addr.phone);
    setAddressLine1(addr.addressLine1);
    setAddressLine2(addr.addressLine2);
    setCity(addr.city);
    setStateName(addr.state);
    setCountry(addr.country);
    setPincode(addr.pincode);
    setIsDefault(addr.isDefault ?? false);
    setShowAddNew(true);
  };

  // Save addresses to Firestore
  const saveAddressesToFirestore = useCallback(
    async (updatedAddresses: UserAddress[]) => {
      if (!userId) {return;}
      await firestore()
        .collection('users')
        .doc(userId)
        .set({ addressBook: updatedAddresses }, { merge: true });
    },
    [userId]
  );

  const handleSaveNew = async () => {
    if (
      !recipient.trim() ||
      !phone.trim() ||
      !addressLine1.trim() ||
      !city.trim() ||
      !stateName.trim() ||
      !country.trim() ||
      !pincode.trim()
    ) {
      Alert.alert('All fields except addressLine2 are mandatory.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Enter a valid 10 digit mobile number.');
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      Alert.alert('Enter a valid 6 digit pincode.');
      return;
    }

    // Generate a unique id for new address
    const newId = editIndex !== null ? addresses[editIndex].id : `addr_${Date.now()}`;
    let newAddr: UserAddress = {
      id: newId,
      recipient,
      phone,
      addressLine1,
      addressLine2,
      city,
      state: stateName,
      country,
      pincode,
      isDefault,
    };

    let updatedAddresses = [...addresses];
    let idxToSelect = addresses.length;
    if (editIndex !== null) {
      updatedAddresses[editIndex] = newAddr;
      idxToSelect = editIndex;
    } else {
      // If new address is set as default, unset previous default
      if (isDefault) {
        updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
      }
      updatedAddresses.push(newAddr);
    }
    setAddresses(updatedAddresses);
    setSelectedIndex(idxToSelect);
    setShowAddNew(false);
    resetForm();
    await saveAddressesToFirestore(updatedAddresses);
  };

  // Save selected address and return to checkout
  const handleSaveAndReturn = () => {
    const selected = addresses[selectedIndex];
    if (!selected) {
      Alert.alert('Please select or add an address');
      return;
    }
    navigation.pop(2);
    if ('cart' in (route.params || {})) {
      navigation.navigate('CheckoutDetailsScreen', {
        cart: (route.params as any).cart,
        address: selected,
      });
    } else if ('product' in (route.params || {})) {
      navigation.navigate('CheckoutDetailsScreen', {
        product: (route.params as any).product,
        address: selected,
      });
    }
  };

  return {
    addresses,
    selectedIndex,
    showAddNew,
    recipient,
    phone,
    addressLine1,
    addressLine2,
    city,
    stateName,
    country,
    pincode,
    isDefault,
    setRecipient,
    setPhone,
    setAddressLine1,
    setAddressLine2,
    setCity,
    setStateName,
    setCountry,
    setPincode,
    setIsDefault,
    handleSelect,
    handleAddNew,
    handleEdit,
    handleSaveNew,
    handleSaveAndReturn,
    loading,
  };
}
