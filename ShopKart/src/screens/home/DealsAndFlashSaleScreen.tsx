import React, { useState, useEffect } from 'react';
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
import { PRODUCTS, Product } from '../../data/productsData';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';

interface DealsAndFlashSaleScreenProps {
  initialTab?: 'deals' | 'flash_sale';
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
  onOpenCart: () => void;
}

export const DealsAndFlashSaleScreen: React.FC<DealsAndFlashSaleScreenProps> = ({
  initialTab = 'flash_sale',
  onSelectProduct,
  onBack,
  onOpenCart,
}) => {
  const [activeTab, setActiveTab] = useState<'deals' | 'flash_sale'>(initialTab);
  const { addToCart, totalItemsCount } = useCart();

  // Flash Sale Countdown Timer (Hours, Mins, Secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashDeals = PRODUCTS.slice(0, 6);

  const coupons = [
    { code: 'SAVE200', title: 'Flat ₹200 OFF', desc: 'Valid on orders above ₹999' },
    { code: 'MEGA50', title: 'Flat 50% Cashback', desc: 'Max discount ₹1,000 on HDFC Cards' },
    { code: 'FESTIVE10', title: '10% Extra OFF', desc: 'On all footwear & fashion brands' },
  ];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {activeTab === 'flash_sale' ? '⚡ Flash Sale Live' : '🎁 Deals & Offers'}
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

      {/* Tab Switcher */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'flash_sale' && styles.tabBtnActive]}
          onPress={() => setActiveTab('flash_sale')}>
          <Ionicons name="flash" size={16} color={activeTab === 'flash_sale' ? COLORS.primary : COLORS.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'flash_sale' && styles.tabTextActive]}>
            Flash Sale
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'deals' && styles.tabBtnActive]}
          onPress={() => setActiveTab('deals')}>
          <Ionicons name="gift-outline" size={16} color={activeTab === 'deals' ? COLORS.primary : COLORS.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'deals' && styles.tabTextActive]}>
            All Deals & Coupons
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {activeTab === 'flash_sale' ? (
          <>
            {/* Countdown Timer Box */}
            <View style={styles.timerCard}>
              <View style={styles.timerTop}>
                <Text style={styles.timerHeading}>LIMITED TIME BLITZ ⚡</Text>
                <Text style={styles.timerSub}>Hurry! Prices reset once the timer hits zero</Text>
              </View>

              <View style={styles.timerBoxesRow}>
                <View style={styles.timeDigitBox}>
                  <Text style={styles.digitText}>
                    {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
                  </Text>
                  <Text style={styles.digitLabel}>HOURS</Text>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.timeDigitBox}>
                  <Text style={styles.digitText}>
                    {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}
                  </Text>
                  <Text style={styles.digitLabel}>MINUTES</Text>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.timeDigitBox}>
                  <Text style={styles.digitText}>
                    {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
                  </Text>
                  <Text style={styles.digitLabel}>SECONDS</Text>
                </View>
              </View>
            </View>

            {/* Flash Sale Grid */}
            <Text style={styles.sectionTitle}>FLASH SALE DEALS ({flashDeals.length})</Text>
            <View style={styles.productsGrid}>
              {flashDeals.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onPress={() => onSelectProduct(p)}
                  onAddToCart={() => addToCart(p)}
                />
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Active Coupon Codes */}
            <Text style={styles.sectionTitle}>PROMO CODES & BANK DISCOUNTS</Text>
            <View style={styles.couponList}>
              {coupons.map((c) => (
                <View key={c.code} style={styles.couponCard}>
                  <View style={styles.couponLeft}>
                    <Text style={styles.couponCode}>{c.code}</Text>
                    <Text style={styles.couponTitle}>{c.title}</Text>
                    <Text style={styles.couponDesc}>{c.desc}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.copyBtn}
                    onPress={() => Alert.alert('Copied!', `Code ${c.code} copied to clipboard.`)}>
                    <Text style={styles.copyBtnText}>Copy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Mega Deals Feed */}
            <Text style={styles.sectionTitle}>TOP CLEARANCE OFFERS</Text>
            <View style={styles.productsGrid}>
              {PRODUCTS.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onPress={() => onSelectProduct(p)}
                  onAddToCart={() => addToCart(p)}
                />
              ))}
            </View>
          </>
        )}
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
    backgroundColor: '#F5F5F5',
  },
  tabBtnActive: {
    backgroundColor: COLORS.primaryLight,
  },
  tabText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.primary, fontWeight: 'bold' },
  scroll: { paddingBottom: 60 },
  timerCard: {
    backgroundColor: '#1E293B',
    margin: SPACING.lg,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  timerTop: { alignItems: 'center', marginBottom: 12 },
  timerHeading: { fontSize: 16, fontWeight: 'bold', color: '#FFD700', letterSpacing: 1 },
  timerSub: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  timerBoxesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeDigitBox: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 64,
  },
  digitText: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  digitLabel: { fontSize: 9, color: '#94A3B8', fontWeight: 'bold', marginTop: 2 },
  colon: { fontSize: 22, fontWeight: 'bold', color: '#FFD700' },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
    marginHorizontal: SPACING.lg,
    marginTop: 10,
    marginBottom: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  couponList: {
    paddingHorizontal: SPACING.lg,
    gap: 10,
    marginBottom: 10,
  },
  couponCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  couponLeft: { flex: 1 },
  couponCode: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  couponTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
  couponDesc: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  copyBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 },
});
