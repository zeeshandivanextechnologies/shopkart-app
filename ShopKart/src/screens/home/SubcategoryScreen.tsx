import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, PRODUCTS, Product } from '../../data/productsData';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';

interface Subcategory {
  id: string;
  name: string;
  category: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const SUBCATEGORIES: Subcategory[] = [
  // Shoes
  { id: 'sub_s1', name: 'Running Shoes', category: 'Shoes', icon: 'footsteps-outline' },
  { id: 'sub_s2', name: 'Sneakers & Casual', category: 'Shoes', icon: 'walk-outline' },
  { id: 'sub_s3', name: 'Sports & Training', category: 'Shoes', icon: 'fitness-outline' },
  // Electronics
  { id: 'sub_e1', name: 'Wireless Headphones', category: 'Electronics', icon: 'headset-outline' },
  { id: 'sub_e2', name: 'Bluetooth Speakers', category: 'Electronics', icon: 'volume-high-outline' },
  { id: 'sub_e3', name: 'Tablets & iPads', category: 'Electronics', icon: 'tablet-portrait-outline' },
  // Fashion
  { id: 'sub_f1', name: 'Jackets & Coats', category: 'Fashion', icon: 'shirt-outline' },
  { id: 'sub_f2', name: 'Casual Shirts', category: 'Fashion', icon: 'body-outline' },
  { id: 'sub_f3', name: 'Cargo Pants & Jeans', category: 'Fashion', icon: 'cut-outline' },
  // Watches
  { id: 'sub_w1', name: 'Smartwatches', category: 'Watches', icon: 'watch-outline' },
  { id: 'sub_w2', name: 'Rugged Sports Watches', category: 'Watches', icon: 'speedometer-outline' },
  // Accessories
  { id: 'sub_a1', name: 'Trekking Backpacks', category: 'Accessories', icon: 'briefcase-outline' },
  { id: 'sub_a2', name: 'Sunglasses & Eyewear', category: 'Accessories', icon: 'glasses-outline' },
];

interface SubcategoryScreenProps {
  initialCategory?: string;
  categoryName?: string;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
  onOpenCart: () => void;
}

export const SubcategoryScreen: React.FC<SubcategoryScreenProps> = ({
  initialCategory,
  categoryName,
  onSelectProduct,
  onBack,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categoryName || initialCategory || 'Shoes');
  const [selectedSubId, setSelectedSubId] = useState<string>('all');

  const { addToCart, totalItemsCount } = useCart();

  const relevantSubcategories = SUBCATEGORIES.filter(
    (s) => s.category === selectedCategory
  );

  const filteredProducts = PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <View style={styles.screen}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedCategory} Subcategories</Text>
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
        {/* Category Switcher Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catTabScroll}>
          {['Shoes', 'Electronics', 'Fashion', 'Watches', 'Accessories'].map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => {
                setSelectedCategory(cat);
                setSelectedSubId('all');
              }}
              style={[
                styles.catTab,
                selectedCategory === cat && styles.catTabActive,
              ]}>
              <Text
                style={[
                  styles.catTabText,
                  selectedCategory === cat && styles.catTabTextActive,
                ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Subcategories Horizontal Grid Cards */}
        <Text style={styles.sectionTitle}>EXPLORE BY TYPE</Text>
        <View style={styles.subGrid}>
          <TouchableOpacity
            onPress={() => setSelectedSubId('all')}
            style={[
              styles.subCard,
              selectedSubId === 'all' && styles.subCardActive,
            ]}>
            <View style={styles.subIconCircle}>
              <Ionicons name="grid-outline" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.subName}>All {selectedCategory}</Text>
          </TouchableOpacity>

          {relevantSubcategories.map((sub) => {
            const isSubSelected = selectedSubId === sub.id;
            return (
              <TouchableOpacity
                key={sub.id}
                onPress={() => setSelectedSubId(sub.id)}
                style={[
                  styles.subCard,
                  isSubSelected && styles.subCardActive,
                ]}>
                <View style={styles.subIconCircle}>
                  <Ionicons name={sub.icon} size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.subName}>{sub.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Products Grid */}
        <View style={styles.productsHeader}>
          <Text style={styles.sectionTitle}>AVAILABLE PRODUCTS ({filteredProducts.length})</Text>
        </View>

        <View style={styles.productsGrid}>
          {filteredProducts.map((p) => (
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
  catTabScroll: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  catTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  catTabActive: { backgroundColor: COLORS.primary },
  catTabText: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  catTabTextActive: { color: '#ffffff', fontWeight: 'bold' },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
    marginHorizontal: SPACING.lg,
    marginTop: 14,
    marginBottom: 8,
  },
  subGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: 10,
  },
  subCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  subCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  subIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subName: { fontSize: 12, fontWeight: '600', color: COLORS.text, flex: 1 },
  productsHeader: { marginTop: 10 },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginTop: 4,
  },
});
