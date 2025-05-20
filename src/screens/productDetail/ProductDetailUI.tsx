import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderSearch from '../../HeaderSearch';
import type { ProductDoc } from '../../types/models';

const { width, height } = Dimensions.get('window');

type ProductDetailUIProps = {
  product?: ProductDoc;
  loading: boolean;
  imgIndex: number;
  cartCount: number;
  setImgIndex: (index: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onCartPress: () => void;
};

const ProductDetailUI: React.FC<ProductDetailUIProps> = ({
  product,
  loading,
  imgIndex,
  cartCount,
  setImgIndex,
  onAddToCart,
  onBuyNow,
  onCartPress,
}) => {
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#5a7d4c" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderSearch editable={true} searchText="" setSearchText={() => {}} />
        <Text style={styles.notFoundText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSearch editable={true} searchText="" setSearchText={() => {}} />
      <ScrollView style={styles.scrollView}>
        {/* Image Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageSliderContainer}
          onScroll={(e) => setImgIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
          scrollEventThrottle={16}
        >
          {product.images.map((img, index) => (
            <Image
              key={`${img}_${index}`}
              source={{ uri: img }}
              style={styles.productImage}
              resizeMode="contain"
              accessibilityLabel={`Image of ${product.name}`}
            />
          ))}
        </ScrollView>
        {/* Dots for carousel */}
        <View style={styles.dotsContainer}>
          {product.images.map((img, i) => (
            <View key={`${img}_${i}`} style={[styles.dot, imgIndex === i && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>

          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Icon name="star" color="#444" size={13} />
            <Text style={styles.ratingBadgeText}>{product.rating}</Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.priceMain}>₹{product.price.toLocaleString()}</Text>
            <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
            </View>
          </View>

          {/* Delivery Info */}
          <View style={styles.deliveryContainer}>
            <Icon name="truck" size={16} color="#5a7d4c" />
            <Text style={styles.deliveryText}> Free delivery by {product.deliveryUpto}</Text>
          </View>

          {/* Stock Info */}
          {product.stockLeft !== undefined && (
            <View style={styles.stockContainer}>
              <Icon name="exclamation-circle" size={16} color="#888" />
              <Text style={styles.stockText}> Only {product.stockLeft} left in stock</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={onAddToCart}
          accessibilityLabel="Add to cart"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={onBuyNow}
          accessibilityLabel="Buy now"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Cart Icon */}
      <TouchableOpacity
        style={styles.fabCart}
        onPress={onCartPress}
        accessibilityLabel="Go to cart"
        accessibilityRole="button"
      >
        <Icon name="shopping-cart" size={22} color="#fff" />
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { justifyContent: 'center', alignItems: 'center' },
  scrollView: { marginBottom: 70 },
  imageSliderContainer: { width, height: height * 0.42, backgroundColor: '#f7f7f7' },
  productImage: { width, height: height * 0.42 },
  dotsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#888',
    width: 12,
    height: 12,
  },
  detailsContainer: { padding: 18 },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#bbb',
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  ratingBadgeText: {
    color: '#444',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 13,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  priceMain: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 15,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  discountBadge: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: '#f7f7f7',
  },
  discountText: { color: '#444', fontSize: 13, fontWeight: 'bold' },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryText: {
    fontSize: 14,
    color: '#5a7d4c',
    marginLeft: 2,
    fontWeight: '500',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stockText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 2,
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 6,
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#444',
    padding: 15,
    marginRight: 10,
    borderRadius: 8,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#5a7d4c',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  notFoundText: { textAlign: 'center', marginTop: 20, fontSize: 18 },
  fabCart: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#5a7d4c',
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    zIndex: 10,
  },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ProductDetailUI;
