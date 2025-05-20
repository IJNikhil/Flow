import React, { useMemo } from "react";
import { View, ScrollView, Image, ActivityIndicator } from "react-native";
import Category from "./Category";
import homeScreenStyles from "./HomeScreenStyles";
import IMAGES from "../../assets/icons";
import { useCategories } from "../../hooks/useCategories";
import type { Category as CategoryType } from "../../hooks/types/product";

// Utility: chunk array into columns dynamically
const chunkIntoColumns = <T,>(arr: T[], size = 2): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const DownArrowIcon = React.memo(() => (
  <View style={homeScreenStyles.iconWrapper}>
    <Image source={IMAGES.DOWN} style={homeScreenStyles.downIcon} />
  </View>
));

const Banner = React.memo(() => (
  <View style={homeScreenStyles.bannerContainer}>
    <View style={homeScreenStyles.bannerImage} />
  </View>
));

const CategoryColumn = React.memo(function CategoryColumn({ column }: { column: CategoryType[] }) {
  return (
    <View style={homeScreenStyles.categoryColumn}>
      {column.map((cat) => (
        <Category key={cat.id} label={cat.label} icon={cat.icon} />
      ))}
    </View>
  );
});

const PopularCategories = React.memo(function PopularCategories() {
  const { categories, loading } = useCategories();

  // Memoize chunked columns so they only recompute if categories change
  const categoryColumns = useMemo(
    () => chunkIntoColumns(categories, 2),
    [categories]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={homeScreenStyles.popularCategoriesContainer}
      contentContainerStyle={homeScreenStyles.categoriesContainer}
    >
      {loading ? (
        <ActivityIndicator style={{ margin: 16 }} />
      ) : (
        categoryColumns.map((column, colIndex) => (
          <CategoryColumn key={`col-${colIndex}`} column={column} />
        ))
      )}
    </ScrollView>
  );
});

const SectionTwo = React.memo(function SectionTwo() {
  return (
    <>
      <DownArrowIcon />
      <Banner />
      <PopularCategories />
    </>
  );
});

export default SectionTwo;
