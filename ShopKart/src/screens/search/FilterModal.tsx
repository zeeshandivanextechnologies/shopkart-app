import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

export interface FilterState {
  priceRange: 'all' | 'under1000' | '1000to3000' | '3000to5000' | 'above5000';
  brands: string[];
  minRating: number | null;
  colors: string[];
  sizes: string[];
  availability: {
    inStockOnly: boolean;
    onSaleOnly: boolean;
    fastDeliveryOnly: boolean;
  };
}

export const INITIAL_FILTER_STATE: FilterState = {
  priceRange: 'all',
  brands: [],
  minRating: null,
  colors: [],
  sizes: [],
  availability: {
    inStockOnly: false,
    onSaleOnly: false,
    fastDeliveryOnly: false,
  },
};

interface FilterModalProps {
  visible: boolean;
  filters: FilterState;
  onApplyFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  onClose: () => void;
}

type FilterTab = 'price' | 'brand' | 'rating' | 'color' | 'size' | 'availability';

const BRANDS_LIST = ['Nike', 'Apple', 'Sony', 'Adidas', 'Fossil', 'Levis', 'Samsung', 'Puma'];
const SIZES_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '7 UK', '8 UK', '9 UK', '10 UK'];
const COLORS_LIST = [
  { name: 'Black', hex: '#111827' },
  { name: 'White', hex: '#F9FAFB', border: true },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Grey', hex: '#6B7280' },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  filters,
  onApplyFilters,
  onResetFilters,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('price');
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);

  // Sync when opened
  React.useEffect(() => {
    setTempFilters(filters);
  }, [filters, visible]);

  const toggleBrand = (b: string) => {
    setTempFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(b)
        ? prev.brands.filter((item) => item !== b)
        : [...prev.brands, b],
    }));
  };

  const toggleColor = (c: string) => {
    setTempFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(c)
        ? prev.colors.filter((item) => item !== c)
        : [...prev.colors, c],
    }));
  };

  const toggleSize = (s: string) => {
    setTempFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(s)
        ? prev.sizes.filter((item) => item !== s)
        : [...prev.sizes, s],
    }));
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerBtn}>
            <Ionicons name="close" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity
            onPress={() => {
              setTempFilters(INITIAL_FILTER_STATE);
              onResetFilters();
            }}>
            <Text style={styles.resetText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Two-Pane Filter Body: Left Tabs + Right Controls */}
        <View style={styles.body}>
          {/* Left Tabs */}
          <View style={styles.tabsCol}>
            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'price' && styles.tabItemActive]}
              onPress={() => setActiveTab('price')}>
              <Text style={[styles.tabText, activeTab === 'price' && styles.tabTextActive]}>
                Price Range
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'brand' && styles.tabItemActive]}
              onPress={() => setActiveTab('brand')}>
              <Text style={[styles.tabText, activeTab === 'brand' && styles.tabTextActive]}>
                Brand {tempFilters.brands.length > 0 ? `(${tempFilters.brands.length})` : ''}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'rating' && styles.tabItemActive]}
              onPress={() => setActiveTab('rating')}>
              <Text style={[styles.tabText, activeTab === 'rating' && styles.tabTextActive]}>
                Customer Rating
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'color' && styles.tabItemActive]}
              onPress={() => setActiveTab('color')}>
              <Text style={[styles.tabText, activeTab === 'color' && styles.tabTextActive]}>
                Color {tempFilters.colors.length > 0 ? `(${tempFilters.colors.length})` : ''}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'size' && styles.tabItemActive]}
              onPress={() => setActiveTab('size')}>
              <Text style={[styles.tabText, activeTab === 'size' && styles.tabTextActive]}>
                Size {tempFilters.sizes.length > 0 ? `(${tempFilters.sizes.length})` : ''}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, activeTab === 'availability' && styles.tabItemActive]}
              onPress={() => setActiveTab('availability')}>
              <Text style={[styles.tabText, activeTab === 'availability' && styles.tabTextActive]}>
                Availability
              </Text>
            </TouchableOpacity>
          </View>

          {/* Right Content Pane */}
          <ScrollView style={styles.contentCol} showsVerticalScrollIndicator={false}>
            {/* 1. Price Range Filter */}
            {activeTab === 'price' && (
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionHeader}>Select Budget Range</Text>
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under1000', label: 'Under ₹1,000' },
                  { id: '1000to3000', label: '₹1,000 - ₹3,000' },
                  { id: '3000to5000', label: '₹3,000 - ₹5,000' },
                  { id: 'above5000', label: 'Above ₹5,000' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.radioRow}
                    onPress={() => setTempFilters({ ...tempFilters, priceRange: item.id as any })}>
                    <Ionicons
                      name={tempFilters.priceRange === item.id ? 'radio-button-on' : 'radio-button-off'}
                      size={20}
                      color={tempFilters.priceRange === item.id ? COLORS.primary : '#9E9E9E'}
                    />
                    <Text style={styles.optionLabel}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* 2. Brand Filter */}
            {activeTab === 'brand' && (
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionHeader}>Select Brands</Text>
                {BRANDS_LIST.map((brand) => {
                  const checked = tempFilters.brands.includes(brand);
                  return (
                    <TouchableOpacity
                      key={brand}
                      style={styles.checkboxRow}
                      onPress={() => toggleBrand(brand)}>
                      <Ionicons
                        name={checked ? 'checkbox' : 'square-outline'}
                        size={22}
                        color={checked ? COLORS.primary : '#9E9E9E'}
                      />
                      <Text style={styles.optionLabel}>{brand}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* 3. Rating Filter */}
            {activeTab === 'rating' && (
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionHeader}>Customer Rating</Text>
                {[
                  { rating: 4.5, label: '4.5★ & above' },
                  { rating: 4.0, label: '4.0★ & above' },
                  { rating: 3.5, label: '3.5★ & above' },
                  { rating: 3.0, label: '3.0★ & above' },
                ].map((r) => {
                  const selected = tempFilters.minRating === r.rating;
                  return (
                    <TouchableOpacity
                      key={r.rating}
                      style={styles.radioRow}
                      onPress={() =>
                        setTempFilters({
                          ...tempFilters,
                          minRating: selected ? null : r.rating,
                        })
                      }>
                      <Ionicons
                        name={selected ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                        color={selected ? COLORS.primary : '#9E9E9E'}
                      />
                      <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={14} color="#FFA000" />
                        <Text style={styles.ratingText}>{r.label}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* 4. Color Filter */}
            {activeTab === 'color' && (
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionHeader}>Colors Available</Text>
                <View style={styles.colorsGrid}>
                  {COLORS_LIST.map((c) => {
                    const selected = tempFilters.colors.includes(c.name);
                    return (
                      <TouchableOpacity
                        key={c.name}
                        style={[
                          styles.colorPill,
                          selected && styles.colorPillActive,
                        ]}
                        onPress={() => toggleColor(c.name)}>
                        <View
                          style={[
                            styles.colorDot,
                            { backgroundColor: c.hex },
                            c.border && { borderWidth: 1, borderColor: '#BDBDBD' },
                          ]}
                        />
                        <Text style={styles.colorPillText}>{c.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* 5. Size Filter */}
            {activeTab === 'size' && (
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionHeader}>Select Sizes</Text>
                <View style={styles.sizesGrid}>
                  {SIZES_LIST.map((sz) => {
                    const selected = tempFilters.sizes.includes(sz);
                    return (
                      <TouchableOpacity
                        key={sz}
                        style={[
                          styles.sizePill,
                          selected && styles.sizePillActive,
                        ]}
                        onPress={() => toggleSize(sz)}>
                        <Text
                          style={[
                            styles.sizePillText,
                            selected && styles.sizePillTextActive,
                          ]}>
                          {sz}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* 6. Availability Filter */}
            {activeTab === 'availability' && (
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionHeader}>Product Status & Speed</Text>

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() =>
                    setTempFilters({
                      ...tempFilters,
                      availability: {
                        ...tempFilters.availability,
                        inStockOnly: !tempFilters.availability.inStockOnly,
                      },
                    })
                  }>
                  <Ionicons
                    name={tempFilters.availability.inStockOnly ? 'checkbox' : 'square-outline'}
                    size={22}
                    color={tempFilters.availability.inStockOnly ? COLORS.primary : '#9E9E9E'}
                  />
                  <Text style={styles.optionLabel}>Exclude Out of Stock</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() =>
                    setTempFilters({
                      ...tempFilters,
                      availability: {
                        ...tempFilters.availability,
                        fastDeliveryOnly: !tempFilters.availability.fastDeliveryOnly,
                      },
                    })
                  }>
                  <Ionicons
                    name={tempFilters.availability.fastDeliveryOnly ? 'checkbox' : 'square-outline'}
                    size={22}
                    color={tempFilters.availability.fastDeliveryOnly ? COLORS.primary : '#9E9E9E'}
                  />
                  <Text style={styles.optionLabel}>Express / 1-Day Delivery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() =>
                    setTempFilters({
                      ...tempFilters,
                      availability: {
                        ...tempFilters.availability,
                        onSaleOnly: !tempFilters.availability.onSaleOnly,
                      },
                    })
                  }>
                  <Ionicons
                    name={tempFilters.availability.onSaleOnly ? 'checkbox' : 'square-outline'}
                    size={22}
                    color={tempFilters.availability.onSaleOnly ? COLORS.primary : '#9E9E9E'}
                  />
                  <Text style={styles.optionLabel}>Special Discount / On Sale</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Bottom Actions Bar */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerCloseBtn}
            onPress={onClose}>
            <Text style={styles.footerCloseText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => {
              onApplyFilters(tempFilters);
              onClose();
            }}>
            <Text style={styles.applyBtnText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.error,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  tabsCol: {
    width: '38%',
    backgroundColor: '#F3F4F6',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  tabItem: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabItemActive: {
    backgroundColor: COLORS.surface,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  contentCol: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
  },
  sectionWrap: {
    paddingBottom: SPACING.xl,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  optionLabel: {
    fontSize: 14,
    color: COLORS.text,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  colorPillActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#EEF2FF',
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  colorPillText: {
    fontSize: 13,
    color: COLORS.text,
  },
  sizesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizePill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sizePillActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  sizePillText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '600',
  },
  sizePillTextActive: {
    color: '#ffffff',
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    gap: 12,
  },
  footerCloseBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    alignItems: 'center',
  },
  footerCloseText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  applyBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
