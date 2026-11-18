import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [orderPush, setOrderPush] = useState(true);
  const [promoEmail, setPromoEmail] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(true);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>App Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Notifications Group */}
        <Text style={styles.groupTitle}>NOTIFICATION PREFERENCES</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Order Delivery Updates</Text>
              <Text style={styles.settingSub}>Real-time delivery status notifications</Text>
            </View>
            <Switch
              value={orderPush}
              onValueChange={setOrderPush}
              thumbColor="#ffffff"
              trackColor={{ true: COLORS.primary, false: '#ccc' }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Promotional Offers & Deals</Text>
              <Text style={styles.settingSub}>Exclusive discounts, coupons and news</Text>
            </View>
            <Switch
              value={promoEmail}
              onValueChange={setPromoEmail}
              thumbColor="#ffffff"
              trackColor={{ true: COLORS.primary, false: '#ccc' }}
            />
          </View>
        </View>

        {/* Security & Access */}
        <Text style={styles.groupTitle}>SECURITY & PRIVACY</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Biometric & Fingerprint Login</Text>
              <Text style={styles.settingSub}>Fast unlock using device fingerprint</Text>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              thumbColor="#ffffff"
              trackColor={{ true: COLORS.primary, false: '#ccc' }}
            />
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Alert.alert('Password', 'Change password link sent to email.')}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Change Password</Text>
              <Text style={styles.settingSub}>Update your account security key</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
          </TouchableOpacity>
        </View>

        {/* Display Group */}
        <Text style={styles.groupTitle}>DISPLAY & LANGUAGE</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Dark Appearance Mode</Text>
              <Text style={styles.settingSub}>Switch between light and dark themes</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={(val) => {
                setDarkMode(val);
                Alert.alert('Theme', val ? 'Dark theme enabled' : 'Light theme enabled');
              }}
              thumbColor="#ffffff"
              trackColor={{ true: COLORS.primary, false: '#ccc' }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>App Language</Text>
              <Text style={styles.settingSub}>English (India)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
          </View>
        </View>

        {/* App Info Box */}
        <View style={styles.appInfoCard}>
          <Text style={styles.appName}>ShopKart Mobile Edition</Text>
          <Text style={styles.appVer}>Version 1.0.0 (Production Build)</Text>
          <Text style={styles.copyright}>© 2026 ShopKart E-Commerce Pvt Ltd.</Text>
        </View>
      </ScrollView>
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
    elevation: 2,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  scroll: { padding: SPACING.lg, gap: SPACING.md },
  groupTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
    marginTop: 6,
  },
  card: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  settingSub: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
  appInfoCard: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  appName: { fontSize: 13, fontWeight: 'bold', color: COLORS.textSecondary },
  appVer: { fontSize: 11, color: COLORS.textSecondary },
  copyright: { fontSize: 10, color: '#BDBDBD' },
});
