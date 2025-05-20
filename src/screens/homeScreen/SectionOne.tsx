import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import homeScreenStyles from "./HomeScreenStyles";
import NavButton from "./NavButton";
import IMAGES from "../../assets/icons";
import APP_CONSTANTS from "../../strings/appConstants";
import { RootParamList } from "../../navigation/types";

interface SectionOneProps {
  gradientOpacity: number;
}


const SectionOne: React.FC<SectionOneProps> = ({ gradientOpacity}) => (
  <LinearGradient
    colors={["#6a5acd", "#beb4fa"]}
    style={[homeScreenStyles.topSection, { height: 200, opacity: gradientOpacity }]}
  >
    <NavButtonsGroup />

    <LocationDisplay />
    <SearchOnly />
  </LinearGradient>
);

export default SectionOne;

// Subcomponents

const NavButtonsGroup = () => (
  <View style={homeScreenStyles.navButtons}>
    {["Elipkart", "Grocery", "Travel", "Pay"].map(title => (
      <NavButton key={title} title={title} />
    ))}
  </View>
);


const LocationDisplay = () => (
  <View style={homeScreenStyles.locationContainer}>
    <Image source={IMAGES.HOME} style={homeScreenStyles.locationHomeIcon} resizeMode="contain" />
    <Text style={homeScreenStyles.locationText}>HOME</Text>
    <Text style={homeScreenStyles.locationAddress} numberOfLines={1}>
      {APP_CONSTANTS.HOME_SCREEN_CONSTANTS.HOME_ADDRESS}
    </Text>
    <Image source={IMAGES.NEXT} style={homeScreenStyles.locationNextIcon} resizeMode="contain" />
  </View>
);

const SearchOnly = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  return <SearchBar onPress={() => navigation.navigate("SearchScreen")} />;
};

const SearchBar = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={homeScreenStyles.rowContainer}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <Image source={IMAGES.SEARCH} style={homeScreenStyles.icon} resizeMode="contain" />
    <TextInput
      style={homeScreenStyles.searchInput}
      placeholderTextColor="#999"
      placeholder="laptops"
      editable={false}
      pointerEvents="none"
    />
  </TouchableOpacity>
);
