import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { Order } from '../../context/CartContext';

interface OrderResultModalProps {
  visible: boolean;
  type: 'success' | 'failed';
  order?: Order | null;
  onContinueShopping: () => void;
  onViewOrders?: () => void;
  onRetryPayment?: () => void;
}

export const OrderResultModal: React.FC<OrderResultModalProps> = ({
  visible,
  type,
  order,
  onContinueShopping,
  onViewOrders,
  onRetryPayment,
}) => {
  const isSuccess = type === 'success';

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Animated/Icon Status Header */}
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: isSuccess ? '#ECFDF5' : '#FEE2E2' },
            ]}>
            <Ionicons
              name={isSuccess ? 'checkmark-circle' : 'close-circle'}
              size={64}
              color={isSuccess ? COLORS.success : COLORS.error}
            />
          </View>

          <Text style={styles.title}>
            {isSuccess ? 'Order Placed Successfully! 🎉' : 'Payment Failed ⚠️'}
          </Text>

          <Text style={styles.subtitle}>
            {isSuccess
              ? 'Thank you for shopping with ShopKart! Your package is being prepared for fast dispatch.'
              : 'Your transaction could not be processed. Please try another payment method or retry.'}
          </Text>

          {/* Details Card */}
          {isSuccess && order ? (
            <View style={styles.detailsBox}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Order ID</Text>
                <Text style={styles.detailValue}>#{order.id}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Estimated Delivery</Text>
                <Text style={[styles.detailValue, { color: COLORS.primary }]}>
                  Within 2-3 Business Days
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Amount</Text>
                <Text style={[styles.detailValue, { fontWeight: 'bold' }]}>
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment Mode</Text>
                <Text style={styles.detailValue}>{order.paymentMethod}</Text>
              </View>
            </View>
          ) : null}

          {/* Action Buttons */}
          <View style={styles.actions}>
            {isSuccess ? (
              <>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={onViewOrders || onContinueShopping}>
                  <Ionicons name="receipt-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryBtnText}>View My Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={onContinueShopping}>
                  <Text style={styles.secondaryBtnText}>Continue Shopping</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.primaryBtn, { backgroundColor: COLORS.error }]}
                  onPress={onRetryPayment || onContinueShopping}>
                  <Ionicons name="refresh-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryBtnText}>Retry Payment</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={onContinueShopping}>
                  <Text style={styles.secondaryBtnText}>Back to Cart</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    elevation: 8,
  },
  iconWrapper: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.lg,
  },
  detailsBox: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  actions: {
    width: '100%',
    gap: 10,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryBtnText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
