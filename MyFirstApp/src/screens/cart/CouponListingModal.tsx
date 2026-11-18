import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

export interface CouponItem {
  id: string;
  code: string;
  discountAmount: number;
  minOrderValue: number;
  title: string;
  description: string;
  expiryDate: string;
}

export const AVAILABLE_COUPONS: CouponItem[] = [
  {
    id: 'c_save200',
    code: 'SAVE200',
    discountAmount: 200,
    minOrderValue: 999,
    title: 'Flat ₹200 OFF on Orders Above ₹999',
    description: 'Special seasonal discount valid on all shoes and apparel.',
    expiryDate: 'Expires in 2 days',
  },
  {
    id: 'c_welcome500',
    code: 'WELCOME500',
    discountAmount: 500,
    minOrderValue: 2499,
    title: 'First App Order - Flat ₹500 OFF',
    description: 'Valid for new app customers on cart value over ₹2,499.',
    expiryDate: 'Expires in 5 days',
  },
  {
    id: 'c_super100',
    code: 'SUPER100',
    discountAmount: 100,
    minOrderValue: 499,
    title: 'Extra ₹100 Cashback Voucher',
    description: 'Instant deduction on accessories, smartwatches & tech items.',
    expiryDate: 'Expires in 7 days',
  },
  {
    id: 'c_hdfc300',
    code: 'HDFC300',
    discountAmount: 300,
    minOrderValue: 1999,
    title: 'HDFC Bank Special - ₹300 OFF',
    description: 'Applicable when you checkout using any Credit/Debit Card.',
    expiryDate: 'Expires end of month',
  },
];

interface CouponModalProps {
  visible: boolean;
  orderTotal: number;
  appliedCoupon: CouponItem | null;
  onApplyCoupon: (coupon: CouponItem) => void;
  onRemoveCoupon: () => void;
  onClose: () => void;
}

export const CouponListingModal: React.FC<CouponModalProps> = ({
  visible,
  orderTotal,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onClose,
}) => {
  const [customCode, setCustomCode] = useState('');

  const handleApplyCustom = () => {
    const trimmed = customCode.trim().toUpperCase();
    if (!trimmed) return;

    const found = AVAILABLE_COUPONS.find((c) => c.code === trimmed);
    if (found) {
      if (orderTotal < found.minOrderValue) {
        Alert.alert(
          'Minimum Cart Value Not Met',
          `Add ₹${found.minOrderValue - orderTotal} more to your cart to use ${found.code}.`
        );
        return;
      }
      onApplyCoupon(found);
      setCustomCode('');
      onClose();
    } else {
      Alert.alert('Invalid Coupon', 'Please check the code or pick from the list below.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Apply Coupon</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Custom Promo Code Input Box */}
          <View style={styles.inputCard}>
            <View style={styles.inputWrapper}>
              <Ionicons name="pricetag-outline" size={18} color={COLORS.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Enter promo or coupon code"
                placeholderTextColor={COLORS.textSecondary}
                value={customCode}
                onChangeText={setCustomCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity style={styles.applyBtn} onPress={handleApplyCustom}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Applied Coupon Banner */}
          {appliedCoupon && (
            <View style={styles.appliedCard}>
              <View style={styles.appliedLeft}>
                <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
                <View>
                  <Text style={styles.appliedCode}>'{appliedCoupon.code}' Applied</Text>
                  <Text style={styles.appliedSaving}>Saving ₹{appliedCoupon.discountAmount} on this order</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onRemoveCoupon}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Coupons List */}
          <Text style={styles.sectionTitle}>Available Offers for You</Text>

          {AVAILABLE_COUPONS.map((coupon) => {
            const isApplied = appliedCoupon?.code === coupon.code;
            const isEligible = orderTotal >= coupon.minOrderValue;

            return (
              <View key={coupon.id} style={styles.couponCard}>
                <View style={styles.cardTop}>
                  <View style={styles.badgePill}>
                    <Text style={styles.badgePillText}>{coupon.code}</Text>
                  </View>
                  <TouchableOpacity
                    disabled={!isEligible || isApplied}
                    style={[
                      styles.actionBtn,
                      isApplied && styles.actionBtnApplied,
                      !isEligible && styles.actionBtnDisabled,
                    ]}
                    onPress={() => {
                      onApplyCoupon(coupon);
                      onClose();
                    }}>
                    <Text
                      style={[
                        styles.actionBtnText,
                        isApplied && { color: COLORS.success },
                        !isEligible && { color: '#9E9E9E' },
                      ]}>
                      {isApplied ? 'Applied ✓' : 'APPLY'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.couponHeadline}>{coupon.title}</Text>
                <Text style={styles.couponDesc}>{coupon.description}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.expiryRow}>
                    <Ionicons name="time-outline" size={13} color={COLORS.textSecondary} />
                    <Text style={styles.expiryText}>{coupon.expiryDate}</Text>
                  </View>
                  {!isEligible && (
                    <Text style={styles.ineligibleText}>
                      Min order value ₹{coupon.minOrderValue}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
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
    paddingHorizontal: SPACING.md,
    paddingTop: 45,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.lg,
  },
  inputCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: 14,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    paddingVertical: 8,
  },
  applyBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  appliedCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: SPACING.lg,
  },
  appliedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  appliedCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#065F46',
  },
  appliedSaving: {
    fontSize: 12,
    color: '#047857',
    marginTop: 2,
  },
  removeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  couponCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 14,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgePill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
  },
  badgePillText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  actionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionBtnApplied: {
    backgroundColor: '#ECFDF5',
  },
  actionBtnDisabled: {
    opacity: 0.5,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  couponHeadline: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  couponDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  expiryText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  ineligibleText: {
    fontSize: 11,
    color: COLORS.error,
    fontWeight: '600',
  },
});
