import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { Product } from '../../data/productsData';
import { COLORS, SPACING } from '../../constants/theme';

interface WishlistScreenProps {
  onSelectProduct: (product: Product) => void;
  onExplore: () => void;
  onOpenCart: () => void;
}

type TabMode = 'all' | 'favorites';

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  onSelectProduct,
  onExplore,
  onOpenCart,
}) => {
  const { wishlist, toggleWishlist, addToCart, totalItemsCount } = useCart();
  const [activeTab, setActiveTab] = useState<TabMode>('all');

  // Filter based on tab
  const displayedItems = activeTab === 'favorites'
    ? wishlist.filter((item) => item.rating >= 4.5)
    : wishlist;

  return (
    <View style={styles.screen}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.headerTitle}>Wishlist & Favorites</Text>
          <Text style={styles.headerSub}>{wishlist.length} Saved Items</Text>
        </View>

        <TouchableOpacity style={styles.cartBtn} onPress={onOpenCart}>
          <Ionicons name="cart-outline" size={24} color={COLORS.text} />
          {totalItemsCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItemsCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Tabs: All Wishlist vs Top Favorites */}
      <View style={styles.tabsStrip}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'all' && styles.tabBtnActive]}
          onPress={() => setActiveTab('all')}>
          <Ionicons
            name="heart"
            size={16}
            color={activeTab === 'all' ? COLORS.primary : COLORS.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
            All Wishlist ({wishlist.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'favorites' && styles.tabBtnActive]}
          onPress={() => setActiveTab('favorites')}>
          <Ionicons
            name="star"
            size={16}
            color={activeTab === 'favorites' ? '#FFA000' : COLORS.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.tabTextActive]}>
            My Top Favorites ⭐
          </Text>
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      {displayedItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name={activeTab === 'favorites' ? 'star-outline' : 'heart-dislike-outline'}
            size={70}
            color="#BDBDBD"
          />
          <Text style={styles.emptyTitle}>
            {activeTab === 'favorites' ? 'No Top Favorites Yet' : 'Your Wishlist is Empty'}
          </Text>
          <Text style={styles.emptySub}>
            {activeTab === 'favorites'
              ? 'Products rated 4.5★ and above will automatically be grouped here.'
              : 'Explore our catalog and save items you love to shop later!'}
          </Text>
          <TouchableOpacity style={styles.exploreBtn} onPress={onExplore}>
            <Text style={styles.exploreBtnText}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {displayedItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <TouchableOpacity
                style={styles.imageBox}
                onPress={() => onSelectProduct(item)}>
                <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
              </TouchableOpacity>

              <View style={styles.details}>
                <View style={styles.cardTopRow}>
                  <Text style={styles.brand}>{item.brand.toUpperCase()}</Text>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={10} color="#ffffff" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>

                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{item.price.toLocaleString('en-IN')}</Text>
                  <Text style={styles.originalPrice}>
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </Text>
                </View>

                {/* Actions Row */}
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.moveToCartBtn}
                    onPress={() => {
                      addToCart(item);
                      toggleWishlist(item);
                    }}>
                    <Ionicons name="bag-add-outline" size={15} color="#ffffff" style={{ marginRight: 4 }} />
                    <Text style={styles.moveToCartText}>Move to Bag</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => toggleWishlist(item)}>
                    <Ionicons name="trash-outline" size={18} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
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
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabsStrip: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 12,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  tabBtnActive: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  list: {
    padding: SPACING.lg,
    gap: 12,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
  },
  imageBox: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moveToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  moveToCartText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteBtn: {
    padding: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 18,
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
  exploreBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
  },
  exploreBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
