import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface PreferencesModalProps {
  visible: boolean;
  onClose: () => void;
}

export const NotificationPreferencesModal: React.FC<PreferencesModalProps> = ({
  visible,
  onClose,
}) => {
  // Push Notification States
  const [pushOrders, setPushOrders] = useState(true);
  const [pushOffers, setPushOffers] = useState(true);
  const [pushPriceDrop, setPushPriceDrop] = useState(true);

  // Email States
  const [emailInvoices, setEmailInvoices] = useState(true);
  const [emailNewsletters, setEmailNewsletters] = useState(false);
  const [emailRecommendations, setEmailRecommendations] = useState(true);

  // SMS States
  const [smsDeliveryUpdates, setSmsDeliveryUpdates] = useState(true);
  const [smsPromos, setSmsPromos] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notification Settings</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Section 1: Push Notifications */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="notifications" size={18} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Push Notifications</Text>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Order & Delivery Alerts</Text>
                <Text style={styles.settingSub}>Real-time dispatch and delivery updates</Text>
              </View>
              <Switch
                value={pushOrders}
                onValueChange={setPushOrders}
                trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Flash Deals & Offers</Text>
                <Text style={styles.settingSub}>Limited-time price drops and discount alerts</Text>
              </View>
              <Switch
                value={pushOffers}
                onValueChange={setPushOffers}
                trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Wishlist Price Drops</Text>
                <Text style={styles.settingSub}>Get notified when saved items go on sale</Text>
              </View>
              <Switch
                value={pushPriceDrop}
                onValueChange={setPushPriceDrop}
                trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
              />
            </View>
          </View>

          {/* Section 2: Email Preferences */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="mail" size={18} color="#2563EB" />
              <Text style={styles.sectionTitle}>Email Preferences</Text>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Order Tax Invoices & Receipts</Text>
                <Text style={styles.settingSub}>Official purchase receipts sent to your inbox</Text>
              </View>
              <Switch
                value={emailInvoices}
                onValueChange={setEmailInvoices}
                trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Product Recommendations</Text>
                <Text style={styles.settingSub}>Handpicked weekly styles based on your taste</Text>
              </View>
              <Switch
                value={emailRecommendations}
                onValueChange={setEmailRecommendations}
                trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Promotional Newsletters</Text>
                <Text style={styles.settingSub}>Partner announcements and seasonal catalogs</Text>
              </View>
              <Switch
                value={emailNewsletters}
                onValueChange={setEmailNewsletters}
                trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
              />
            </View>
          </View>

          {/* Section 3: SMS Preferences */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="chatbox-ellipses" size={18} color="#059669" />
              <Text style={styles.sectionTitle}>SMS & WhatsApp Alerts</Text>
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Delivery PIN & OTP SMS</Text>
                <Text style={styles.settingSub}>Verification codes for secure deliveries</Text>
              </View>
              <Switch
                value={smsDeliveryUpdates}
                onValueChange={setSmsDeliveryUpdates}
                trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>WhatsApp Deal Alerts</Text>
                <Text style={styles.settingSub}>Exclusive VIP coupons sent via WhatsApp</Text>
              </View>
              <Switch
                value={smsPromos}
                onValueChange={setSmsPromos}
                trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => {
              Alert.alert('Preferences Saved! ✅', 'Your communication settings have been updated.');
              onClose();
            }}>
            <Text style={styles.saveBtnText}>Save Preferences</Text>
          </TouchableOpacity>
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
    padding: SPACING.md,
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flex: 1,
    paddingRight: 10,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  settingSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  saveBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
