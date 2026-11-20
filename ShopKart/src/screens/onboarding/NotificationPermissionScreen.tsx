import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface NotificationPermissionScreenProps {
  onAllow: () => void;
  onSkip: () => void;
  onBack?: () => void;
}

export const NotificationPermissionScreen: React.FC<NotificationPermissionScreenProps> = ({
  onAllow,
  onSkip,
  onBack,
}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.iconCircle}>
          <Ionicons name="notifications" size={48} color={COLORS.secondary} />
        </View>

        <Text style={styles.title}>Don't Miss Live Updates</Text>
        <Text style={styles.subtitle}>
          Turn on notifications to get instant alerts on order delivery status, flash deals, and price drops on your favorite items.
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="cube-outline" size={22} color={COLORS.primary} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Live Order Tracking</Text>
              <Text style={styles.rowSub}>Get notified when your order is out for delivery.</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="trending-down-outline" size={22} color={COLORS.success} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Price Drop Alerts</Text>
              <Text style={styles.rowSub}>Instant notification when a wishlisted item goes on sale.</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="gift-outline" size={22} color={COLORS.secondary} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Exclusive Member Coupons</Text>
              <Text style={styles.rowSub}>Early access to Diwali & festive flash discounts.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.allowBtn}
          onPress={() => {
            Alert.alert('Notifications Enabled! 🔔', 'You will now receive live order alerts.');
            onAllow();
          }}>
          <Ionicons name="notifications-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.allowBtnText}>Turn On Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.manualBtn} onPress={onSkip}>
          <Text style={styles.manualBtnText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  backBtn: { padding: 4 },
  skipText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '600' },
  scroll: { padding: SPACING.lg, alignItems: 'center', paddingBottom: 120 },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    elevation: 2,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, textAlign: 'center' },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 14,
    elevation: 1,
    gap: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowText: { flex: 1, marginLeft: 12 },
  rowTitle: { fontSize: 13, fontWeight: 'bold', color: COLORS.text },
  rowSub: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    gap: 10,
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  allowBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allowBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  manualBtn: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  manualBtnText: { color: COLORS.textSecondary, fontSize: 13, fontWeight: '600' },
});
