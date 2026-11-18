import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product, PRODUCTS } from '../../data/productsData';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';
import { ImageGalleryModal } from './ImageGalleryModal';
import { ProductReviewsModal } from './ProductReviewsModal';
import { WriteReviewModal } from './WriteReviewModal';
import { ProductVideoModal } from './ProductVideoModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onOpenCart: () => void;
  onBuyNow: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onOpenCart,
  onBuyNow,
  onSelectProduct,
}) => {
  const { addToCart, toggleWishlist, isInWishlist, totalItemsCount } = useCart();
  
  // Selection states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedPopup, setAddedPopup] = useState(false);

  // Modals visibility
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [writeReviewVisible, setWriteReviewVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Slider Ref
  const sliderRef = useRef<any>(null);

  // Mock initial reviews
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev_1',
      userName: 'Aakash Verma',
      rating: 5,
      title: 'Amazing quality! Highly recommend!',
      comment: 'The fit is great and the material feels super premium. Delivered in just 2 days.',
      date: '14 Nov 2026',
      verified: true,
    },
    {
      id: 'rev_2',
      userName: 'Priya Sundaram',
      rating: 4,
      title: 'Value for money',
      comment: 'Loved the color and comfortable design. Sizing is true to standard.',
      date: '10 Nov 2026',
      verified: true,
    },
  ]);

  const isFav = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const imageGallery = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  // Function to smoothly scroll slider to clicked thumbnail
  const handleThumbnailPress = (index: number) => {
    setActiveImageIndex(index);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        x: index * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    setAddedPopup(true);
    setTimeout(() => setAddedPopup(false), 2000);
  };

  const handleBuy = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    onBuyNow();
  };

  // Related & Similar Products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const similarProducts = PRODUCTS.filter(
    (p) => (p.brand === product.brand || p.price <= product.price * 1.3) && p.id !== product.id
  ).slice(0, 4);

  // Frequently Bought Together Bundle
  const bundleItem = relatedProducts[0] || PRODUCTS.find((p) => p.id !== product.id);
  const bundleCombinedPrice = product.price + (bundleItem ? bundleItem.price : 0);
  const bundleDiscountedPrice = Math.round(bundleCombinedPrice * 0.88); // 12% combo discount

  return (
    <View style={styles.screen}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => setVideoVisible(true)}>
            <Ionicons name="videocam-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => toggleWishlist(product)}>
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={24}
              color={isFav ? COLORS.error : COLORS.text}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerBtn} onPress={onOpenCart}>
            <Ionicons name="cart-outline" size={24} color={COLORS.text} />
            {totalItemsCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalItemsCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. Main Multi-Image Swipeable Slider Carousel */}
        <View style={styles.sliderWrapper}>
          <ScrollView
            ref={sliderRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const slide = Math.round(
                e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
              );
              setActiveImageIndex(slide);
            }}
            scrollEventThrottle={16}>
            {imageGallery.map((imgUri, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.95}
                onPress={() => setGalleryVisible(true)}
                style={styles.slideContainer}>
                <Image
                  source={{ uri: imgUri }}
                  style={styles.sliderImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Discount Pill & Video Badge */}
          {discountPercent > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>{discountPercent}% OFF</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.videoPill}
            onPress={() => setVideoVisible(true)}>
            <Ionicons name="play-circle" size={16} color="#ffffff" />
            <Text style={styles.videoPillText}>Watch Demo</Text>
          </TouchableOpacity>

          {/* Full Screen Zoom Button */}
          <TouchableOpacity
            style={styles.zoomBtn}
            onPress={() => setGalleryVisible(true)}>
            <Ionicons name="scan-outline" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Clickable Image Gallery Thumbnails */}
        <View style={styles.thumbnailsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbnailsContainer}>
            {imageGallery.map((imgUri, index) => {
              const isActive = activeImageIndex === index;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => handleThumbnailPress(index)}
                  style={[
                    styles.thumbnailBox,
                    isActive && styles.thumbnailBoxActive,
                  ]}>
                  <Image
                    source={{ uri: imgUri }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Product Information Card */}
        <View style={styles.infoCard}>
          {/* Brand & Category */}
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>{product.brand.toUpperCase()}</Text>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{product.category}</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{product.title}</Text>

          {/* Ratings & Reviews trigger */}
          <TouchableOpacity
            style={styles.ratingRow}
            onPress={() => setReviewsVisible(true)}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{product.rating} </Text>
              <Ionicons name="star" size={12} color="#ffffff" />
            </View>
            <Text style={styles.reviewsText}>
              {reviewsList.length} Customer Reviews & Ratings ›
            </Text>
          </TouchableOpacity>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
            <Text style={styles.originalPrice}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.discountText}>Special Price</Text>
          </View>

          {/* Select Size Section */}
          {product.sizes && product.sizes.length > 0 ? (
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Select Size</Text>
                <Text style={styles.sizeGuideText}>Size Guide 📏</Text>
              </View>
              <View style={styles.sizeRow}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    style={[
                      styles.sizeBtn,
                      selectedSize === size && styles.sizeBtnActive,
                    ]}>
                    <Text
                      style={[
                        styles.sizeText,
                        selectedSize === size && styles.sizeTextActive,
                      ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null}

          {/* Select Color Section */}
          {product.colors && product.colors.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Select Color: <Text style={{ color: COLORS.primary, fontWeight: '700' }}>{selectedColor}</Text>
              </Text>
              <View style={styles.colorRow}>
                {product.colors.map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setSelectedColor(c)}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: c },
                      selectedColor === c && styles.colorCircleActive,
                    ]}
                  />
                ))}
              </View>
            </View>
          ) : null}

          {/* Select Quantity Stepper */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Quantity</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Ionicons name="remove" size={18} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity((q) => Math.min(5, q + 1))}>
                <Ionicons name="add" size={18} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.maxQtyNotice}>Max 5 units per order</Text>
            </View>
          </View>

          {/* Delivery & Highlights Strip */}
          <View style={styles.trustBox}>
            <View style={styles.trustItem}>
              <Ionicons name="airplane-outline" size={22} color={COLORS.primary} />
              <View>
                <Text style={styles.trustTitle}>Free Express Delivery</Text>
                <Text style={styles.trustSub}>Delivered within 2-3 business days</Text>
              </View>
            </View>

            <View style={styles.trustItem}>
              <Ionicons name="refresh-outline" size={22} color={COLORS.secondary} />
              <View>
                <Text style={styles.trustTitle}>7 Days Easy Return</Text>
                <Text style={styles.trustSub}>No questions asked return policy</Text>
              </View>
            </View>

            <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark-outline" size={22} color={COLORS.success} />
              <View>
                <Text style={styles.trustTitle}>100% Authentic Product</Text>
                <Text style={styles.trustSub}>Directly sourced from official brand</Text>
              </View>
            </View>
          </View>

          {/* Product Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Description</Text>
            <Text
              numberOfLines={isDescExpanded ? undefined : 3}
              style={styles.descriptionText}>
              {product.description}
            </Text>
            <TouchableOpacity onPress={() => setIsDescExpanded(!isDescExpanded)}>
              <Text style={styles.readMoreText}>
                {isDescExpanded ? 'Show Less ▲' : 'Read More ▼'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Product Specifications Table */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Specifications</Text>
            <View style={styles.specsTable}>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Brand</Text>
                <Text style={styles.specVal}>{product.brand}</Text>
              </View>
              <View style={[styles.specRow, styles.specRowAlt]}>
                <Text style={styles.specKey}>Category</Text>
                <Text style={styles.specVal}>{product.category}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Availability</Text>
                <Text style={[styles.specVal, { color: COLORS.success, fontWeight: '700' }]}>
                  {product.inStock ? 'In Stock (Ready to Ship)' : 'Out of Stock'}
                </Text>
              </View>
              <View style={[styles.specRow, styles.specRowAlt]}>
                <Text style={styles.specKey}>Warranty</Text>
                <Text style={styles.specVal}>1 Year Manufacturer Domestic Warranty</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specKey}>Country of Origin</Text>
                <Text style={styles.specVal}>India</Text>
              </View>
            </View>
          </View>

          {/* Frequently Bought Together Combo */}
          {bundleItem && (
            <View style={styles.bundleSection}>
              <View style={styles.bundleHeader}>
                <Ionicons name="gift-outline" size={20} color={COLORS.primary} />
                <Text style={styles.bundleTitle}>Frequently Bought Together</Text>
              </View>
              <View style={styles.bundleRow}>
                <Image source={{ uri: product.image }} style={styles.bundleThumb} />
                <Text style={styles.bundlePlus}>+</Text>
                <Image source={{ uri: bundleItem.image }} style={styles.bundleThumb} />
                <View style={styles.bundleInfo}>
                  <Text style={styles.bundlePrice}>₹{bundleDiscountedPrice}</Text>
                  <Text style={styles.bundleSaveText}>Combo 12% OFF!</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addBundleBtn}
                onPress={() => {
                  addToCart(product, selectedSize, selectedColor);
                  addToCart(bundleItem);
                  setAddedPopup(true);
                  setTimeout(() => setAddedPopup(false), 2000);
                }}>
                <Text style={styles.addBundleBtnText}>Add Both to Cart (₹{bundleDiscountedPrice})</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <View style={styles.carouselSection}>
              <Text style={styles.carouselTitle}>Related Products ⚡</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recScroll}>
                {relatedProducts.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.recCard}
                    onPress={() => onSelectProduct?.(p)}>
                    <Image source={{ uri: p.image }} style={styles.recImage} />
                    <Text style={styles.recTitle} numberOfLines={1}>{p.title}</Text>
                    <Text style={styles.recPrice}>₹{p.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Similar Products Carousel */}
          {similarProducts.length > 0 && (
            <View style={styles.carouselSection}>
              <Text style={styles.carouselTitle}>Similar Products You May Like</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recScroll}>
                {similarProducts.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.recCard}
                    onPress={() => onSelectProduct?.(p)}>
                    <Image source={{ uri: p.image }} style={styles.recImage} />
                    <Text style={styles.recTitle} numberOfLines={1}>{p.title}</Text>
                    <Text style={styles.recPrice}>₹{p.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Added to cart toast */}
      {addedPopup ? (
        <View style={styles.toast}>
          <Text style={styles.toastText}>✓ Added to your Shopping Bag!</Text>
        </View>
      ) : null}

      {/* Sticky Dual Action Buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cartActionBtn}
          onPress={handleAdd}>
          <Ionicons name="cart-outline" size={18} color={COLORS.text} style={{ marginRight: 6 }} />
          <Text style={styles.cartActionText}>Add to Cart ({quantity})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buyActionBtn}
          onPress={handleBuy}>
          <Ionicons name="flash-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.buyActionText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <ImageGalleryModal
        visible={galleryVisible}
        images={imageGallery}
        initialIndex={activeImageIndex}
        productTitle={product.title}
        onClose={() => setGalleryVisible(false)}
      />

      <ProductReviewsModal
        visible={reviewsVisible}
        product={product}
        reviews={reviewsList}
        onOpenWriteReview={() => {
          setReviewsVisible(false);
          setWriteReviewVisible(true);
        }}
        onClose={() => setReviewsVisible(false)}
      />

      <WriteReviewModal
        visible={writeReviewVisible}
        product={product}
        onClose={() => setWriteReviewVisible(false)}
        onSubmitSuccess={(newReview) => {
          setReviewsList((prev) => [
            {
              id: `rev_${Date.now()}`,
              ...newReview,
              verified: true,
            },
            ...prev,
          ]);
        }}
      />

      <ProductVideoModal
        visible={videoVisible}
        product={product}
        onClose={() => setVideoVisible(false)}
      />
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
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  headerBtn: {
    padding: 6,
    position: 'relative',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    fontSize: 9,
    fontWeight: 'bold',
  },
  sliderWrapper: {
    width: SCREEN_WIDTH,
    height: 340,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: COLORS.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  videoPill: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  videoPillText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  zoomBtn: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 20,
  },
  thumbnailsWrapper: {
    backgroundColor: '#ffffff',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  thumbnailsContainer: {
    paddingHorizontal: SPACING.lg,
    gap: 10,
  },
  thumbnailBox: {
    width: 58,
    height: 58,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
  },
  thumbnailBoxActive: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  categoryPill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryPillText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewsText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginVertical: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  originalPrice: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontSize: 13,
    color: COLORS.success,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: SPACING.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  sizeGuideText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeBtn: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  sizeBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  sizeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sizeTextActive: {
    color: '#ffffff',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleActive: {
    borderColor: COLORS.primary,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  maxQtyNotice: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  trustBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: SPACING.md,
    gap: 14,
    marginVertical: SPACING.md,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trustTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  trustSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  descriptionText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
  readMoreText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
  specsTable: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  specRowAlt: {
    backgroundColor: '#F9FAFB',
  },
  specKey: {
    width: '38%',
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  specVal: {
    width: '62%',
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
  },
  bundleSection: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: SPACING.md,
    marginVertical: SPACING.md,
  },
  bundleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  bundleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bundleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  bundleThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  bundlePlus: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  bundleInfo: {
    marginLeft: 8,
  },
  bundlePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  bundleSaveText: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: 'bold',
  },
  addBundleBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBundleBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  carouselSection: {
    marginTop: SPACING.lg,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  recScroll: {
    gap: 12,
  },
  recCard: {
    width: 130,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  recImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 6,
  },
  recTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  recPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 2,
  },
  toast: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 999,
  },
  toastText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    gap: 12,
  },
  cartActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: COLORS.text,
    paddingVertical: 14,
    borderRadius: 10,
  },
  cartActionText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  buyActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buyActionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
