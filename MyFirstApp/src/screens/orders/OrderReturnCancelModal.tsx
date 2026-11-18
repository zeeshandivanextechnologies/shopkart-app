import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { Order } from '../../context/CartContext';

interface ReturnCancelModalProps {
  visible: boolean;
  type: 'cancel' | 'return' | 'exchange';
  order: Order | null;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}

const CANCEL_REASONS = [
  'Expected delivery time is too long',
  'Found the item at a cheaper price elsewhere',
  'Ordered the wrong size / color by mistake',
  'Changed my mind / Order no longer needed',
  'Duplicate order placed accidentally',
];

const RETURN_EXCHANGE_REASONS = [
  'Item is defective / damaged in transit',
  'Wrong size / fit issue (need exchange)',
  'Product does not match image or description',
  'Quality is not up to expectations',
];

export const OrderReturnCancelModal: React.FC<ReturnCancelModalProps> = ({
  visible,
  type,
  order,
  onConfirm,
  onClose,
}) => {
  const [selectedReason, setSelectedReason] = useState(
    type === 'cancel' ? CANCEL_REASONS[0] : RETURN_EXCHANGE_REASONS[0]
  );
  const [comments, setComments] = useState('');

  const isCancel = type === 'cancel';
  const isExchange = type === 'exchange';

  const reasonsList = isCancel ? CANCEL_REASONS : RETURN_EXCHANGE_REASONS;

  const handleSubmit = () => {
    onConfirm(selectedReason);
    Alert.alert(
      isCancel ? 'Order Cancelled' : isExchange ? 'Exchange Requested' : 'Return Initiated',
      isCancel
        ? 'Your order has been cancelled. Any payment made will be refunded to your source account.'
        : `Your ${type} request has been recorded. Our courier agent will visit for doorstep inspection.`
    );
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons
                name={isCancel ? 'close-circle' : isExchange ? 'swap-horizontal' : 'arrow-undo'}
                size={22}
                color={isCancel ? COLORS.error : COLORS.primary}
              />
              <Text style={styles.title}>
                {isCancel ? 'Cancel Order' : isExchange ? 'Exchange Product' : 'Return Order'}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {order && (
              <View style={styles.orderSummary}>
                <Text style={styles.summaryOrderId}>Order #{order.id}</Text>
                <Text style={styles.summaryTotal}>₹{order.totalAmount.toLocaleString('en-IN')}</Text>
              </View>
            )}

            <Text style={styles.sectionLabel}>
              Please select reason for {isCancel ? 'cancellation' : type}:
            </Text>

            {reasonsList.map((reason) => {
              const active = selectedReason === reason;
              return (
                <TouchableOpacity
                  key={reason}
                  style={[styles.reasonRow, active && styles.reasonRowActive]}
                  onPress={() => setSelectedReason(reason)}>
                  <Ionicons
                    name={active ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={active ? COLORS.primary : '#9E9E9E'}
                  />
                  <Text style={[styles.reasonText, active && styles.reasonTextActive]}>
                    {reason}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Additional Comments */}
            <Text style={[styles.sectionLabel, { marginTop: 14 }]}>Additional Comments (Optional)</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Provide more details to help us improve..."
              placeholderTextColor={COLORS.textSecondary}
              value={comments}
              onChangeText={setComments}
              multiline
            />

            {/* Submit Action Button */}
            <TouchableOpacity
              style={[styles.confirmBtn, isCancel && { backgroundColor: COLORS.error }]}
              onPress={handleSubmit}>
              <Text style={styles.confirmBtnText}>
                {isCancel ? 'Confirm Cancellation' : `Submit ${type.toUpperCase()} Request`}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.lg,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: SPACING.md,
    borderRadius: 10,
    marginBottom: SPACING.md,
  },
  summaryOrderId: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  summaryTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
    gap: 10,
  },
  reasonRowActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#EEF2FF',
  },
  reasonText: {
    fontSize: 13,
    color: COLORS.text,
    flex: 1,
  },
  reasonTextActive: {
    fontWeight: '600',
    color: COLORS.primary,
  },
  commentInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: COLORS.text,
    height: 70,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
