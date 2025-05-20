import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
} from "react-native";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import ProductCard from "./ProductCard";
import homeScreenStyles from "./HomeScreenStyles";

type HomeScreenUIProps = {
  insets: { bottom: number };
  items: string[];
  loading: boolean;
  refreshing: boolean;
  gradientOpacity: number;
  loadMoreItems: () => void;
  onRefresh: () => void;
  handleScroll: (e: any) => void;
};

const PopularHeader = React.memo(() => (
  <View style={homeScreenStyles.popularHeader}>
    <Text style={homeScreenStyles.popularHeaderText}>Farmer's Fresh Picks for You</Text>
    <TouchableOpacity style={homeScreenStyles.arrowButton} />
  </View>
));

const PopularProducts = React.memo(() => (
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    style={homeScreenStyles.popularProductsContainer}
    data={Array.from({ length: 4 })}
    renderItem={() => <ProductCard />}
    keyExtractor={(_, index) => index.toString()}
  />
));

const ListHeaderComponent = React.memo(function ListHeaderComponent({ gradientOpacity }: { gradientOpacity: number }) {
  return (
    <>
      <SectionOne gradientOpacity={gradientOpacity} />
      <SectionTwo />
      <PopularHeader />
      <PopularProducts />
    </>
  );
});

const HomeScreenUI: React.FC<HomeScreenUIProps> = React.memo(({
  insets,
  items,
  loading,
  refreshing,
  gradientOpacity,
  loadMoreItems,
  onRefresh,
  handleScroll,
}) => {
  // Don't use useCallback for ListHeaderComponent, just pass the component
  return (
    <View style={[homeScreenStyles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={homeScreenStyles.itemContainer}>
            <Text style={homeScreenStyles.itemText}>{item}</Text>
          </View>
        )}
        ListHeaderComponent={<ListHeaderComponent gradientOpacity={gradientOpacity} />}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={loading ? <ActivityIndicator style={{ margin: 10 }} /> : null}
        onScroll={handleScroll}
      />
    </View>
  );
});

export default HomeScreenUI;
