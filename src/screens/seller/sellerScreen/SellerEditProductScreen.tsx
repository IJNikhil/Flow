import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootParamList } from '../../../navigation/types';

const SellerEditProductScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootParamList, 'SellerEditProductScreen'>>();
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [originalPrice, setOriginalPrice] = useState(String(product.originalPrice));
  const [stockLeft, setStockLeft] = useState(String(product.stockLeft));
  const [unit, setUnit] = useState(product.unit);
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [categoryLabel, setCategoryLabel] = useState(product.categoryLabel);
  const [itemId, setItemId] = useState(product.itemId);
  const [itemName, setItemName] = useState(product.itemName);
  const [discountPercentage, setDiscountPercentage] = useState(String(product.discountPercentage));
  const [deliveryUpto, setDeliveryUpto] = useState(product.deliveryUpto);
  const [images, setImages] = useState<string[]>(product.images || []);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const validate = () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!name.trim()) {newErrors.name = true;}
    if (!price.trim()) {newErrors.price = true;}
    if (!stockLeft.trim()) {newErrors.stockLeft = true;}
    if (!unit.trim()) {newErrors.unit = true;}
    if (!categoryId.trim()) {newErrors.categoryId = true;}
    if (!categoryLabel.trim()) {newErrors.categoryLabel = true;}
    if (!itemId.trim()) {newErrors.itemId = true;}
    if (!itemName.trim()) {newErrors.itemName = true;}
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePickImage = async () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 3 }, (response) => {
      if (response.didCancel) {return;}
      if (response.errorCode) {
        Alert.alert('Image Error', response.errorMessage || 'Failed to select images');
        return;
      }
      if (response.assets) {
        setImages(response.assets.map(a => a.uri || '').filter(Boolean));
      }
    });
  };

  const uploadImages = async (uris: string[], productId: string) => {
    const uploadedUrls: string[] = [];
    for (const [index, uri] of uris.entries()) {
      if (uri.startsWith('http')) {
        uploadedUrls.push(uri);
        continue;
      }
      const ref = storage().ref(`products/${productId}_${Date.now()}_${index}`);
      await ref.putFile(uri);
      uploadedUrls.push(await ref.getDownloadURL());
    }
    return uploadedUrls;
  };

  const handleUpdate = async () => {
    if (!validate()) {
      Alert.alert('Validation Error', 'Please fill all required fields');
      return;
    }
    setUploading(true);
    try {
      let imageUrls = images;
      if (images.some(uri => !uri.startsWith('http'))) {
        imageUrls = await uploadImages(images, product.id);
      }
      const updateData = {
        name: name.trim(),
        price: Number(price),
        originalPrice: Number(originalPrice) || Number(price),
        stockLeft: Number(stockLeft),
        unit: unit.trim(),
        categoryId: categoryId.trim(),
        categoryLabel: categoryLabel.trim(),
        itemId: itemId.trim(),
        itemName: itemName.trim(),
        discountPercentage: Number(discountPercentage) || 0,
        deliveryUpto: deliveryUpto.trim(),
        images: imageUrls,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
      await firestore().collection('products').doc(product.id).update(updateData);
      Alert.alert('Success', 'Product updated successfully');
    } catch (error: any) {
      Alert.alert('Update Failed', error.message || 'Failed to update product');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to permanently delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('products').doc(product.id).delete();
              await Promise.all(images.map(async (uri) => {
                if (uri.startsWith('http')) {
                  const fileRef = storage().refFromURL(uri);
                  await fileRef.delete();
                }
              }));
              Alert.alert('Success', 'Product deleted permanently');
            } catch (error: any) {
              Alert.alert('Deletion Failed', error.message || 'Failed to delete product');
            }
          },
        },
      ]
    );
  };

  const inputStyle = (field: string) => [
    styles.input,
    errors[field] && styles.inputError,
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.header}>Edit Product</Text>

          <Text style={styles.sectionTitle}>Basic Information</Text>
          <TextInput
            style={inputStyle('name')}
            placeholder="Product Name *"
            value={name}
            onChangeText={v => {
              setName(v);
              setErrors(prev => ({ ...prev, name: false }));
            }}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('price')}
            placeholder="Selling Price (₹) *"
            value={price}
            onChangeText={v => {
              setPrice(v);
              setErrors(prev => ({ ...prev, price: false }));
            }}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Original Price (₹)"
            value={originalPrice}
            onChangeText={setOriginalPrice}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('stockLeft')}
            placeholder="Available Stock *"
            value={stockLeft}
            onChangeText={v => {
              setStockLeft(v);
              setErrors(prev => ({ ...prev, stockLeft: false }));
            }}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('unit')}
            placeholder="Unit (e.g. kg, piece) *"
            value={unit}
            onChangeText={v => {
              setUnit(v);
              setErrors(prev => ({ ...prev, unit: false }));
            }}
            placeholderTextColor="#666"
          />

          <Text style={styles.sectionTitle}>Classification</Text>
          <TextInput
            style={inputStyle('categoryId')}
            placeholder="Category ID *"
            value={categoryId}
            onChangeText={v => {
              setCategoryId(v);
              setErrors(prev => ({ ...prev, categoryId: false }));
            }}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('categoryLabel')}
            placeholder="Category Label *"
            value={categoryLabel}
            onChangeText={v => {
              setCategoryLabel(v);
              setErrors(prev => ({ ...prev, categoryLabel: false }));
            }}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('itemId')}
            placeholder="Item ID *"
            value={itemId}
            onChangeText={v => {
              setItemId(v);
              setErrors(prev => ({ ...prev, itemId: false }));
            }}
            placeholderTextColor="#666"
          />
          <TextInput
            style={inputStyle('itemName')}
            placeholder="Item Name *"
            value={itemName}
            onChangeText={v => {
              setItemName(v);
              setErrors(prev => ({ ...prev, itemName: false }));
            }}
            placeholderTextColor="#666"
          />

          <Text style={styles.sectionTitle}>Additional Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Discount Percentage"
            value={discountPercentage}
            onChangeText={setDiscountPercentage}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Delivery Coverage"
            value={deliveryUpto}
            onChangeText={setDeliveryUpto}
            placeholderTextColor="#666"
          />

          <Text style={styles.sectionTitle}>Product Images</Text>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={handlePickImage}
          >
            <Text style={styles.buttonText}>Select Images (Max 3)</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {images.map((uri, index) => (
              <Image
                key={`image-${index}`}
                source={{ uri }}
                style={styles.imagePreview}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.actionButton, styles.updateButton]}
            onPress={handleUpdate}
            disabled={uploading}
          >
            {uploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Changes</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
            disabled={uploading}
          >
            <Text style={styles.buttonText}>Delete Product</Text>
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
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d2d2d',
    marginTop: 16,
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
  imageButton: {
    backgroundColor: '#2874f0',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 12,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  actionButton: {
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#28a745',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SellerEditProductScreen;
