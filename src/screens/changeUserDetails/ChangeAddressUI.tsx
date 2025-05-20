/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import type { UserAddress } from '../../types/models';

type Props = {
  addresses: UserAddress[];
  selectedIndex: number;
  showAddNew: boolean;
  recipient: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateName: string;
  country: string;
  pincode: string;
  isDefault: boolean;
  setRecipient: (v: string) => void;
  setPhone: (v: string) => void;
  setAddressLine1: (v: string) => void;
  setAddressLine2: (v: string) => void;
  setCity: (v: string) => void;
  setStateName: (v: string) => void;
  setCountry: (v: string) => void;
  setPincode: (v: string) => void;
  setIsDefault: (v: boolean) => void;
  handleSelect: (idx: number) => void;
  handleAddNew: () => void;
  handleEdit: (idx: number) => void;
  handleSaveNew: () => void;
  handleSaveAndReturn: () => void;
  loading: boolean;
};

const ChangeAddressUI: React.FC<Props> = ({
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
}) => (
  <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <View style={styles.flex}>
        <Text style={styles.title}>Select Delivery Address</Text>
        <FlatList
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.addressRow,
                selectedIndex === index && styles.addressRowSelected,
              ]}
            >
              <TouchableOpacity
                style={styles.radioTouchArea}
                onPress={() => handleSelect(index)}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <View style={styles.radioOuter}>
                  {selectedIndex === index && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addressText}
                onPress={() => handleSelect(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.name}>{item.recipient}</Text>
                <Text style={styles.addr}>
                  {item.addressLine1}
                  {item.addressLine2 ? `, ${item.addressLine2}` : ''}
                  , {item.city}, {item.state}, {item.country} - {item.pincode}
                </Text>
                <Text style={styles.addr}>Mobile: {item.phone}</Text>
                {item.isDefault && (
                  <Text style={[styles.addr, { color: '#43A047', fontWeight: 'bold' }]}>Default</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(index)}>
                <Text style={styles.editBtn}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ color: '#888', marginBottom: 10 }}>
              No addresses found. Please add one.
            </Text>
          }
          style={styles.list}
        />

        <TouchableOpacity style={styles.addNewBtn} onPress={handleAddNew}>
          <Text style={styles.addNewBtnText}>+ Add New Address</Text>
        </TouchableOpacity>

        {showAddNew && (
          <ScrollView
            style={styles.addNewFormCard}
            contentContainerStyle={styles.addNewFormContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.formHeader}>Add New Address</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Full Name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                value={recipient}
                onChangeText={setRecipient}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Flat/House Number, Building, Street <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Flat/House Number, Building, Street"
                value={addressLine1}
                onChangeText={setAddressLine1}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Landmark, Area (optional)
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Landmark, Area"
                value={addressLine2}
                onChangeText={setAddressLine2}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                City <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                State <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="State"
                value={stateName}
                onChangeText={setStateName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Country <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Pincode <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="6 digit pincode"
                value={pincode}
                onChangeText={setPincode}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Mobile Number <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="10 digit mobile number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Text style={{ fontSize: 14, color: '#555', marginRight: 8 }}>Set as default</Text>
              <TouchableOpacity
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  borderWidth: 2,
                  borderColor: isDefault ? '#43A047' : '#AAA',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDefault ? '#43A047' : '#FFF',
                }}
                onPress={() => setIsDefault(!isDefault)}
              >
                {isDefault && <View style={{
                  width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFF',
                }} />}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.saveNewBtn} onPress={handleSaveNew}>
              <Text style={styles.saveNewBtnText}>Save New Address</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAndReturn}>
          <Text style={styles.saveBtnText}>Use This Address</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FAFAFA' },
  flex: { flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  list: { maxHeight: 220 },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  addressRowSelected: {
    borderColor: '#2874F0',
    borderWidth: 1.5,
    backgroundColor: '#e3f1ff',
  },
  radioTouchArea: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#2874F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2874F0',
  },
  addressText: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  name: { fontSize: 16, fontWeight: '600', color: '#222' },
  addr: { fontSize: 14, color: '#555', marginTop: 2 },
  editBtn: {
    color: '#2874F0',
    fontWeight: '600',
    fontSize: 14,
    padding: 8,
  },
  addNewBtn: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#2874F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addNewBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  addNewFormCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 16,
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    maxHeight: 440,
  },
  addNewFormContent: {
    padding: 16,
  },
  formHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2874F0',
    marginBottom: 10,
    alignSelf: 'center',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: { fontSize: 14, marginBottom: 4, color: '#555' },
  required: { color: '#e53935', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
    backgroundColor: '#F9F9F9',
    fontSize: 15,
  },
  saveNewBtn: {
    backgroundColor: '#2874F0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    elevation: Platform.OS === 'android' ? 1 : 0,
  },
  saveNewBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  saveBtn: {
    backgroundColor: '#43A047',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ChangeAddressUI;
