import React, { useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { PRODUCTS, CATEGORIES, Product } from '../../data/productsData';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';

export interface ProductsScreenProps {
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({
  onSelectProduct,
  onOpenCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { addToCart, totalItemsCount } = useCart();

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.screen}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.subtitle}>Welcome to Store</Text>
          <Text style={styles.title}>Find Your Style ✨</Text>
        </View>

        <TouchableOpacity onPress={onOpenCart} style={styles.cartButton}>
          <Text style={{ fontSize: 24 }}>🛒</Text>
          {totalItemsCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItemsCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <Searchbar
        placeholder="Search shoes, electronics, watches..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        elevation={1}
      />

      {/* Categories Filter Tabs */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <Chip
                key={cat.id}
                selected={isSelected}
                onPress={() => setSelectedCategory(cat.name)}
                style={[
                  styles.categoryChip,
                  isSelected && { backgroundColor: COLORS.primary },
                ]}
                textStyle={{
                  color: isSelected ? '#ffffff' : COLORS.text,
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}>
                {cat.name}
              </Chip>
            );
          })}
        </ScrollView>
      </View>

      {/* Products Feed */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => onSelectProduct(item)}
            onAddToCart={() => addToCart(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Koi product nahi mila 🔍</Text>
            <Text style={{ color: COLORS.textSecondary, marginTop: 4 }}>
              Kuch aur search karke dekhein!
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  searchbar: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
  },
  categoriesContainer: {
    paddingVertical: SPACING.xs,
  },
  categoriesList: {
    paddingHorizontal: SPACING.lg,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: COLORS.surface,
  },
  listContent: {
    padding: SPACING.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
});
