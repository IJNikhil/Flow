import { useNavigation } from '@react-navigation/native';
import type { GestureResponderEvent } from 'react-native';
import type { RootParamList } from '../../../navigation/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProductDoc } from '../../../types/models';

export interface ProductCardLogicProps {
  product: ProductDoc;
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  unitLabel: string;
}

export function useProductCardLogic({
  product,
  quantity,
  increaseQuantity,
  decreaseQuantity,
}: ProductCardLogicProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  const itemOriginalPrice = product.originalPrice || 0;
  const discountPercentage = product.discountPercentage || 0;

  const price = product.price * quantity;
  const subtotal = itemOriginalPrice * quantity;
  const discount = subtotal - price;
  const delivery = 0; // free delivery
  const totalAmount = price + delivery;

  const handleDecrease = (e: GestureResponderEvent) => {
    e.stopPropagation();
    decreaseQuantity();
  };

  const handleIncrease = (e: GestureResponderEvent) => {
    e.stopPropagation();
    increaseQuantity();
  };

  const handleCardPress = () => {
    navigation.navigate('ProductDetailScreen', { product });
  };

  return {
    itemOriginalPrice,
    discountPercentage,
    price,
    subtotal,
    discount,
    delivery,
    totalAmount,
    handleDecrease,
    handleIncrease,
    handleCardPress,
  };
}
