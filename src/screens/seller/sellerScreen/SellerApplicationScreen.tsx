import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import type { UserAddress } from '../../../types/models';

const SellerApplicationScreen: React.FC = () => {
  const user = auth().currentUser;
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [address, setAddress] = useState<UserAddress>({
    id: '',
    recipient: user?.displayName || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    isDefault: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const validate = () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!businessName.trim()) newErrors.businessName = true;
    if (!gstNumber.trim()) newErrors.gstNumber = true;
    if (!address.recipient.trim()) newErrors.recipient = true;
    if (!address.phone.trim()) newErrors.phone = true;
    if (!address.addressLine1.trim()) newErrors.addressLine1 = true;
    if (!address.addressLine2.trim()) newErrors.addressLine2 = true;
    if (!address.city.trim()) newErrors.city = true;
    if (!address.state.trim()) newErrors.state = true;
    if (!address.country.trim()) newErrors.country = true;
    if (!address.pincode.trim()) newErrors.pincode = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApply = async () => {
    if (!user?.uid) {
      Alert.alert('Authentication Error', 'You must be logged in to apply.');
      return;
    }
    if (!validate()) {
      Alert.alert('Validation Error', 'Please fill all required fields correctly.');
      return;
    }
    setLoading(true);
    try {
      await firestore().collection('sellers').doc(user.uid).set({
        uid: user.uid,
        businessName: businessName.trim(),
        gstNumber: gstNumber.trim(),
        address: { 
          ...address,
          id: 'main',
          recipient: address.recipient.trim(),
          phone: address.phone.trim(),
          addressLine1: address.addressLine1.trim(),
          addressLine2: address.addressLine2.trim(),
          city: address.city.trim(),
          state: address.state.trim(),
          country: address.country.trim(),
          pincode: address.pincode.trim(),
        },
        appliedAt: firestore.FieldValue.serverTimestamp(),
        status: 'pending',
      });
      Alert.alert('Application Submitted', 'Your seller application is under review. We\'ll notify you once approved.');
    } catch (error: any) {
      Alert.alert('Submission Error', error.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string) => [
    styles.input,
    errors[field] && styles.inputError
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.header}>Seller Application</Text>
          <Text style={styles.subHeader}>Please provide accurate business information for verification</Text>

          <Text style={styles.sectionTitle}>Business Information</Text>
          <TextInput
            style={inputStyle('businessName')}
            placeholder="Legal Business Name *"
            value={businessName}
            onChangeText={v => {
              setBusinessName(v);
              setErrors(prev => ({ ...prev, businessName: false }));
            }}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('gstNumber')}
            placeholder="GSTIN Number *"
            value={gstNumber}
            onChangeText={v => {
              setGstNumber(v);
              setErrors(prev => ({ ...prev, gstNumber: false }));
            }}
            placeholderTextColor="#666"
            autoCapitalize="characters"
          />

          <Text style={styles.sectionTitle}>Business Address</Text>
          <TextInput
            style={inputStyle('recipient')}
            placeholder="Contact Name *"
            value={address.recipient}
            onChangeText={v => setAddress(prev => ({ ...prev, recipient: v }))}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('phone')}
            placeholder="Business Phone *"
            value={address.phone}
            onChangeText={v => setAddress(prev => ({ ...prev, phone: v }))}
            keyboardType="phone-pad"
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('addressLine1')}
            placeholder="Street Address Line 1 *"
            value={address.addressLine1}
            onChangeText={v => setAddress(prev => ({ ...prev, addressLine1: v }))}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('addressLine2')}
            placeholder="Street Address Line 2 *"
            value={address.addressLine2}
            onChangeText={v => setAddress(prev => ({ ...prev, addressLine2: v }))}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('city')}
            placeholder="City *"
            value={address.city}
            onChangeText={v => setAddress(prev => ({ ...prev, city: v }))}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('state')}
            placeholder="State *"
            value={address.state}
            onChangeText={v => setAddress(prev => ({ ...prev, state: v }))}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('country')}
            placeholder="Country *"
            value={address.country}
            onChangeText={v => setAddress(prev => ({ ...prev, country: v }))}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('pincode')}
            placeholder="Postal Code *"
            value={address.pincode}
            onChangeText={v => setAddress(prev => ({ ...prev, pincode: v }))}
            keyboardType="numeric"
            placeholderTextColor="#666"
            maxLength={6}
          />

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleApply}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Submit Application</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d2d2d',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  inputError: {
    borderColor: '#dc3545',
    backgroundColor: '#fff0f0',
  },
  submitButton: {
    backgroundColor: '#2874f0',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#8fa8d1',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SellerApplicationScreen;
