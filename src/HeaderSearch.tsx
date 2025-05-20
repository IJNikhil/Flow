import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from './navigation/types';

type HeaderProps = {
  editable: boolean;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const HeaderSearch: React.FC<HeaderProps> = ({ editable, searchText, setSearchText }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconTouchable}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <Icon name="arrow-left" size={20} color="#333" />
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#999"
        editable={editable}
        value={searchText}
        onChangeText={setSearchText}
        returnKeyType="search"
        accessibilityLabel="Search input"
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('CartScreen')}
        style={styles.iconTouchable}
        accessibilityLabel="Go to cart"
        accessibilityRole="button"
      >
        <Icon name="shopping-cart" size={22} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  iconTouchable: {
    padding: 6,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#beb4fa',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    fontSize: 14,
    color: '#000',
  },
});

export default HeaderSearch;
