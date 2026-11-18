import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface ProcessingModalProps {
  visible: boolean;
  method: string;
}

export const PaymentProcessingModal: React.FC<ProcessingModalProps> = ({
  visible,
  method,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.spinnerWrapper}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>

          <Text style={styles.title}>Processing Your Payment...</Text>
          <Text style={styles.sub}>
            Connecting securely with your bank for {method} authorization.
          </Text>

          <View style={styles.securityNote}>
            <Ionicons name="lock-closed" size={14} color="#15803D" />
            <Text style={styles.securityText}>256-Bit SSL Bank Grade Encryption</Text>
          </View>

          <Text style={styles.warning}>
            ⚠️ Please do not close the app or tap the back button.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: SPACING.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    elevation: 10,
  },
  spinnerWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  sub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: SPACING.md,
  },
  securityText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#15803D',
  },
  warning: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: '600',
    textAlign: 'center',
  },
});
