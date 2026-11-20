import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';
import { LogoutConfirmationModal } from '../auth/LogoutConfirmationModal';
import { EditProfileModal } from './EditProfileModal';
import { RewardsAndSettingsModal } from './RewardsAndSettingsModal';

interface ProfileScreenProps {
  onOpenOrders: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAddresses: () => void;
  onOpenPayments: () => void;
  onOpenNotifications: () => void;
  onOpenSupport: () => void;
  onOpenSettings: () => void;
  onOpenLogin: () => void;
  userEmail: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenOrders,
  onOpenWishlist,
  onOpenCart,
  onOpenAddresses,
  onOpenPayments,
  onOpenNotifications,
  onOpenSupport,
  onOpenSettings,
  onOpenLogin,
  userEmail,
}) => {
  const { orders, wishlist } = useCart();

  // Local user profile state
  const [profileName, setProfileName] = useState('Boss (Developer)');
  const [profilePhone, setProfilePhone] = useState('+91 98765 43210');
  const [emailAddress, setEmailAddress] = useState(userEmail || 'boss.developer@gmail.com');

  // Modals
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [subModalType, setSubModalType] = useState<'rewards' | 'referral' | 'reviews' | 'security' | 'delete' | null>(null);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarCircle} onPress={() => setEditProfileVisible(true)}>
            <Text style={styles.avatarText}>
              {profileName ? profileName.charAt(0).toUpperCase() : 'B'}
            </Text>
            <View style={styles.editAvatarBadge}>
              <Ionicons name="pencil" size={10} color="#ffffff" />
            </View>
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.userName}>{profileName}</Text>
              <View style={styles.vipBadge}>
                <Text style={styles.vipText}>PLUS VIP</Text>
              </View>
            </View>
            <Text style={styles.userPhone}>{profilePhone}</Text>
            <Text style={styles.userEmail}>{emailAddress}</Text>
          </View>

          <TouchableOpacity style={styles.editProfileBtn} onPress={() => setEditProfileVisible(true)}>
            <Text style={styles.editProfileText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats Strip */}
        <View style={styles.statsStrip}>
          <TouchableOpacity style={styles.statBox} onPress={onOpenOrders}>
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <TouchableOpacity style={styles.statBox} onPress={onOpenWishlist}>
            <Text style={styles.statNumber}>{wishlist.length}</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <TouchableOpacity
            style={styles.statBox}
            onPress={() => setSubModalType('rewards')}>
            <Text style={[styles.statNumber, { color: '#F59E0B' }]}>250 🪙</Text>
            <Text style={styles.statLabel}>SuperCoins</Text>
          </TouchableOpacity>
        </View>

        {/* Special Banner: Refer & Earn ₹250 */}
        <TouchableOpacity
          style={styles.referralBanner}
          onPress={() => setSubModalType('referral')}>
          <View style={styles.referralLeft}>
            <Ionicons name="gift-outline" size={24} color="#ffffff" />
            <View>
              <Text style={styles.referralTitle}>Refer & Earn ₹250 Cash</Text>
              <Text style={styles.referralSub}>Invite your friends with code BOSS2026</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#ffffff" />
        </TouchableOpacity>

        {/* Section 1: Orders & Wishlist Hub */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>My Shopping Activity</Text>

          <TouchableOpacity style={styles.menuRow} onPress={onOpenOrders}>
            <View style={styles.menuLeft}>
              <Ionicons name="bag-handle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.menuTitle}>My Orders</Text>
            </View>
            <View style={styles.menuRight}>
              <Text style={styles.countText}>{orders.length}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuRow} onPress={onOpenWishlist}>
            <View style={styles.menuLeft}>
              <Ionicons name="heart-outline" size={20} color={COLORS.error} />
              <Text style={styles.menuTitle}>My Wishlist & Favorites</Text>
            </View>
            <View style={styles.menuRight}>
              <Text style={styles.countText}>{wishlist.length}</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => setSubModalType('reviews')}>
            <View style={styles.menuLeft}>
              <Ionicons name="star-outline" size={20} color="#F59E0B" />
              <Text style={styles.menuTitle}>My Reviews & Questions</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Section 2: Payments & Addresses */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Account & Saved Details</Text>

          <TouchableOpacity style={styles.menuRow} onPress={onOpenAddresses}>
            <View style={styles.menuLeft}>
              <Ionicons name="location-outline" size={20} color={COLORS.primary} />
              <Text style={styles.menuTitle}>Manage Addresses</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuRow} onPress={onOpenPayments}>
            <View style={styles.menuLeft}>
              <Ionicons name="card-outline" size={20} color={COLORS.primary} />
              <Text style={styles.menuTitle}>Saved Cards & Wallets</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => setSubModalType('rewards')}>
            <View style={styles.menuLeft}>
              <Ionicons name="ribbon-outline" size={20} color="#8B5CF6" />
              <Text style={styles.menuTitle}>My Rewards & SuperCoins</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Section 3: Settings & Security */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Settings & Security</Text>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => setSubModalType('security')}>
            <View style={styles.menuLeft}>
              <Ionicons name="key-outline" size={20} color={COLORS.text} />
              <Text style={styles.menuTitle}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuRow} onPress={onOpenNotifications}>
            <View style={styles.menuLeft}>
              <Ionicons name="notifications-outline" size={20} color={COLORS.text} />
              <Text style={styles.menuTitle}>Notification Preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuRow} onPress={onOpenSupport}>
            <View style={styles.menuLeft}>
              <Ionicons name="headset-outline" size={20} color={COLORS.primary} />
              <Text style={styles.menuTitle}>Help Center & Customer Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => setSubModalType('delete')}>
            <View style={styles.menuLeft}>
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              <Text style={[styles.menuTitle, { color: COLORS.error }]}>Delete Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setLogoutModalVisible(true)}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>ShopKart App v2.4.0 • Built with Expo & React Native</Text>
      </ScrollView>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={editProfileVisible}
        name={profileName}
        phone={profilePhone}
        email={emailAddress}
        onSave={(data) => {
          setProfileName(data.name);
          setProfilePhone(data.phone);
          setEmailAddress(data.email);
        }}
        onClose={() => setEditProfileVisible(false)}
      />

      {/* Rewards, Referral, Reviews & Security Modal */}
      {subModalType && (
        <RewardsAndSettingsModal
          visible={Boolean(subModalType)}
          type={subModalType}
          onClose={() => setSubModalType(null)}
          onConfirmDelete={() => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
            onOpenLogin();
          }}
        />
      )}

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        visible={logoutModalVisible}
        userEmail={emailAddress}
        onConfirmLogout={() => {
          setLogoutModalVisible(false);
          onOpenLogin();
        }}
        onCancel={() => setLogoutModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.md,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E293B',
    padding: 3,
    borderRadius: 8,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  vipBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  vipText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#92400E',
  },
  userPhone: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  userEmail: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  editProfileBtn: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editProfileText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsStrip: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
  },
  referralBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4338CA',
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  referralLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  referralTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  referralSub: {
    color: '#C7D2FE',
    fontSize: 11,
    marginTop: 1,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  countText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginTop: 6,
  },
  logoutText: {
    color: COLORS.error,
    fontSize: 14,
    fontWeight: 'bold',
  },
  versionText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
