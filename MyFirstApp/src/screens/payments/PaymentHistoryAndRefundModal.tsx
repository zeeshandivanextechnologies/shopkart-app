import React, { useState } from 'react';
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

export interface PaymentTransaction {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  date: string;
  status: 'Success' | 'Refunded' | 'Failed';
  bankRef: string;
  refundArn?: string;
  refundDate?: string;
}

const INITIAL_HISTORY: PaymentTransaction[] = [
  {
    id: 'tx_98421',
    orderId: 'ORD-89412',
    amount: 3499,
    method: 'UPI (Google Pay)',
    date: '18 Nov 2026, 03:45 PM',
    status: 'Success',
    bankRef: 'UPI/632194819284',
  },
  {
    id: 'tx_78120',
    orderId: 'ORD-72109',
    amount: 1899,
    method: 'HDFC Credit Card •••• 4242',
    date: '14 Nov 2026, 11:20 AM',
    status: 'Refunded',
    bankRef: 'PG/HDFC/992140',
    refundArn: 'ARN-981240182410',
    refundDate: '16 Nov 2026',
  },
  {
    id: 'tx_65190',
    orderId: 'ORD-65190',
    amount: 899,
    method: 'Paytm Wallet',
    date: '02 Nov 2026, 08:12 PM',
    status: 'Success',
    bankRef: 'WAL/PTM/712094',
  },
];

interface HistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PaymentHistoryAndRefundModal: React.FC<HistoryModalProps> = ({
  visible,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'refunds'>('history');
  const [selectedRefundTx, setSelectedRefundTx] = useState<PaymentTransaction | null>(null);

  const refundTransactions = INITIAL_HISTORY.filter((tx) => tx.status === 'Refunded');

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payments & Refunds</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Tab Toggle */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'history' && styles.tabBtnActive]}
            onPress={() => {
              setActiveTab('history');
              setSelectedRefundTx(null);
            }}>
            <Ionicons
              name="receipt-outline"
              size={16}
              color={activeTab === 'history' ? COLORS.primary : COLORS.textSecondary}
            />
            <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
              Payment History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'refunds' && styles.tabBtnActive]}
            onPress={() => setActiveTab('refunds')}>
            <Ionicons
              name="arrow-undo-outline"
              size={16}
              color={activeTab === 'refunds' ? COLORS.primary : COLORS.textSecondary}
            />
            <Text style={[styles.tabText, activeTab === 'refunds' && styles.tabTextActive]}>
              Refund Status ({refundTransactions.length})
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {activeTab === 'history' ? (
            /* TAB 1: Payment History List */
            <View>
              {INITIAL_HISTORY.map((tx) => (
                <View key={tx.id} style={styles.card}>
                  <View style={styles.cardTop}>
                    <View>
                      <Text style={styles.orderIdText}>Order #{tx.orderId}</Text>
                      <Text style={styles.methodText}>{tx.method}</Text>
                    </View>
                    <View style={styles.amountCol}>
                      <Text style={styles.amountText}>₹{tx.amount.toLocaleString('en-IN')}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          tx.status === 'Success'
                            ? { backgroundColor: '#DCFCE7' }
                            : tx.status === 'Refunded'
                            ? { backgroundColor: '#FEF3C7' }
                            : { backgroundColor: '#FEE2E2' },
                        ]}>
                        <Text
                          style={[
                            styles.statusBadgeText,
                            tx.status === 'Success'
                              ? { color: '#166534' }
                              : tx.status === 'Refunded'
                              ? { color: '#92400E' }
                              : { color: COLORS.error },
                          ]}>
                          {tx.status}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.cardBottom}>
                    <Text style={styles.dateText}>{tx.date}</Text>
                    <Text style={styles.refText}>Ref: {tx.bankRef}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            /* TAB 2: Refund Tracker */
            <View>
              {refundTransactions.map((tx) => (
                <View key={tx.id} style={styles.card}>
                  <View style={styles.refundHeader}>
                    <View>
                      <Text style={styles.orderIdText}>Refund for #{tx.orderId}</Text>
                      <Text style={styles.refundAmount}>₹{tx.amount} Credited</Text>
                    </View>
                    <View style={styles.creditedPill}>
                      <Ionicons name="checkmark-circle" size={14} color="#166534" />
                      <Text style={styles.creditedPillText}>Completed</Text>
                    </View>
                  </View>

                  {/* Refund Stepper Timeline */}
                  <View style={styles.timeline}>
                    <View style={styles.timelineStep}>
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                      <View style={styles.stepInfo}>
                        <Text style={styles.stepTitle}>Refund Initiated</Text>
                        <Text style={styles.stepSub}>Approved by merchant</Text>
                      </View>
                    </View>

                    <View style={styles.stepLine} />

                    <View style={styles.timelineStep}>
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                      <View style={styles.stepInfo}>
                        <Text style={styles.stepTitle}>Processed by Payment Gateway</Text>
                        <Text style={styles.stepSub}>Transferred to your bank</Text>
                      </View>
                    </View>

                    <View style={styles.stepLine} />

                    <View style={styles.timelineStep}>
                      <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
                      <View style={styles.stepInfo}>
                        <Text style={styles.stepTitle}>Credited to Original Source</Text>
                        <Text style={styles.stepSub}>ARN: {tx.refundArn} ({tx.refundDate})</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
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
  tabs: {
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
  content: {
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  methodText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  amountCol: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  dateText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  refText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  refundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  refundAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.success,
    marginTop: 2,
  },
  creditedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  creditedPillText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#166534',
  },
  timeline: {
    paddingLeft: 6,
    marginTop: 6,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  stepSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  stepLine: {
    width: 2,
    height: 22,
    backgroundColor: COLORS.success,
    marginLeft: 8,
    marginVertical: 2,
  },
});
