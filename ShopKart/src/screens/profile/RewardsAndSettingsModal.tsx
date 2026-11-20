import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface RewardsReferralModalProps {
  visible: boolean;
  type: 'rewards' | 'referral' | 'reviews' | 'security' | 'delete';
  onClose: () => void;
  onConfirmDelete?: () => void;
}

export const RewardsAndSettingsModal: React.FC<RewardsReferralModalProps> = ({
  visible,
  type,
  onClose,
  onConfirmDelete,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteReason, setDeleteReason] = useState('');

  const referralCode = 'BOSS2026';

  const handleShareReferral = async () => {
    try {
      await Share.share({
        message: `Join ShopKart using my referral code ${referralCode} and get ₹250 instant shopping discount on your first order!\nDownload App: https://shopkart.app/invite/${referralCode}`,
      });
    } catch (e) {
      Alert.alert('Share Failed', 'Unable to open share sheet.');
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'New Password and Confirm Password do not match.');
      return;
    }
    Alert.alert('Password Updated! 🔒', 'Your account password has been updated successfully.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Permanent Account Deletion',
      'Are you sure you want to permanently delete your account? All saved addresses, orders, and wallet balance will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Forever',
          style: 'destructive',
          onPress: () => {
            onConfirmDelete?.();
            onClose();
          },
        },
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {type === 'rewards'
              ? 'My Rewards & SuperCoins'
              : type === 'referral'
              ? 'Refer & Earn ₹250'
              : type === 'reviews'
              ? 'My Reviews & Q&A'
              : type === 'security'
              ? 'Change Password'
              : 'Delete Account'}
          </Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* VIEW 1: REWARDS & LOYALTY POINTS */}
          {type === 'rewards' && (
            <View>
              {/* SuperCoins Balance Card */}
              <View style={styles.superCoinCard}>
                <View style={styles.coinHeader}>
                  <Text style={styles.coinBrand}>ShopKart SuperCoins 🪙</Text>
                  <View style={styles.coinBadge}>
                    <Text style={styles.coinBadgeText}>PLUS MEMBER</Text>
                  </View>
                </View>
                <Text style={styles.coinBalance}>250 Coins</Text>
                <Text style={styles.coinValue}>Worth ₹250 on your next order!</Text>
              </View>

              <Text style={styles.sectionHeader}>Unlockable Scratch Cards</Text>
              {[
                { title: '₹100 Fashion Voucher', sub: 'Unlocked on order #ORD-89412', active: true },
                { title: 'Flat 15% OFF Electronics', sub: 'Unlocked on ₹3,000 cart value', active: true },
                { title: '₹500 Mystery Reward', sub: 'Complete 3 orders this month to unlock', active: false },
              ].map((r, i) => (
                <View key={i} style={[styles.rewardCard, !r.active && { opacity: 0.6 }]}>
                  <View style={styles.rewardIconWrap}>
                    <Ionicons name={r.active ? 'gift' : 'lock-closed'} size={24} color={COLORS.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.rewardTitle}>{r.title}</Text>
                    <Text style={styles.rewardSub}>{r.sub}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.claimBtn}
                    onPress={() => Alert.alert('Reward Claimed! 🎉', 'Voucher added to your coupons!')}>
                    <Text style={styles.claimBtnText}>{r.active ? 'Scratch' : 'Locked'}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* VIEW 2: REFER & EARN */}
          {type === 'referral' && (
            <View style={{ alignItems: 'center' }}>
              <View style={styles.referralHero}>
                <Ionicons name="gift-outline" size={60} color={COLORS.primary} />
                <Text style={styles.referralTitle}>Invite Friends & Earn ₹250</Text>
                <Text style={styles.referralSub}>
                  When your friends place their first order using your referral code, both of you get ₹250 in your ShopKart wallet!
                </Text>
              </View>

              {/* Code Box */}
              <View style={styles.codeCard}>
                <Text style={styles.codeLabel}>YOUR REFERRAL CODE</Text>
                <Text style={styles.codeText}>{referralCode}</Text>
                <TouchableOpacity
                  style={styles.copyPill}
                  onPress={() => Alert.alert('Copied!', 'Referral code copied to clipboard.')}>
                  <Ionicons name="copy-outline" size={14} color={COLORS.primary} />
                  <Text style={styles.copyPillText}>Copy Code</Text>
                </TouchableOpacity>
              </View>

              {/* Share Button */}
              <TouchableOpacity style={styles.shareBtn} onPress={handleShareReferral}>
                <Ionicons name="share-social" size={18} color="#ffffff" style={{ marginRight: 6 }} />
                <Text style={styles.shareBtnText}>Share via WhatsApp & SMS</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* VIEW 3: MY REVIEWS & Q&A */}
          {type === 'reviews' && (
            <View>
              <Text style={styles.sectionHeader}>My Product Reviews (2)</Text>
              {[
                { title: 'Nike Air Max Running Shoes', rating: 5, date: '14 Nov 2026', comment: 'Super comfortable for daily running. True to size.' },
                { title: 'Sony WH-1000XM5 Headphones', rating: 4, date: '02 Nov 2026', comment: 'Sound cancellation is top notch, battery lasts for days!' },
              ].map((rev, idx) => (
                <View key={idx} style={styles.reviewItem}>
                  <View style={styles.reviewItemHeader}>
                    <Text style={styles.reviewProductTitle}>{rev.title}</Text>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingBadgeText}>{rev.rating} ★</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>Reviewed on {rev.date}</Text>
                  <Text style={styles.reviewBody}>{rev.comment}</Text>
                </View>
              ))}

              <Text style={[styles.sectionHeader, { marginTop: 20 }]}>My Questions & Answers (1)</Text>
              <View style={styles.qaCard}>
                <Text style={styles.qText}>Q: Does this shoe have genuine manufacturer warranty?</Text>
                <Text style={styles.aText}>A: Yes, 100% official brand domestic warranty is included.</Text>
                <Text style={styles.answeredBy}>Answered by: Nike Official Store Seller</Text>
              </View>
            </View>
          )}

          {/* VIEW 4: CHANGE PASSWORD */}
          {type === 'security' && (
            <View>
              <Text style={styles.sectionHeader}>Update Password</Text>
              <TextInput
                style={styles.passInput}
                placeholder="Current Password"
                placeholderTextColor={COLORS.textSecondary}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.passInput}
                placeholder="New Password (min 6 chars)"
                placeholderTextColor={COLORS.textSecondary}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.passInput}
                placeholder="Confirm New Password"
                placeholderTextColor={COLORS.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.updatePassBtn} onPress={handleChangePassword}>
                <Text style={styles.updatePassText}>Update Password</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* VIEW 5: DELETE ACCOUNT */}
          {type === 'delete' && (
            <View>
              <View style={styles.deleteWarningBox}>
                <Ionicons name="warning-outline" size={40} color={COLORS.error} />
                <Text style={styles.deleteWarningTitle}>Delete Account Permanently</Text>
                <Text style={styles.deleteWarningText}>
                  This action is irreversible. You will lose access to order history, remaining wallet balance, active rewards, and saved addresses.
                </Text>
              </View>

              <Text style={styles.sectionHeader}>Why are you deleting your account?</Text>
              <TextInput
                style={styles.reasonInput}
                placeholder="Tell us what went wrong (Optional)..."
                placeholderTextColor={COLORS.textSecondary}
                value={deleteReason}
                onChangeText={setDeleteReason}
                multiline
              />

              <TouchableOpacity style={styles.deleteConfirmBtn} onPress={handleDeleteAccount}>
                <Ionicons name="trash" size={18} color="#ffffff" style={{ marginRight: 6 }} />
                <Text style={styles.deleteConfirmText}>Permanently Delete My Account</Text>
              </TouchableOpacity>
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
  content: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  superCoinCard: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    elevation: 3,
  },
  coinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinBrand: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  coinBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  coinBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  coinBalance: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  coinValue: {
    color: '#FEF3C7',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.sm,
    gap: 12,
  },
  rewardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  rewardSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  claimBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  claimBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  referralHero: {
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    marginBottom: SPACING.lg,
    width: '100%',
  },
  referralTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
  },
  referralSub: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  codeCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  codeLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 1,
  },
  codeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 3,
    marginVertical: 8,
  },
  copyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  copyPillText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: 'bold',
  },
  shareBtn: {
    width: '100%',
    backgroundColor: '#16A34A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  shareBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewItem: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.sm,
  },
  reviewItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewProductTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  ratingBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  reviewBody: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 6,
    lineHeight: 16,
  },
  qaCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  qText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  aText: {
    fontSize: 12,
    color: '#15803D',
    marginTop: 4,
    fontWeight: '500',
  },
  answeredBy: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 6,
  },
  passInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 12,
  },
  updatePassBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  updatePassText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteWarningBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 14,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  deleteWarningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.error,
    marginTop: 10,
  },
  deleteWarningText: {
    fontSize: 12,
    color: '#991B1B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  reasonInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: COLORS.text,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: SPACING.lg,
  },
  deleteConfirmBtn: {
    backgroundColor: COLORS.error,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  deleteConfirmText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
