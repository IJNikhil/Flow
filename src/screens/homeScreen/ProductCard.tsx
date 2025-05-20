// ProductCard.tsx
import React from "react";
import { View, Image } from "react-native";
import homeScreenStyles
 from "./HomeScreenStyles";
const ProductCard = () => (

  <View style={homeScreenStyles.productCard}>
    <Image
      source={{ uri: "https://via.placeholder.com/100x100.png?text=Product" }}
      style={homeScreenStyles.productImage}
      resizeMode="cover"
    />
  </View>
);

export default ProductCard;
