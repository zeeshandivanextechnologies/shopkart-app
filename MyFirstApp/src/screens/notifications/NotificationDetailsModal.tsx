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
import { NotificationItem } from './NotificationsScreen';

interface DetailsModalProps {
  visible: boolean;
  notification: NotificationItem | null;
  onClose: () => void;
  onAction?: () => void;
}

export const NotificationDetailsModal: React.FC<DetailsModalProps> = ({
  visible,
  notification,
  onClose,
  onAction,
}) => {
  if (!notification) return null;

  const isOffer = notification.type === 'offer';
  const isOrder = notification.type === 'order';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header Icon */}
          <View
            style={[
              styles.iconCircle,
              isOffer
                ? { backgroundColor: '#FEE2E2' }
                : isOrder
                ? { backgroundColor: '#DCFCE7' }
                : { backgroundColor: '#EEF2FF' },
            ]}>
            <Ionicons
              name={isOffer ? 'pricetag' : isOrder ? 'cube' : 'notifications'}
              size={36}
              color={isOffer ? COLORS.error : isOrder ? '#166534' : COLORS.primary}
            />
          </View>

          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.timeText}>{notification.time}</Text>

          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{notification.message}</Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actions}>
            {isOffer && (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => {
                  onAction?.();
                  onClose();
                }}>
                <Text style={styles.primaryBtnText}>Explore Deals Now</Text>
              </TouchableOpacity>
            )}

            {isOrder && (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => {
                  onAction?.();
                  onClose();
                }}>
                <Text style={styles.primaryBtnText}>View My Order Status</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Dismiss</Text>
            </TouchableOpacity>
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
    borderRadius: 20,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    elevation: 8,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginBottom: SPACING.md,
  },
  messageBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: SPACING.md,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.lg,
  },
  messageText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: 8,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeBtnText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
});
