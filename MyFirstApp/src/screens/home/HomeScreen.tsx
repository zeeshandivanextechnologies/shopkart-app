import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, CATEGORIES, BANNERS, Product } from '../../data/productsData';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
  onOpenNotifications: () => void;
  onCategorySelect: (categoryName: string) => void;
  onOpenShowcase?: (type: 'featured' | 'trending' | 'bestselling' | 'new_arrivals' | 'recommended') => void;
  onOpenDeals?: (tab?: 'deals' | 'flash_sale') => void;
  onOpenBrands?: () => void;
  onOpenSubcategory?: (categoryName: string) => void;
  onOpenSearch?: (initialQuery?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectProduct,
  onOpenCart,
  onOpenNotifications,
  onCategorySelect,
  onOpenShowcase,
  onOpenDeals,
  onOpenBrands,
  onOpenSubcategory,
  onOpenSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const { addToCart, totalItemsCount } = useCart();

  const filteredProducts = PRODUCTS.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandLogo}>ShopKart</Text>
          <Text style={styles.brandSub}>Explore Plus ✨</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={onOpenNotifications}>
            <Ionicons name="notifications-outline" size={22} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerIconBtn} onPress={onOpenCart}>
            <Ionicons name="cart-outline" size={24} color="#ffffff" />
            {totalItemsCount > 0 ? (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItemsCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.searchBox}
          onPress={() => onOpenSearch?.(searchQuery)}>
          <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
          <TextInput
            placeholder="Search brands, shoes, tech, clothing..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => onOpenSearch?.(searchQuery)}
            style={styles.searchInput}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => onOpenSearch?.()}>
              <Ionicons name="options-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Category Horizontal Circles with Native Ionicons */}
        <View style={styles.categoriesSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.8}
                style={styles.categoryItem}
                onPress={() => onCategorySelect(cat.name)}>
                <View style={styles.categoryCircle}>
                  <Ionicons name={cat.iconName} size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Promo Banner Carousel */}
        <View style={styles.bannerWrapper}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const slide = Math.round(
                e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
              );
              setActiveBannerIndex(slide);
            }}>
            {BANNERS.map((banner, index) => (
              <TouchableOpacity
                key={banner.id}
                activeOpacity={0.9}
                style={styles.bannerCard}
                onPress={() => {
                  if (index === 0 && onOpenDeals) onOpenDeals('flash_sale');
                  else if (index === 1 && onOpenShowcase) onOpenShowcase('featured');
                  else if (onOpenDeals) onOpenDeals('deals');
                  else onCategorySelect('All');
                }}>
                <Image source={{ uri: banner.image }} style={styles.bannerImage} resizeMode="cover" />
                <View style={styles.bannerOverlay}>
                  <View style={styles.discountTag}>
                    <Text style={styles.discountTagText}>{banner.discount}</Text>
                  </View>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <Text style={styles.bannerSub}>{banner.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.dotsRow}>
            {BANNERS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  activeBannerIndex === i && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Quick Discovery Navigation Chips */}
        <View style={styles.quickNavSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickNavScroll}>
            <TouchableOpacity
              style={[styles.quickNavBtn, { backgroundColor: '#FFF3E0' }]}
              onPress={() => onOpenDeals?.('flash_sale')}>
              <Ionicons name="flash" size={16} color="#E65100" />
              <Text style={[styles.quickNavText, { color: '#E65100' }]}>Flash Sale</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickNavBtn, { backgroundColor: '#E8F5E9' }]}
              onPress={() => onOpenDeals?.('deals')}>
              <Ionicons name="pricetags" size={16} color="#2E7D32" />
              <Text style={[styles.quickNavText, { color: '#2E7D32' }]}>Deals & Offers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickNavBtn, { backgroundColor: '#EDE7F6' }]}
              onPress={() => onOpenBrands?.()}>
              <Ionicons name="ribbon" size={16} color="#512DA8" />
              <Text style={[styles.quickNavText, { color: '#512DA8' }]}>Top Brands</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickNavBtn, { backgroundColor: '#E1F5FE' }]}
              onPress={() => onOpenShowcase?.('featured')}>
              <Ionicons name="star" size={16} color="#0288D1" />
              <Text style={[styles.quickNavText, { color: '#0288D1' }]}>Featured</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickNavBtn, { backgroundColor: '#FCE4EC' }]}
              onPress={() => onOpenShowcase?.('bestselling')}>
              <Ionicons name="trophy" size={16} color="#C2185B" />
              <Text style={[styles.quickNavText, { color: '#C2185B' }]}>Best Sellers</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickNavBtn, { backgroundColor: '#F3E5F5' }]}
              onPress={() => onOpenShowcase?.('new_arrivals')}>
              <Ionicons name="sparkles" size={16} color="#7B1FA2" />
              <Text style={[styles.quickNavText, { color: '#7B1FA2' }]}>New Arrivals</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Features Trust Strip */}
        <View style={styles.featuresStrip}>
          <View style={styles.featureBox}>
            <Ionicons name="flash-outline" size={18} color={COLORS.primary} />
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
          <View style={styles.featureBox}>
            <Ionicons name="shield-checkmark-outline" size={18} color={COLORS.success} />
            <Text style={styles.featureText}>100% Genuine</Text>
          </View>
          <View style={styles.featureBox}>
            <Ionicons name="repeat-outline" size={18} color={COLORS.secondary} />
            <Text style={styles.featureText}>Easy Returns</Text>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Deals of the Day 🔥</Text>
          <Text style={styles.sectionSub}>Special handpicked discounts for you ({filteredProducts.length} items)</Text>
        </View>

        {/* Product Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.map((item) => (
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.primary,
  },
  brandContainer: {},
  brandLogo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  brandSub: {
    fontSize: 11,
    color: '#FFD700',
    fontStyle: 'italic',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBtn: {
    padding: 6,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: COLORS.secondary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchWrapper: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
  },
  categoriesSection: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.sm,
  },
  categoryScroll: {
    paddingHorizontal: SPACING.lg,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: 62,
  },
  categoryCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  bannerWrapper: {
    marginBottom: SPACING.sm,
  },
  bannerCard: {
    width: 360,
    height: 170,
    marginHorizontal: 10,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 14,
    justifyContent: 'flex-end',
  },
  discountTag: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 4,
  },
  discountTagText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerSub: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 2,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#BDBDBD',
  },
  activeDot: {
    width: 16,
    backgroundColor: COLORS.primary,
  },
  featuresStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
  },
  featureBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionHeader: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sectionSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  quickNavSection: {
    marginVertical: SPACING.xs,
  },
  quickNavScroll: {
    paddingHorizontal: SPACING.lg,
    gap: 10,
  },
  quickNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  quickNavText: {
    fontSize: 12,
    fontWeight: '700',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
});
