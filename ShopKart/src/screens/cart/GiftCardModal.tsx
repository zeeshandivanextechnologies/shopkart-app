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

interface GiftCardModalProps {
  visible: boolean;
  appliedGiftCardBalance: number;
  onApplyGiftCard: (amount: number, cardCode: string) => void;
  onRemoveGiftCard: () => void;
  onClose: () => void;
}

export const GiftCardModal: React.FC<GiftCardModalProps> = ({
  visible,
  appliedGiftCardBalance,
  onApplyGiftCard,
  onRemoveGiftCard,
  onClose,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardPin, setCardPin] = useState('');

  const handleRedeem = () => {
    if (cardNumber.trim().length < 6 || cardPin.trim().length < 4) {
      Alert.alert('Invalid Details', 'Please enter a 16-digit Card Number and 4-digit PIN.');
      return;
    }

    // Redeem mock ₹500 Gift Voucher
    const mockBalance = 500;
    onApplyGiftCard(mockBalance, cardNumber.trim());
    setCardNumber('');
    setCardPin('');
    Alert.alert('Gift Card Added! 🎁', `₹${mockBalance} Gift Card balance added to your cart.`);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gift Cards & Vouchers</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Hero Card Visual */}
          <View style={styles.giftCardVisual}>
            <View style={styles.visualTop}>
              <Text style={styles.cardBrand}>ShopKart</Text>
              <Ionicons name="gift" size={24} color="#ffffff" />
            </View>
            <Text style={styles.cardNumberMasked}>•••• •••• •••• 4092</Text>
            <View style={styles.visualBottom}>
              <View>
                <Text style={styles.visualLabel}>BALANCE AVAILABLE</Text>
                <Text style={styles.visualValue}>
                  ₹{appliedGiftCardBalance > 0 ? appliedGiftCardBalance : '0'}
                </Text>
              </View>
              <Text style={styles.voucherTag}>PREPAID VOUCHER</Text>
            </View>
          </View>

          {appliedGiftCardBalance > 0 ? (
            <View style={styles.appliedBanner}>
              <View style={styles.appliedRow}>
                <Ionicons name="checkmark-circle" size={22} color={COLORS.success} />
                <View>
                  <Text style={styles.appliedTitle}>Gift Card Applied</Text>
                  <Text style={styles.appliedSub}>₹{appliedGiftCardBalance} deducted from payable total</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onRemoveGiftCard}>
                <Text style={styles.removeBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* Redeem Form */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Redeem a Gift Card</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>16-Digit Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="XXXX XXXX XXXX XXXX"
                placeholderTextColor={COLORS.textSecondary}
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={16}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>4-Digit Card PIN</Text>
              <TextInput
                style={styles.input}
                placeholder="••••"
                placeholderTextColor={COLORS.textSecondary}
                value={cardPin}
                onChangeText={setCardPin}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.redeemBtn} onPress={handleRedeem}>
              <Ionicons name="wallet-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.redeemBtnText}>Apply Gift Card to Order</Text>
            </TouchableOpacity>
          </View>

          {/* Quick FAQ / Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>About ShopKart Gift Cards:</Text>
            <Text style={styles.infoText}>• Gift cards can be combined with coupons and store offers.</Text>
            <Text style={styles.infoText}>• Any remaining balance stays valid on your account for 1 year.</Text>
            <Text style={styles.infoText}>• No convenience fee or expiry charges applicable.</Text>
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
  giftCardVisual: {
    backgroundColor: '#312E81',
    borderRadius: 18,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    elevation: 3,
  },
  visualTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardBrand: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardNumberMasked: {
    color: '#E0E7FF',
    fontSize: 18,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 20,
  },
  visualBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  visualLabel: {
    color: '#A5B4FC',
    fontSize: 10,
    fontWeight: 'bold',
  },
  visualValue: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  voucherTag: {
    color: '#A5B4FC',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  appliedBanner: {
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
  appliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appliedTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#065F46',
  },
  appliedSub: {
    fontSize: 11,
    color: '#047857',
  },
  removeBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.lg,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
    letterSpacing: 1,
  },
  redeemBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 6,
  },
  redeemBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: SPACING.md,
    gap: 6,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
