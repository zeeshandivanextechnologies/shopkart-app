import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, Product } from '../../data/productsData';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';

export type ProductFilterType =
  | 'featured'
  | 'trending'
  | 'bestseller'
  | 'bestselling'
  | 'new_arrivals'
  | 'recommended';

interface ProductShowcaseScreenProps {
  type?: ProductFilterType;
  showcaseType?: ProductFilterType;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
  onOpenCart: () => void;
}

export const ProductShowcaseScreen: React.FC<ProductShowcaseScreenProps> = ({
  type,
  showcaseType,
  onSelectProduct,
  onBack,
  onOpenCart,
}) => {
  const activeType = showcaseType || type || 'featured';
  const { addToCart, totalItemsCount } = useCart();
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high'>('popular');

  const getConfig = () => {
    switch (activeType) {
      case 'featured':
        return {
          title: 'Featured Collection',
          subtitle: 'Handpicked products curated by our experts',
          badge: 'FEATURED EXCLUSIVE',
          color: COLORS.primary,
        };
      case 'trending':
        return {
          title: 'Trending Deals 🔥',
          subtitle: 'Most viewed & viral styles right now',
          badge: 'HOT & TRENDING',
          color: COLORS.secondary,
        };
      case 'bestseller':
      case 'bestselling':
        return {
          title: 'Best Selling Items ⭐',
          subtitle: 'Highest-rated products with 1000+ orders',
          badge: 'TOP SELLERS',
          color: '#F57C00',
        };
      case 'new_arrivals':
        return {
          title: 'New Arrivals ✨',
          subtitle: 'Fresh seasonal drops & 2026 brand launches',
          badge: 'JUST LAUNCHED',
          color: '#388E3C',
        };
      case 'recommended':
        return {
          title: 'Recommended For You',
          subtitle: 'Personalized picks based on your recent searches',
          badge: 'AI RECOMMENDED',
          color: '#7B1FA2',
        };
    }
  };

  const config = getConfig();

  let products = [...PRODUCTS];
  if (sortBy === 'price_low') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_high') {
    products.sort((a, b) => b.price - a.price);
  } else {
    products.sort((a, b) => b.rating - a.rating);
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{config.title}</Text>
        <TouchableOpacity style={styles.cartBtn} onPress={onOpenCart}>
          <Ionicons name="cart-outline" size={24} color={COLORS.text} />
          {totalItemsCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItemsCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Hero Title Banner */}
        <View style={[styles.heroBanner, { backgroundColor: config.color }]}>
          <View style={styles.badgeTag}>
            <Text style={styles.badgeTagText}>{config.badge}</Text>
          </View>
          <Text style={styles.heroTitle}>{config.title}</Text>
          <Text style={styles.heroSub}>{config.subtitle}</Text>
        </View>

        {/* Sort Controls */}
        <View style={styles.sortBar}>
          <Text style={styles.sortLabel}>Sort By:</Text>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === 'popular' && styles.sortBtnActive]}
            onPress={() => setSortBy('popular')}>
            <Text style={[styles.sortText, sortBy === 'popular' && styles.sortTextActive]}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === 'price_low' && styles.sortBtnActive]}
            onPress={() => setSortBy('price_low')}>
            <Text style={[styles.sortText, sortBy === 'price_low' && styles.sortTextActive]}>Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === 'price_high' && styles.sortBtnActive]}
            onPress={() => setSortBy('price_high')}>
            <Text style={[styles.sortText, sortBy === 'price_high' && styles.sortTextActive]}>Price: High to Low</Text>
          </TouchableOpacity>
        </View>

        {/* Grid Products */}
        <View style={styles.productsGrid}>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={() => onSelectProduct(p)}
              onAddToCart={() => addToCart(p)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    elevation: 2,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  cartBtn: { position: 'relative', padding: 4 },
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
  badgeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  scroll: { paddingBottom: 60 },
  heroBanner: {
    padding: SPACING.lg,
    paddingVertical: 20,
    borderRadius: 16,
    margin: SPACING.lg,
    elevation: 3,
  },
  badgeTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  badgeTagText: { color: '#ffffff', fontSize: 10, fontWeight: 'bold' },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: '#ffffff' },
  heroSub: { fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  sortBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    gap: 8,
    marginBottom: 12,
  },
  sortLabel: { fontSize: 12, fontWeight: 'bold', color: COLORS.textSecondary },
  sortBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sortBtnActive: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  sortText: { fontSize: 11, color: COLORS.text, fontWeight: '500' },
  sortTextActive: { color: COLORS.primary, fontWeight: 'bold' },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
});
