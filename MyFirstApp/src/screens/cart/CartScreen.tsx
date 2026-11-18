import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart, CartItem } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';
import { CouponListingModal, CouponItem } from './CouponListingModal';
import { GiftCardModal } from './GiftCardModal';
import { Product } from '../../data/productsData';

interface CartScreenProps {
  onBack: () => void;
  onExplore: () => void;
  onProceedCheckout: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  onBack,
  onExplore,
  onProceedCheckout,
  onSelectProduct,
}) => {
  const { cart, updateQuantity, removeFromCart, addToCart, totalAmount, totalDiscount, clearCart } = useCart();
  
  // Save for later local state
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);

  // Modals state
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [giftCardModalVisible, setGiftCardModalVisible] = useState(false);

  // Applied discounts
  const [appliedCoupon, setAppliedCoupon] = useState<CouponItem | null>({
    id: 'c_save200',
    code: 'SAVE200',
    discountAmount: 200,
    minOrderValue: 999,
    title: 'Flat ₹200 OFF on Orders Above ₹999',
    description: 'Special seasonal discount valid on all shoes and apparel.',
    expiryDate: 'Expires in 2 days',
  });
  const [giftCardDiscount, setGiftCardDiscount] = useState<number>(0);

  // Delivery & Total calculations
  const deliveryCharge = totalAmount > 999 ? 0 : 70;
  const couponDiscount = appliedCoupon && totalAmount >= appliedCoupon.minOrderValue ? appliedCoupon.discountAmount : 0;
  const finalPayable = Math.max(0, totalAmount + deliveryCharge - couponDiscount - giftCardDiscount);

  // Handle Save for Later
  const handleSaveForLater = (item: CartItem) => {
    setSavedForLater((prev) => [...prev, item]);
    removeFromCart(item.product.id);
  };

  const handleMoveToCart = (item: CartItem) => {
    addToCart(item.product, item.selectedSize, item.selectedColor);
    setSavedForLater((prev) => prev.filter((i) => i.product.id !== item.product.id));
  };

  const handleRemoveSaved = (productId: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.product.id !== productId));
  };

  return (
    <View style={styles.screen}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Bag ({cart.length})</Text>
        {cart.length > 0 ? (
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {cart.length === 0 && savedForLater.length === 0 ? (
        /* Empty Cart State */
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#BDBDBD" />
          <Text style={styles.emptyTitle}>Your Bag is Empty</Text>
          <Text style={styles.emptySub}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <TouchableOpacity style={styles.shopNowBtn} onPress={onExplore}>
            <Text style={styles.shopNowText}>Shop Today's Deals</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Free Delivery Meter */}
            <View style={styles.deliveryPromo}>
              <Ionicons name="flash-outline" size={18} color="#2E7D32" />
              <Text style={styles.deliveryPromoText}>
                {deliveryCharge === 0
                  ? 'Yay! You unlocked FREE Express Delivery on this order.'
                  : `Add ₹${1000 - totalAmount} more to unlock FREE Delivery!`}
              </Text>
            </View>

            {/* Cart Items List */}
            {cart.map((item) => (
              <View key={item.product.id} style={styles.itemCard}>
                <TouchableOpacity onPress={() => onSelectProduct?.(item.product)}>
                  <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                </TouchableOpacity>

                <View style={styles.itemDetails}>
                  <Text style={styles.brand}>{item.product.brand.toUpperCase()}</Text>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.product.title}
                  </Text>

                  {/* Size & Color Tags */}
                  {(item.selectedSize || item.selectedColor) && (
                    <View style={styles.metaRow}>
                      {item.selectedSize ? (
                        <View style={styles.metaBadge}>
                          <Text style={styles.metaText}>Size: {item.selectedSize}</Text>
                        </View>
                      ) : null}
                      {item.selectedColor ? (
                        <View style={styles.metaBadge}>
                          <Text style={styles.metaText}>Color: {item.selectedColor}</Text>
                        </View>
                      ) : null}
                    </View>
                  )}

                  <View style={styles.priceRow}>
                    <Text style={styles.price}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </Text>
                    {item.product.originalPrice > item.product.price && (
                      <Text style={styles.originalPrice}>
                        ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                      </Text>
                    )}
                  </View>

                  {/* Stepper + Actions */}
                  <View style={styles.actionRow}>
                    <View style={styles.stepper}>
                      <TouchableOpacity
                        style={styles.stepBtn}
                        onPress={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Text style={styles.stepBtnText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyNumber}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.stepBtn}
                        onPress={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Text style={styles.stepBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.secondaryActions}>
                      <TouchableOpacity
                        onPress={() => handleSaveForLater(item)}
                        style={styles.saveLaterBtn}>
                        <Ionicons name="bookmark-outline" size={15} color={COLORS.primary} />
                        <Text style={styles.saveLaterText}>Save for Later</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => removeFromCart(item.product.id)}
                        style={styles.deleteIconBtn}>
                        <Ionicons name="trash-outline" size={16} color={COLORS.error} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            {/* Coupons & Offers Trigger */}
            <TouchableOpacity
              style={styles.couponStrip}
              onPress={() => setCouponModalVisible(true)}>
              <View style={styles.couponStripLeft}>
                <Ionicons name="pricetag" size={20} color={COLORS.primary} />
                <View>
                  <Text style={styles.couponStripTitle}>
                    {appliedCoupon ? `Applied: ${appliedCoupon.code}` : 'Apply Coupons & Offers'}
                  </Text>
                  <Text style={styles.couponStripSub}>
                    {appliedCoupon ? `You saved ₹${couponDiscount} extra` : 'Check available bank & promo codes'}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>

            {/* Gift Card & Voucher Trigger */}
            <TouchableOpacity
              style={styles.couponStrip}
              onPress={() => setGiftCardModalVisible(true)}>
              <View style={styles.couponStripLeft}>
                <Ionicons name="gift-outline" size={20} color="#6366F1" />
                <View>
                  <Text style={styles.couponStripTitle}>
                    {giftCardDiscount > 0 ? `Gift Card: ₹${giftCardDiscount} Used` : 'Redeem Gift Card / Voucher'}
                  </Text>
                  <Text style={styles.couponStripSub}>Use your prepaid card balance</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>

            {/* Order Summary & Price Breakdown */}
            <View style={styles.billCard}>
              <Text style={styles.billTitle}>ORDER SUMMARY</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Bag Total ({cart.length} items)</Text>
                <Text style={styles.billValue}>₹{(totalAmount + totalDiscount).toLocaleString('en-IN')}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Product Discount</Text>
                <Text style={[styles.billValue, { color: COLORS.success }]}>
                  - ₹{totalDiscount.toLocaleString('en-IN')}
                </Text>
              </View>

              {couponDiscount > 0 && (
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Coupon ({appliedCoupon?.code})</Text>
                  <Text style={[styles.billValue, { color: COLORS.success }]}>
                    - ₹{couponDiscount}
                  </Text>
                </View>
              )}

              {giftCardDiscount > 0 && (
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Gift Voucher</Text>
                  <Text style={[styles.billValue, { color: COLORS.success }]}>
                    - ₹{giftCardDiscount}
                  </Text>
                </View>
              )}

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Charges</Text>
                <Text style={[styles.billValue, deliveryCharge === 0 && { color: COLORS.success }]}>
                  {deliveryCharge === 0 ? 'FREE' : '₹' + deliveryCharge}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.billRow}>
                <Text style={styles.totalLabel}>Total Payable</Text>
                <Text style={styles.totalValue}>₹{finalPayable.toLocaleString('en-IN')}</Text>
              </View>

              <View style={styles.savingNotice}>
                <Ionicons name="sparkles" size={14} color="#15803D" />
                <Text style={styles.savingNote}>
                  You are saving ₹{(totalDiscount + couponDiscount + giftCardDiscount).toLocaleString('en-IN')} on this order!
                </Text>
              </View>
            </View>

            {/* Save for Later Section */}
            {savedForLater.length > 0 && (
              <View style={styles.savedSection}>
                <Text style={styles.savedSectionTitle}>
                  Saved for Later ({savedForLater.length})
                </Text>

                {savedForLater.map((item) => (
                  <View key={item.product.id} style={styles.savedCard}>
                    <Image source={{ uri: item.product.image }} style={styles.savedImage} />
                    <View style={styles.savedInfo}>
                      <Text style={styles.savedBrand}>{item.product.brand}</Text>
                      <Text style={styles.savedTitle} numberOfLines={1}>
                        {item.product.title}
                      </Text>
                      <Text style={styles.savedPrice}>₹{item.product.price}</Text>

                      <View style={styles.savedActions}>
                        <TouchableOpacity
                          style={styles.moveBackBtn}
                          onPress={() => handleMoveToCart(item)}>
                          <Text style={styles.moveBackBtnText}>Move to Bag</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => handleRemoveSaved(item.product.id)}
                          style={styles.removeSavedBtn}>
                          <Text style={styles.removeSavedText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Checkout Sticky Bar */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.footerTotalLabel}>Final Amount</Text>
              <Text style={styles.footerTotalValue}>₹{finalPayable.toLocaleString('en-IN')}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutBtn} onPress={onProceedCheckout}>
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
              <Ionicons name="arrow-forward" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Coupon Listing Modal */}
      <CouponListingModal
        visible={couponModalVisible}
        orderTotal={totalAmount}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(c) => setAppliedCoupon(c)}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        onClose={() => setCouponModalVisible(false)}
      />

      {/* Gift Card Modal */}
      <GiftCardModal
        visible={giftCardModalVisible}
        appliedGiftCardBalance={giftCardDiscount}
        onApplyGiftCard={(amt) => setGiftCardDiscount(amt)}
        onRemoveGiftCard={() => setGiftCardDiscount(0)}
        onClose={() => setGiftCardModalVisible(false)}
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
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  clearText: {
    fontSize: 13,
    color: COLORS.error,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  deliveryPromo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E8F5E9',
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  deliveryPromoText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  itemImage: {
    width: 85,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
  },
  itemDetails: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  brand: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 4,
  },
  metaBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  metaText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
  },
  stepBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  stepBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  qtyNumber: {
    paddingHorizontal: 8,
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  secondaryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  saveLaterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  saveLaterText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  deleteIconBtn: {
    padding: 4,
  },
  couponStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.md,
  },
  couponStripLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  couponStripTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  couponStripSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  billCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.md,
  },
  billTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  billValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  savingNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  savingNote: {
    fontSize: 12,
    color: '#15803D',
    fontWeight: '600',
  },
  savedSection: {
    marginTop: SPACING.md,
  },
  savedSectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  savedCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.sm,
    alignItems: 'center',
  },
  savedImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  savedInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  savedBrand: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  savedTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 1,
  },
  savedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 2,
  },
  savedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 6,
  },
  moveBackBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  moveBackBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  removeSavedBtn: {
    padding: 4,
  },
  removeSavedText: {
    fontSize: 11,
    color: COLORS.error,
    fontWeight: '600',
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
  shopNowBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
  },
  shopNowText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  footerTotalLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  footerTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 12,
  },
  checkoutBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
