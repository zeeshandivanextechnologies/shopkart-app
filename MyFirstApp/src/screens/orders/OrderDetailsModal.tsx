import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { Order } from '../../context/CartContext';

interface OrderDetailsModalProps {
  visible: boolean;
  order: Order | null;
  onOpenTracking: () => void;
  onOpenInvoice: () => void;
  onOpenCancel: () => void;
  onOpenReturn: () => void;
  onReorder: () => void;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  visible,
  order,
  onOpenTracking,
  onOpenInvoice,
  onOpenCancel,
  onOpenReturn,
  onReorder,
  onClose,
}) => {
  if (!order) return null;

  const isDelivered = order.status === 'Delivered';
  const isCancelled = order.status === ('Cancelled' as any);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <TouchableOpacity onPress={onOpenInvoice} style={styles.iconBtn}>
            <Ionicons name="document-text-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Status Hero Card */}
          <View style={styles.statusHero}>
            <View style={styles.statusHeroLeft}>
              <Text style={styles.statusTitle}>● {order.status}</Text>
              <Text style={styles.statusSub}>Placed on {order.date}</Text>
              <Text style={styles.orderIdBadge}>ID: #{order.id}</Text>
            </View>

            <TouchableOpacity style={styles.trackBtn} onPress={onOpenTracking}>
              <Ionicons name="navigate-outline" size={16} color="#ffffff" />
              <Text style={styles.trackBtnText}>Track Order</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Tracking Preview Bar */}
          <View style={styles.trackingPreview}>
            <View style={styles.previewStep}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={styles.previewText}>Ordered</Text>
            </View>
            <View style={styles.previewLine} />
            <View style={styles.previewStep}>
              <Ionicons
                name={order.status !== 'Confirmed' ? 'checkmark-circle' : 'radio-button-on'}
                size={16}
                color={COLORS.primary}
              />
              <Text style={styles.previewText}>Shipped</Text>
            </View>
            <View style={styles.previewLine} />
            <View style={styles.previewStep}>
              <Ionicons
                name={isDelivered ? 'checkmark-circle' : 'radio-button-off'}
                size={16}
                color={isDelivered ? COLORS.success : '#BDBDBD'}
              />
              <Text style={styles.previewText}>Delivered</Text>
            </View>
          </View>

          {/* Order Items List */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Purchased Items ({order.items.length})</Text>
            {order.items.map((item, idx) => (
              <View key={idx} style={styles.itemRow}>
                <Image source={{ uri: item.product.image }} style={styles.itemImg} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemBrand}>{item.product.brand}</Text>
                  <Text style={styles.itemTitle} numberOfLines={1}>{item.product.title}</Text>
                  <Text style={styles.itemMeta}>Qty: {item.quantity} • {item.selectedSize ? `Size: ${item.selectedSize}` : 'Free Size'}</Text>
                  <Text style={styles.itemPrice}>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Delivery Address Information */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="location-outline" size={18} color={COLORS.primary} />
              <Text style={styles.cardHeader}>Shipping Details</Text>
            </View>
            <Text style={styles.addressText}>{order.deliveryAddress}</Text>
          </View>

          {/* Price & Payment Summary */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="card-outline" size={18} color={COLORS.primary} />
              <Text style={styles.cardHeader}>Payment Summary</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Payment Mode</Text>
              <Text style={styles.billVal}>{order.paymentMethod}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billVal}>₹{order.totalAmount.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Charges</Text>
              <Text style={[styles.billVal, { color: COLORS.success }]}>FREE</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.billRow}>
              <Text style={styles.totalLabel}>Total Paid</Text>
              <Text style={styles.totalVal}>₹{order.totalAmount.toLocaleString('en-IN')}</Text>
            </View>
          </View>

          {/* Action Buttons: Cancel, Return, Exchange, Reorder */}
          <View style={styles.actionsWrap}>
            <TouchableOpacity style={styles.reorderBtn} onPress={onReorder}>
              <Ionicons name="repeat" size={18} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.reorderBtnText}>Buy Again (Reorder)</Text>
            </TouchableOpacity>

            {!isCancelled && !isDelivered && (
              <TouchableOpacity style={styles.cancelBtn} onPress={onOpenCancel}>
                <Ionicons name="close-circle-outline" size={18} color={COLORS.error} style={{ marginRight: 6 }} />
                <Text style={styles.cancelBtnText}>Cancel Order</Text>
              </TouchableOpacity>
            )}

            {isDelivered && (
              <View style={styles.returnRow}>
                <TouchableOpacity style={styles.returnBtn} onPress={onOpenReturn}>
                  <Ionicons name="arrow-undo-outline" size={16} color={COLORS.primary} style={{ marginRight: 4 }} />
                  <Text style={styles.returnBtnText}>Return Order</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.exchangeBtn} onPress={onOpenReturn}>
                  <Ionicons name="swap-horizontal-outline" size={16} color={COLORS.primary} style={{ marginRight: 4 }} />
                  <Text style={styles.exchangeBtnText}>Exchange Item</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
  iconBtn: {
    padding: 6,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  statusHero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusHeroLeft: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statusSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  orderIdBadge: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },
  trackBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  trackBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  trackingPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 12,
    marginBottom: SPACING.md,
  },
  previewStep: {
    alignItems: 'center',
    gap: 4,
  },
  previewText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.text,
  },
  previewLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemBrand: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 1,
  },
  itemMeta: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 2,
  },
  addressText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  billLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  billVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalVal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionsWrap: {
    gap: 10,
    marginTop: SPACING.sm,
  },
  reorderBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  reorderBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  cancelBtnText: {
    color: COLORS.error,
    fontSize: 13,
    fontWeight: 'bold',
  },
  returnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  returnBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#EEF2FF',
  },
  returnBtnText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  exchangeBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: '#EEF2FF',
  },
  exchangeBtnText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
