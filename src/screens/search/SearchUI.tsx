import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import IMAGES from '../../assets/icons';

type SearchUIProps = {
  isEditable: boolean;
  searchQuery: string;
  inputRef: React.RefObject<TextInput | null>;
  handlePress: () => void;
  handleChangeText: (text: string) => void;
  handleSearchSubmit: () => void;
};

const SearchUI: React.FC<SearchUIProps> = ({
  isEditable,
  searchQuery,
  inputRef,
  handlePress,
  handleChangeText,
  handleSearchSubmit,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.rowContainer}
      activeOpacity={0.9}
      onPress={handlePress}
    >
      <Image
        source={IMAGES.SEARCH}
        style={styles.icon}
        resizeMode="contain"
      />

      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Search for laptops, phones..."
        placeholderTextColor="#888"
        editable={isEditable}
        value={searchQuery}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
        blurOnSubmit={true}
        onFocus={() => console.log('[SearchScreen] Input focused')}
        onBlur={() => console.log('[SearchScreen] Input blurred')}
      />
    </TouchableOpacity>

    {!isEditable && (
      <Text style={styles.helperText}>
        Tap the search bar to start typing.
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8ff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#beb4fa',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#000',
  },
  icon: {
    width: 24,
    height: 24,
  },
  helperText: {
    marginTop: 12,
    color: '#888',
    fontSize: 14,
  },
});

export default SearchUI;
