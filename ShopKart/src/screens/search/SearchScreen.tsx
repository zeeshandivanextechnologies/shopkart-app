import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS, Product } from '../../data/productsData';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';
import { SortBottomSheet, SortOption } from './SortBottomSheet';
import { FilterModal, FilterState, INITIAL_FILTER_STATE } from './FilterModal';

const POPULAR_SEARCHES = [
  'Nike Air Max',
  'Noise Cancelling Headphones',
  'Smartwatches for Men',
  'Sony Wireless Earbuds',
  'Apple iPad Pro',
  'Levis Denim Jeans',
  'Running Shoes 9 UK',
  'Casual Winter Jackets',
];

const AUTO_SUGGESTIONS: { query: string; category: string }[] = [
  { query: 'Nike Air Max Running', category: 'Shoes' },
  { query: 'Sony WH-1000XM5 Headphones', category: 'Electronics' },
  { query: 'Apple iPad Pro M2', category: 'Electronics' },
  { query: 'Leather Bomber Jacket', category: 'Fashion' },
  { query: 'Fossil Gen 6 Smartwatch', category: 'Watches' },
  { query: 'Levis 511 Slim Fit Jeans', category: 'Fashion' },
  { query: 'Adidas Ultraboost Light', category: 'Shoes' },
  { query: 'Trekking & Travel Backpack', category: 'Accessories' },
];

