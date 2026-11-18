import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../data/productsData';
import { COLORS, SPACING } from '../constants/theme';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  const { toggleWishlist, isInWishlist } = useCart();
  const isFav = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        
        {/* Discount Badge */}
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discountPercent}% OFF</Text>
        </View>

        {/* Wishlist Heart Icon */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => toggleWishlist(product)}
          style={styles.wishlistBtn}>
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={18}
            color={isFav ? '#E91E63' : COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.brand}>{product.brand.toUpperCase()}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>

        <View style={styles.ratingBox}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{product.rating} </Text>
            <Ionicons name="star" size={10} color="#ffffff" />
          </View>
          <Text style={styles.reviewsText}>({product.reviewsCount})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
          <Text style={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cartBtn}
          onPress={onAddToCart}>
          <Ionicons name="cart-outline" size={14} color={COLORS.primary} style={{ marginRight: 4 }} />
          <Text style={styles.cartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    overflow: 'hidden',
    width: '48%',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    elevation: 2,
  },
  imageContainer: {
    height: 150,
    width: '100%',
    backgroundColor: '#FAFAFA',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#388E3C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  info: {
    padding: 10,
  },
  brand: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginVertical: 2,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#388E3C',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reviewsText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  cartBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 7,
    borderRadius: 8,
    marginTop: 8,
  },
  cartBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
