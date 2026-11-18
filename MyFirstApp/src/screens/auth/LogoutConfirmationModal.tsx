import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface LogoutConfirmationModalProps {
  visible: boolean;
  userEmail: string;
  onConfirmLogout: () => void;
  onCancel: () => void;
}

export const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  visible,
  userEmail,
  onConfirmLogout,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="log-out-outline" size={32} color={COLORS.error} />
          </View>

          <Text style={styles.title}>Are you sure you want to log out?</Text>
          <Text style={styles.subtitle}>
            You are currently signed in as{' '}
            <Text style={{ fontWeight: 'bold', color: COLORS.text }}>{userEmail}</Text>. Your cart and wishlist will remain saved.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
              <Text style={styles.cancelBtnText}>Stay Logged In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutBtn} onPress={onConfirmLogout}>
              <Text style={styles.logoutBtnText}>Yes, Log Out</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, textAlign: 'center' },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 18,
  },
  actions: { width: '100%', gap: 10 },
  cancelBtn: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtnText: { color: COLORS.text, fontWeight: 'bold', fontSize: 14 },
  logoutBtn: {
    backgroundColor: COLORS.error,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
});