interface SearchScreenProps {
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
  onOpenCart: () => void;
  initialQuery?: string;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onSelectProduct,
  onBack,
  onOpenCart,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isSubmitted, setIsSubmitted] = useState(Boolean(initialQuery));
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Wireless Earbuds',
    'Nike Running',
    'Smartwatch',
  ]);

  // Filter & Sort States
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeSort, setActiveSort] = useState<SortOption>('popular');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);

  const { addToCart, totalItemsCount } = useCart();

  // Add search term to history
  const handlePerformSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setIsSubmitted(true);
    setRecentSearches((prev) => [trimmed, ...prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 8));
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  const handleRemoveRecentItem = (itemToRemove: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== itemToRemove));
  };

  // Filtered & Sorted search results
  const searchResults = PRODUCTS.filter((product) => {
    // 1. Text Query Match
    const matchesQuery =
      !query ||
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase());

    if (!matchesQuery) return false;

    // 2. Budget Range Filter
    if (filters.priceRange === 'under1000' && product.price >= 1000) return false;
    if (filters.priceRange === '1000to3000' && (product.price < 1000 || product.price > 3000)) return false;
    if (filters.priceRange === '3000to5000' && (product.price < 3000 || product.price > 5000)) return false;
    if (filters.priceRange === 'above5000' && product.price <= 5000) return false;

    // 3. Brands Filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;

    // 4. Rating Filter
    if (filters.minRating !== null && product.rating < filters.minRating) return false;

    // 5. Colors Filter (Simulated check against colors list or product title)
    if (filters.colors.length > 0) {
      const matchColor = filters.colors.some((c) =>
        (product.colors || []).includes(c) || product.title.toLowerCase().includes(c.toLowerCase())
      );
      if (!matchColor) return false;
    }

    // 6. Sizes Filter (Simulated check against sizes list)
    if (filters.sizes.length > 0) {
      const matchSize = filters.sizes.some((s) => (product.sizes || []).includes(s));
      if (!matchSize) return false;
    }

    // 7. Availability Filter
    if (filters.availability.inStockOnly && !product.inStock) return false;
    if (filters.availability.onSaleOnly && (!product.originalPrice || product.originalPrice <= product.price)) return false;

    return true;
  }).sort((a, b) => {
    if (activeSort === 'price_low') return a.price - b.price;
    if (activeSort === 'price_high') return b.price - a.price;
    if (activeSort === 'rating_high') return b.rating - a.rating;
    if (activeSort === 'newest') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    return 0; // Default popular
  });

  const matchingSuggestions = AUTO_SUGGESTIONS.filter((s) =>
    s.query.toLowerCase().includes(query.toLowerCase())
  );

  const activeFiltersCount =
    (filters.priceRange !== 'all' ? 1 : 0) +
    filters.brands.length +
    (filters.minRating !== null ? 1 : 0) +
    filters.colors.length +
    filters.sizes.length +
    (filters.availability.inStockOnly ? 1 : 0) +
    (filters.availability.onSaleOnly ? 1 : 0) +
    (filters.availability.fastDeliveryOnly ? 1 : 0);

  return (
    <View style={styles.container}>
      {/* Search Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            placeholder="Search products, brands, styles..."
            placeholderTextColor={COLORS.textSecondary}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              if (!text) setIsSubmitted(false);
            }}
            onSubmitEditing={() => handlePerformSearch(query)}
            returnKeyType="search"
            autoFocus={!initialQuery}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setQuery('');
                setIsSubmitted(false);
              }}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={onOpenCart} style={styles.cartBtn}>
          <Ionicons name="bag-handle-outline" size={24} color={COLORS.text} />
          {totalItemsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItemsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* VIEW 1: Live Typeahead Suggestions */}
      {query.length > 0 && !isSubmitted ? (
        <ScrollView style={styles.suggestionsList} keyboardShouldPersistTaps="handled">
          <Text style={styles.sectionTitle}>Suggestions</Text>
          {matchingSuggestions.length > 0 ? (
            matchingSuggestions.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.suggestionRow}
                onPress={() => handlePerformSearch(item.query)}>
                <View style={styles.suggestionLeft}>
                  <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} />
                  <Text style={styles.suggestionText}>{item.query}</Text>
                </View>
                <Text style={styles.suggestionCategory}>in {item.category}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity
              style={styles.suggestionRow}
              onPress={() => handlePerformSearch(query)}>
              <View style={styles.suggestionLeft}>
                <Ionicons name="arrow-forward-outline" size={18} color={COLORS.primary} />
                <Text style={[styles.suggestionText, { color: COLORS.primary }]}>
                  Search for "{query}"
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
      ) : null}

      {/* VIEW 2: Empty Query Landing (Recent Searches & Popular Searches) */}
      {!query && !isSubmitted ? (
        <ScrollView style={styles.landingContent} keyboardShouldPersistTaps="handled">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.titleWithIcon}>
                  <Ionicons name="time-outline" size={18} color={COLORS.text} />
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                </View>
                <TouchableOpacity onPress={handleClearRecent}>
                  <Text style={styles.clearBtnText}>Clear All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.chipsWrap}>
                {recentSearches.map((item, idx) => (
                  <View key={idx} style={styles.recentChip}>
                    <TouchableOpacity onPress={() => handlePerformSearch(item)}>
                      <Text style={styles.recentChipText}>{item}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRemoveRecentItem(item)}>
                      <Ionicons name="close" size={14} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Popular Searches */}
          <View style={styles.sectionContainer}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="trending-up-outline" size={18} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Popular Searches 🔥</Text>
            </View>

            <View style={styles.popularGrid}>
              {POPULAR_SEARCHES.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.popularCard}
                  onPress={() => handlePerformSearch(item)}>
                  <Ionicons name="search" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.popularText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : null}

      {/* VIEW 3: Search Results Page with Filter & Sort Controls */}
      {isSubmitted && (
        <View style={styles.resultsContainer}>
          {/* Sort & Filter Bar */}
          <View style={styles.filterBar}>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setSortVisible(true)}>
              <Ionicons name="swap-vertical" size={16} color={COLORS.text} />
              <Text style={styles.filterBtnText}>Sort By</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setFilterVisible(true)}>
              <Ionicons name="options-outline" size={16} color={COLORS.primary} />
              <Text style={[styles.filterBtnText, activeFiltersCount > 0 && { color: COLORS.primary, fontWeight: '700' }]}>
                Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Active Applied Filters Strip */}
          {activeFiltersCount > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activeFiltersScroll}>
              {filters.priceRange !== 'all' && (
                <View style={styles.activeFilterBadge}>
                  <Text style={styles.activeFilterBadgeText}>Price: {filters.priceRange}</Text>
                </View>
              )}
              {filters.brands.map((b) => (
                <View key={b} style={styles.activeFilterBadge}>
                  <Text style={styles.activeFilterBadgeText}>{b}</Text>
                </View>
              ))}
              {filters.minRating && (
                <View style={styles.activeFilterBadge}>
                  <Text style={styles.activeFilterBadgeText}>{filters.minRating}★ & Above</Text>
                </View>
              )}
              {filters.colors.map((c) => (
                <View key={c} style={styles.activeFilterBadge}>
                  <Text style={styles.activeFilterBadgeText}>{c}</Text>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => setFilters(INITIAL_FILTER_STATE)}
                style={styles.clearAllBadge}>
                <Text style={styles.clearAllBadgeText}>Clear</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          {/* Search Result Count */}
          <View style={styles.countRow}>
            <Text style={styles.countText}>
              Showing <Text style={{ fontWeight: 'bold' }}>{searchResults.length}</Text> results for "{query}"
            </Text>
          </View>

          {/* Product Grid / Empty Result State */}
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.resultsGrid}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ProductCard
                  product={item}
                  onPress={() => onSelectProduct(item)}
                  onAddToCart={() => addToCart(item)}
                />
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={64} color="#BDBDBD" />
              <Text style={styles.emptyTitle}>No matching products found</Text>
              <Text style={styles.emptySub}>
                Try checking your spelling or use more general keywords like "shoes" or "headphones".
              </Text>
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => {
                  setFilters(INITIAL_FILTER_STATE);
                  setQuery('');
                  setIsSubmitted(false);
                }}>
                <Text style={styles.resetBtnText}>Clear Search & Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* Sort By Bottom Sheet */}
      <SortBottomSheet
        visible={sortVisible}
        activeSort={activeSort}
        onSelectSort={setActiveSort}
        onClose={() => setSortVisible(false)}
      />

      {/* Multi-Facet Filter Modal */}
      <FilterModal
        visible={filterVisible}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() => setFilters(INITIAL_FILTER_STATE)}
        onClose={() => setFilterVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    gap: 8,
  },
  backBtn: {
    padding: 6,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 42,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 0,
  },
  cartBtn: {
    padding: 6,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: COLORS.error,
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  landingContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  sectionContainer: {
    marginBottom: SPACING.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  clearBtnText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 6,
  },
  recentChipText: {
    fontSize: 13,
    color: COLORS.text,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  popularCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  popularText: {
    fontSize: 13,
    color: COLORS.text,
  },
  suggestionsList: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: COLORS.text,
  },
  suggestionCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  resultsContainer: {
    flex: 1,
  },
  filterBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  filterBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    width: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 8,
  },
  activeFiltersScroll: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    gap: 8,
    backgroundColor: '#F9FAFB',
  },
  activeFilterBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeFilterBadgeText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },
  clearAllBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  clearAllBadgeText: {
    fontSize: 11,
    color: COLORS.error,
    fontWeight: 'bold',
  },
  countRow: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  countText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  resultsGrid: {
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  resetBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  resetBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
