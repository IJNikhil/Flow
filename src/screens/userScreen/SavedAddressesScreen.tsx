import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getUserAddresses, getCurrentUser } from '../../backend/services/authService';
import { UserAddress } from '../../types/models';

const SavedAddressesScreen: React.FC = () => {
  const user = getCurrentUser();
  const [addresses, setAddresses] = useState<UserAddress[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getUserAddresses(user.uid).then(setAddresses);
    }
  }, [user?.uid]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Addresses</Text>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.addrCard}>
            <Text style={styles.recipient}>{item.recipient}</Text>
            <Text>
              {item.addressLine1}
              {item.addressLine2 ? `, ${item.addressLine2}` : ''}
              , {item.city}, {item.state}, {item.country} - {item.pincode}
            </Text>
            <Text>Phone: {item.phone}</Text>
            {item.isDefault && <Text style={styles.defaultText}>Default</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  addrCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  recipient: { fontWeight: 'bold', marginBottom: 6 },
  defaultText: { color: '#43A047', fontWeight: 'bold' },
});

export default SavedAddressesScreen;
