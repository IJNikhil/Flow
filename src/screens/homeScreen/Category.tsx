import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import homeScreenStyles from "./HomeScreenStyles";

type CategoryProps = {
  label: string;
  icon: string;
};

const Category: React.FC<CategoryProps> = React.memo(({ label, icon }) => (
  <View style={homeScreenStyles.category}>
    <View style={homeScreenStyles.categoryImage}>
      <Icon name={icon} size={36} color="#4CAF50" />
    </View>
    <Text style={homeScreenStyles.categoryText}>{label}</Text>
  </View>
));

export default Category;