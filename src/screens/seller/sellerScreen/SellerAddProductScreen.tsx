import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';

const SellerAddProductScreen: React.FC = () => {
  const user = auth().currentUser;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stockLeft, setStockLeft] = useState('');
  const [unit, setUnit] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [deliveryUpto, setDeliveryUpto] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const validate = () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!name) newErrors.name = true;
    if (!price) newErrors.price = true;
    if (!stockLeft) newErrors.stockLeft = true;
    if (!unit) newErrors.unit = true;
    if (!categoryId) newErrors.categoryId = true;
    if (!categoryLabel) newErrors.categoryLabel = true;
    if (!itemId) newErrors.itemId = true;
    if (!itemName) newErrors.itemName = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePickImage = async () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 3 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Image Picker Error', response.errorMessage || 'Unknown error');
        return;
      }
      if (response.assets) {
        setImages(response.assets.map(a => a.uri || '').filter(Boolean));
      }
    });
  };

  const uploadImages = async (uris: string[], productId: string) => {
    const urls: string[] = [];
    for (const [i, uri] of uris.entries()) {
      const ref = storage().ref(`products/${productId}_${i}.jpg`);
      await ref.putFile(uri);
      urls.push(await ref.getDownloadURL());
    }
    return urls;
  };

  const handleAddProduct = async () => {
    if (!user?.uid) {
      Alert.alert('Not logged in');
      return;
    }
    if (!validate()) {
      Alert.alert('Please fill all required fields');
      return;
    }
    setUploading(true);
    try {
      const newProductRef = firestore().collection('products').doc();
      let imageUrls: string[] = [];
      if (images.length) {
        imageUrls = await uploadImages(images, newProductRef.id);
      }
      const doc = {
        id: newProductRef.id,
        name,
        images: imageUrls,
        originalPrice: Number(originalPrice) || Number(price),
        price: Number(price),
        rating: 0,
        discountPercentage: Number(discountPercentage) || 0,
        deliveryUpto,
        stockLeft: Number(stockLeft),
        categoryId,
        categoryLabel,
        itemId,
        itemName,
        unit,
        sellerId: user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
      await newProductRef.set(doc);
      Alert.alert('Product added!');
      setName('');
      setPrice('');
      setOriginalPrice('');
      setStockLeft('');
      setUnit('');
      setCategoryId('');
      setCategoryLabel('');
      setItemId('');
      setItemName('');
      setDiscountPercentage('');
      setDeliveryUpto('');
      setImages([]);
      setErrors({});
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Could not add product');
    } finally {
      setUploading(false);
    }
  };

  const inputStyle = (field: string) =>
    errors[field]
      ? [styles.input, styles.inputError]
      : styles.input;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f5f7fa' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.header}>Add New Product</Text>
          <Text style={styles.subHeader}>Fill in all details to list your product for sale.</Text>

          <Text style={styles.sectionTitle}>Product Details</Text>
          <TextInput
            placeholder="Product Name *"
            value={name}
            onChangeText={v => { setName(v); setErrors(e => ({ ...e, name: false })); }}
            style={inputStyle('name')}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Price (₹) *"
            value={price}
            onChangeText={v => { setPrice(v); setErrors(e => ({ ...e, price: false })); }}
            style={inputStyle('price')}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Original Price (₹)"
            value={originalPrice}
            onChangeText={setOriginalPrice}
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Stock Left *"
            value={stockLeft}
            onChangeText={v => { setStockLeft(v); setErrors(e => ({ ...e, stockLeft: false })); }}
            style={inputStyle('stockLeft')}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Unit (e.g. kg, piece) *"
            value={unit}
            onChangeText={v => { setUnit(v); setErrors(e => ({ ...e, unit: false })); }}
            style={inputStyle('unit')}
            placeholderTextColor="#888"
          />

          <Text style={styles.sectionTitle}>Category & Item</Text>
          <TextInput
            placeholder="Category ID *"
            value={categoryId}
            onChangeText={v => { setCategoryId(v); setErrors(e => ({ ...e, categoryId: false })); }}
            style={inputStyle('categoryId')}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Category Label *"
            value={categoryLabel}
            onChangeText={v => { setCategoryLabel(v); setErrors(e => ({ ...e, categoryLabel: false })); }}
            style={inputStyle('categoryLabel')}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Item ID *"
            value={itemId}
            onChangeText={v => { setItemId(v); setErrors(e => ({ ...e, itemId: false })); }}
            style={inputStyle('itemId')}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Item Name *"
            value={itemName}
            onChangeText={v => { setItemName(v); setErrors(e => ({ ...e, itemName: false })); }}
            style={inputStyle('itemName')}
            placeholderTextColor="#888"
          />

          <Text style={styles.sectionTitle}>Optional</Text>
          <TextInput
            placeholder="Discount %"
            value={discountPercentage}
            onChangeText={setDiscountPercentage}
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Delivery Upto"
            value={deliveryUpto}
            onChangeText={setDeliveryUpto}
            style={styles.input}
            placeholderTextColor="#888"
          />

          <Text style={styles.sectionTitle}>Product Images</Text>
          <TouchableOpacity style={styles.button} onPress={handlePickImage}>
            <Text style={styles.buttonText}>Pick Images</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {images.map((uri, idx) => (
              <Image key={idx} source={{ uri }} style={styles.imagePreview} />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, uploading && styles.buttonDisabled]}
            onPress={handleAddProduct}
            disabled={uploading}
            activeOpacity={0.85}
          >
            {uploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Add Product</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 18,
    backgroundColor: '#f5f7fa',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2874F0',
    marginBottom: 4,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 15,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: '#fafbfc',
    color: '#222',
  },
  inputError: {
    borderColor: '#e53935',
    backgroundColor: '#fff5f5',
  },
  button: {
    backgroundColor: '#2874F0',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
  },
  imageContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  imagePreview: {
    width: 70,
    height: 70,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default SellerAddProductScreen;
