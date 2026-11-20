import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, Product } from '../../data/productsData';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  category: string;
  rating: number;
}

export const BRANDS: Brand[] = [
  {
    id: 'b_nike',
    name: 'Nike',
    tagline: 'Just Do It - Official Sports Gear',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    category: 'Footwear & Athletic',
    rating: 4.9,
  },
  {
    id: 'b_sony',
    name: 'Sony',
    tagline: 'Premium Audio & Noise Cancelling',
    logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    category: 'Electronics & Audio',
    rating: 4.8,
  },
  {
    id: 'b_apple',
    name: 'Apple',
    tagline: 'Think Different - M2 Tech Series',
    logo: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
    category: 'Electronics & Computing',
    rating: 4.9,
  },
  {
    id: 'b_adidas',
    name: 'Adidas',
    tagline: 'Impossible is Nothing - Boost Tech',
    logo: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400&q=80',
    category: 'Footwear & Lifestyle',
    rating: 4.7,
  },
  {
    id: 'b_fossil',
    name: 'Fossil',
    tagline: 'Timeless Luxury Touchscreen Wearables',
    logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    category: 'Watches & Wearables',
    rating: 4.6,
  },
  {
    id: 'b_levis',
    name: 'Levis',
    tagline: 'Original Quality Denim since 1853',
    logo: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&q=80',
    category: 'Fashion & Denim',
    rating: 4.7,
  },
];

interface BrandsScreenProps {
  initialBrand?: string;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
  onOpenCart: () => void;
}

export const BrandsScreen: React.FC<BrandsScreenProps> = ({
  initialBrand,
  onSelectProduct,
  onBack,
  onOpenCart,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(
    initialBrand ? BRANDS.find((b) => b.name.toLowerCase() === initialBrand.toLowerCase()) || null : null
  );
  const [search, setSearch] = useState('');
  const { addToCart, totalItemsCount } = useCart();

  const filteredBrands = BRANDS.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  const brandProducts = selectedBrand
    ? PRODUCTS.filter((p) => p.brand.toLowerCase() === selectedBrand.name.toLowerCase())
    : [];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={selectedBrand ? () => setSelectedBrand(null) : onBack}
          style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectedBrand ? selectedBrand.name + ' Official Store' : 'Official Brand Directory'}
        </Text>
        <TouchableOpacity style={styles.cartBtn} onPress={onOpenCart}>
          <Ionicons name="cart-outline" size={24} color={COLORS.text} />
          {totalItemsCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItemsCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Brand Details View */}
      {selectedBrand ? (
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Brand Hero Banner */}
          <View style={styles.brandHero}>
            <Image source={{ uri: selectedBrand.logo }} style={styles.brandHeroLogo} />
            <Text style={styles.brandHeroTitle}>{selectedBrand.name}</Text>
            <Text style={styles.brandHeroTag}>{selectedBrand.tagline}</Text>
            <View style={styles.brandRatingRow}>
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={14} color={COLORS.success} />
                <Text style={styles.verifiedText}>Verified Brand Mall</Text>
              </View>
              <Text style={styles.ratingText}>★ {selectedBrand.rating} Rating</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>PRODUCTS FROM {selectedBrand.name.toUpperCase()} ({brandProducts.length})</Text>
          <View style={styles.productsGrid}>
            {brandProducts.length > 0 ? (
              brandProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onPress={() => onSelectProduct(p)}
                  onAddToCart={() => addToCart(p)}
                />
              ))
            ) : (
              <View style={styles.emptyBox}>
                <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>More products launching soon for this brand!</Text>
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        /* Brand Directory List */
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search brands (e.g. Nike, Apple, Sony)..."
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          <Text style={styles.sectionTitle}>ALL VERIFIED BRAND PARTNERS ({filteredBrands.length})</Text>

          <View style={styles.brandList}>
            {filteredBrands.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                activeOpacity={0.8}
                style={styles.brandCard}
                onPress={() => setSelectedBrand(brand)}>
                <Image source={{ uri: brand.logo }} style={styles.brandLogo} />
                <View style={styles.brandInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={styles.brandName}>{brand.name}</Text>
                    <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.brandCategory}>{brand.category}</Text>
                  <Text style={styles.brandTaglineSmall} numberOfLines={1}>
                    {brand.tagline}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: { flex: 1, fontSize: 13, color: COLORS.text },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
    marginHorizontal: SPACING.lg,
    marginTop: 8,
    marginBottom: 8,
  },
  brandList: {
    paddingHorizontal: SPACING.lg,
    gap: 10,
  },
  brandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 14,
    elevation: 1,
  },
  brandLogo: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  brandInfo: {
    flex: 1,
    marginLeft: 12,
  },
  brandName: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
  brandCategory: { fontSize: 11, color: COLORS.primary, fontWeight: '600', marginTop: 1 },
  brandTaglineSmall: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  brandHero: {
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  brandHeroLogo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 10,
  },
  brandHeroTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  brandHeroTag: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2, textAlign: 'center' },
  brandRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedText: { fontSize: 11, fontWeight: 'bold', color: '#2E7D32' },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#F57C00' },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  emptyBox: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
});
