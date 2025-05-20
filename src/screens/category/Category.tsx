import React from 'react';
import { CategoryUI } from './CategoryUI';
import { useCategoryLogic } from './CategoryLogic';

export default function Category() {
  const {
    categories,
    loading,
    selectedIndex,
    scrollViewRef,
    categoryRefs,
    handleCategoryLayout,
    scrollToCategory,
    handleScroll,
    onProductCollectionPress,
  } = useCategoryLogic();

  return (
    <CategoryUI
      categories={categories}
      loading={loading}
      selectedIndex={selectedIndex}
      scrollViewRef={scrollViewRef}
      categoryRefs={categoryRefs}
      handleCategoryLayout={handleCategoryLayout}
      scrollToCategory={scrollToCategory}
      handleScroll={handleScroll}
      onProductCollectionPress={onProductCollectionPress}
    />
  );
}
