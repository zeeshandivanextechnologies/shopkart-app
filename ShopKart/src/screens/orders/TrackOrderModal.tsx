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

interface TrackOrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  visible,
  order,
  onClose,
}) => {
  if (!order) return null;

  const steps = [
    {
      title: 'Order Placed & Confirmed',
      desc: 'Seller processed your order and verified payment.',
      time: `${order.date}, 02:14 PM`,
      done: true,
    },
    {
      title: 'Packed & Ready for Dispatch',
      desc: 'Quality check completed at Delhi Logistics Hub.',
      time: `${order.date}, 06:30 PM`,
      done: true,
    },
    {
      title: 'Shipped with BlueDart Express',
      desc: 'Tracking AWB: BLUEDART-8912401',
      time: 'In Transit',
      done: order.status === 'Shipped' || order.status === 'Out for Delivery' || order.status === 'Delivered',
    },
    {
      title: 'Out for Delivery',
      desc: 'Courier executive assigned (Ph: +91 98112 00412)',
      time: 'Expected Today',
      done: order.status === 'Out for Delivery' || order.status === 'Delivered',
    },
    {
      title: 'Delivered',
      desc: 'Delivered safely at your doorstep.',
      time: 'Pending',
      done: order.status === 'Delivered',
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live Order Tracking</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Order Header Card */}
          <View style={styles.orderCard}>
            <View>
              <Text style={styles.orderId}>Tracking #{order.id}</Text>
              <Text style={styles.carrierText}>Courier Partner: BlueDart Air Express</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{order.status}</Text>
            </View>
          </View>

          {/* Delivery Address Snapshot */}
          <View style={styles.addressBox}>
            <Ionicons name="location" size={18} color={COLORS.primary} />
            <Text style={styles.addressText} numberOfLines={2}>
              Delivery to: {order.deliveryAddress}
            </Text>
          </View>

          {/* Tracking Timeline */}
          <Text style={styles.timelineHeader}>Shipment Activity</Text>

          <View style={styles.timelineContainer}>
            {steps.map((st, idx) => {
              const isLast = idx === steps.length - 1;
              return (
                <View key={idx} style={styles.stepRow}>
                  {/* Icon Column with vertical connecting line */}
                  <View style={styles.iconCol}>
                    <View
                      style={[
                        styles.iconCircle,
                        st.done ? styles.iconCircleDone : styles.iconCirclePending,
                      ]}>
                      <Ionicons
                        name={st.done ? 'checkmark' : 'ellipse'}
                        size={st.done ? 14 : 8}
                        color={st.done ? '#ffffff' : '#9CA3AF'}
                      />
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.verticalLine,
                          st.done ? styles.verticalLineDone : styles.verticalLinePending,
                        ]}
                      />
                    )}
                  </View>

                  {/* Step Description Column */}
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, st.done && styles.stepTitleDone]}>
                      {st.title}
                    </Text>
                    <Text style={styles.stepDesc}>{st.desc}</Text>
                    <Text style={styles.stepTime}>{st.time}</Text>
                  </View>
                </View>
              );
            })}
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
  content: {
    padding: SPACING.lg,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.md,
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  carrierText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9FAFB',
    padding: SPACING.md,
    borderRadius: 10,
    marginBottom: SPACING.lg,
  },
  addressText: {
    fontSize: 12,
    color: '#4B5563',
    flex: 1,
  },
  timelineHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  timelineContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepRow: {
    flexDirection: 'row',
  },
  iconCol: {
    alignItems: 'center',
    width: 28,
  },
  iconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleDone: {
    backgroundColor: '#10B981',
  },
  iconCirclePending: {
    backgroundColor: '#E5E7EB',
  },
  verticalLine: {
    width: 2,
    flex: 1,
    minHeight: 40,
    marginVertical: 4,
  },
  verticalLineDone: {
    backgroundColor: '#10B981',
  },
  verticalLinePending: {
    backgroundColor: '#E5E7EB',
  },
  stepContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 22,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  stepTitleDone: {
    color: COLORS.text,
  },
  stepDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  stepTime: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 3,
  },
});
