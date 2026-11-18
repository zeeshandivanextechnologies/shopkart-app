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
import { useCart, Order } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';
import { OrderDetailsModal } from './OrderDetailsModal';
import { TrackOrderModal } from './TrackOrderModal';
import { OrderInvoiceModal } from './OrderInvoiceModal';
import { OrderReturnCancelModal } from './OrderReturnCancelModal';

export type OrderStatusFilter =
  | 'All'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

const STATUS_FILTERS: OrderStatusFilter[] = [
  'All',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

interface OrdersScreenProps {
  onExplore: () => void;
  onOpenCart?: () => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  onExplore,
  onOpenCart,
}) => {
  const { orders, addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState<OrderStatusFilter>('All');

  // Modals state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [trackingVisible, setTrackingVisible] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [returnCancelVisible, setReturnCancelVisible] = useState(false);
  const [returnCancelType, setReturnCancelType] = useState<'cancel' | 'return' | 'exchange'>('cancel');

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    if (activeFilter === 'All') return true;
    return ord.status.toLowerCase() === activeFilter.toLowerCase();
  });

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.selectedSize, item.selectedColor);
    });
    Alert.alert('Items Added to Bag! 🛒', 'All products from this order have been placed back into your cart.');
    onOpenCart?.();
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders ({orders.length})</Text>
      </View>

      {/* Horizontal Status Filter Tabs */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {STATUS_FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setActiveFilter(f)}>
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cube-outline" size={70} color="#BDBDBD" />
          <Text style={styles.emptyTitle}>No {activeFilter !== 'All' ? activeFilter : ''} Orders Found</Text>
          <Text style={styles.emptySub}>
            Your past purchases and live shipment tracking updates will appear here.
          </Text>
          <TouchableOpacity style={styles.shopBtn} onPress={onExplore}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {filteredOrders.map((order) => {
            const isDelivered = order.status === 'Delivered';
            const isCancelled = order.status === ('Cancelled' as any);

            return (
              <View key={order.id} style={styles.orderCard}>
                {/* Order Top Bar */}
                <View style={styles.orderTop}>
                  <View>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={styles.orderDate}>Placed on {order.date}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      isDelivered
                        ? { backgroundColor: '#DCFCE7' }
                        : isCancelled
                        ? { backgroundColor: '#FEE2E2' }
                        : { backgroundColor: '#EEF2FF' },
                    ]}>
                    <Text
                      style={[
                        styles.statusText,
                        isDelivered
                          ? { color: '#166534' }
                          : isCancelled
                          ? { color: COLORS.error }
                          : { color: COLORS.primary },
                      ]}>
                      ● {order.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Items Preview */}
                {order.items.map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.itemRow}
                    onPress={() => {
                      setSelectedOrder(order);
                      setDetailsVisible(true);
                    }}>
                    <Image source={{ uri: item.product.image }} style={styles.itemImg} />
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemTitle} numberOfLines={1}>
                        {item.product.title}
                      </Text>
                      <Text style={styles.itemSub}>
                        Qty: {item.quantity} | {item.selectedSize ? `Size: ${item.selectedSize}` : 'Free Size'}
                      </Text>
                      <Text style={styles.itemPrice}>
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
                  </TouchableOpacity>
                ))}

                <View style={styles.divider} />

                {/* Footer and Actions */}
                <View style={styles.orderBottom}>
                  <View>
                    <Text style={styles.bottomLabel}>Payment Mode</Text>
                    <Text style={styles.bottomVal}>{order.paymentMethod}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.bottomLabel}>Total Paid</Text>
                    <Text style={styles.totalPrice}>₹{order.totalAmount.toLocaleString('en-IN')}</Text>
                  </View>
                </View>

                {/* Action Button Chips */}
                <View style={styles.actionPillsRow}>
                  <TouchableOpacity
                    style={styles.actionPillBtn}
                    onPress={() => {
                      setSelectedOrder(order);
                      setTrackingVisible(true);
                    }}>
                    <Ionicons name="navigate-outline" size={14} color={COLORS.primary} />
                    <Text style={styles.actionPillText}>Track Order</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionPillBtn}
                    onPress={() => {
                      setSelectedOrder(order);
                      setInvoiceVisible(true);
                    }}>
                    <Ionicons name="document-text-outline" size={14} color={COLORS.primary} />
                    <Text style={styles.actionPillText}>Invoice</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionPillBtn, { backgroundColor: '#EEF2FF' }]}
                    onPress={() => handleReorder(order)}>
                    <Ionicons name="repeat-outline" size={14} color={COLORS.primary} />
                    <Text style={styles.actionPillText}>Buy Again</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        visible={detailsVisible}
        order={selectedOrder}
        onOpenTracking={() => {
          setDetailsVisible(false);
          setTrackingVisible(true);
        }}
        onOpenInvoice={() => {
          setDetailsVisible(false);
          setInvoiceVisible(true);
        }}
        onOpenCancel={() => {
          setDetailsVisible(false);
          setReturnCancelType('cancel');
          setReturnCancelVisible(true);
        }}
        onOpenReturn={() => {
          setDetailsVisible(false);
          setReturnCancelType('return');
          setReturnCancelVisible(true);
        }}
        onReorder={() => {
          if (selectedOrder) handleReorder(selectedOrder);
          setDetailsVisible(false);
        }}
        onClose={() => setDetailsVisible(false)}
      />

      {/* Live Tracking Modal */}
      <TrackOrderModal
        visible={trackingVisible}
        order={selectedOrder}
        onClose={() => setTrackingVisible(false)}
      />

      {/* Tax Invoice Modal */}
      <OrderInvoiceModal
        visible={invoiceVisible}
        order={selectedOrder}
        onClose={() => setInvoiceVisible(false)}
      />

      {/* Cancel / Return / Exchange Modal */}
      <OrderReturnCancelModal
        visible={returnCancelVisible}
        type={returnCancelType}
        order={selectedOrder}
        onConfirm={(reason) => {}}
        onClose={() => setReturnCancelVisible(false)}
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  filtersWrapper: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterScroll: {
    paddingHorizontal: SPACING.md,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  list: {
    padding: SPACING.md,
    paddingBottom: 40,
    gap: 12,
  },
  orderCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  orderDate: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 2,
  },
  orderBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  bottomVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  actionPillsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
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
  shopBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
  },
  shopBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
