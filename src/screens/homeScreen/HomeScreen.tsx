import React from "react";
import HomeScreenUI from "./HomeScreenUI";
import { useHomeScreenLogic } from "./HomeScreenLogic";

const HomeScreen: React.FC = React.memo(() => {
  const {
    insets,
    items,
    loading,
    refreshing,
    gradientOpacity,
    loadMoreItems,
    onRefresh,
    handleScroll,
  } = useHomeScreenLogic();

  return (
    <HomeScreenUI
      insets={insets}
      items={items}
      loading={loading}
      refreshing={refreshing}
      gradientOpacity={gradientOpacity}
      loadMoreItems={loadMoreItems}
      onRefresh={onRefresh}
      handleScroll={handleScroll}
    />
  );
});

export default HomeScreen;
