import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, PRODUCTS, Product } from '../../data/productsData';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';

interface CategoriesScreenProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  initialCategory = 'All',
  onSelectProduct,
  onOpenCart,
}) => {
  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const { addToCart, totalItemsCount } = useCart();

  const filtered = PRODUCTS.filter((p) => {
    return selectedCat === 'All' || p.category === selectedCat;
  });

  return (
    <View style={styles.screen}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.headerTitle}>All Categories</Text>
        <TouchableOpacity style={styles.cartBtn} onPress={onOpenCart}>
          <Ionicons name="cart-outline" size={24} color={COLORS.text} />
          {totalItemsCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItemsCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Category Horizontal Pills Slider with Native Ionicons */}
      <View style={styles.pillsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsScroll}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCat === cat.name;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCat(cat.name)}
                style={[
                  styles.pill,
                  isSelected && styles.pillActive,
                ]}>
                <Ionicons
                  name={cat.iconName}
                  size={16}
                  color={isSelected ? '#ffffff' : COLORS.text}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.pillText,
                    isSelected && styles.pillTextActive,
                  ]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            Showing {filtered.length} products in {selectedCat}
          </Text>
        </View>

        <View style={styles.productRow}>
          {filtered.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onPress={() => onSelectProduct(item)}
              onAddToCart={() => addToCart(item)}
            />
          ))}
        </View>
      </ScrollView>
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
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cartBtn: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  pillsContainer: {
    backgroundColor: COLORS.surface,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  pillsScroll: {
    paddingHorizontal: SPACING.lg,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  pillActive: {
    backgroundColor: COLORS.primary,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  pillTextActive: {
    color: '#ffffff',
  },
  grid: {
    padding: SPACING.lg,
  },
  countRow: {
    marginBottom: SPACING.md,
  },
  countText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  productRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
