import React from 'react';
import SearchUI from './SearchUI';
import { useSearchLogic } from './SearchLogic';

const SearchScreen = () => {
  const {
    isEditable,
    searchQuery,
    inputRef,
    handlePress,
    handleChangeText,
    handleSearchSubmit,
  } = useSearchLogic();

  return (
    <SearchUI
      isEditable={isEditable}
      searchQuery={searchQuery}
      inputRef={inputRef}
      handlePress={handlePress}
      handleChangeText={handleChangeText}
      handleSearchSubmit={handleSearchSubmit}
    />
  );
};

export default SearchScreen;
