import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { CategoryDoc, CategoryItem } from '../../types/models';

const LEFT_WIDTH = 100;

type CategoryUIProps = {
  categories: CategoryDoc[];
  loading: boolean;
  selectedIndex: number;
  scrollViewRef: React.RefObject<ScrollView | null>;
  categoryRefs: React.MutableRefObject<Array<any>>;
  handleCategoryLayout: (idx: number) => (event: LayoutChangeEvent) => void;
  scrollToCategory: (idx: number) => void;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onProductCollectionPress: (categoryId: string, categoryLabel: string, item: CategoryItem) => void;
};

export const CategoryUI: React.FC<CategoryUIProps> = React.memo(({
  categories,
  loading,
  selectedIndex,
  scrollViewRef,
  categoryRefs,
  handleCategoryLayout,
  scrollToCategory,
  handleScroll,
  onProductCollectionPress,
}) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.leftPane}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedIndex === index && styles.selectedCategoryButton,
                ]}
                onPress={() => scrollToCategory(index)}
                activeOpacity={0.7}
              >
                <View style={styles.iconCircle}>
                  <Icon
                    name={item.icon}
                    size={22}
                    color={selectedIndex === index ? '#4CAF50' : '#555'}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryLabel,
                    selectedIndex === index && styles.selectedCategoryLabel,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <ScrollView
          style={styles.rightPane}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          scrollEventThrottle={16}
          onScroll={handleScroll}
        >
          {categories.map((category, idx) => (
            <View
              key={category.id}
              ref={el => { categoryRefs.current[idx] = el; }}
              onLayout={handleCategoryLayout(idx)}
            >
              <Text style={styles.categoryHeader}>{category.label}</Text>
              {category.image && (
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryBanner}
                  resizeMode="cover"
                />
              )}
              <View style={styles.itemRow}>
                {category.items.map((item: CategoryItem) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.itemCard}
                    onPress={() => onProductCollectionPress(category.id, category.label, item)}
                  >
                    <Image
                      source={{ uri: 'https://via.placeholder.com/80x80.png?text=No+Image' }}
                      style={styles.itemImage}
                    />
                    <Text style={styles.itemText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
});

// ...styles unchanged...


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD',
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  leftPane: {
    width: LEFT_WIDTH,
    backgroundColor: '#FAFAFA',
    borderRightWidth: 0.5,
    borderRightColor: '#CCC',
    paddingVertical: 12,
  },
  categoryButton: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#c0e3aa',
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 13,
    textAlign: 'center',
    color: '#555',
  },
  selectedCategoryLabel: {
    color: '#4CAF50',
  },
  rightPane: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
  },
  scrollViewContent: {
    paddingBottom: 16,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  categoryBanner: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#EEE',
  },
  itemRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#EEE',
  },
  itemText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
});
