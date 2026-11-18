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

interface LocationPermissionScreenProps {
  onAllow: () => void;
  onSkip: () => void;
  onBack?: () => void;
}

export const LocationPermissionScreen: React.FC<LocationPermissionScreenProps> = ({
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
          <Text style={styles.skipText}>Not Now</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.iconCircle}>
          <Ionicons name="location" size={48} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Enable Device Location</Text>
        <Text style={styles.subtitle}>
          Allowing location access helps us automatically detect your exact delivery address and show accurate delivery timelines.
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="flash-outline" size={22} color={COLORS.primary} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Accurate Delivery Timelines</Text>
              <Text style={styles.rowSub}>See exact arrival dates for your pin code.</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="navigate-outline" size={22} color={COLORS.secondary} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Auto-Fill Shipping Address</Text>
              <Text style={styles.rowSub}>No need to manually type city and state.</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="pricetag-outline" size={22} color={COLORS.success} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Hyperlocal Deals & Offers</Text>
              <Text style={styles.rowSub}>Find store discounts active in your city.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.allowBtn}
          onPress={() => {
            Alert.alert('Location Granted', 'GPS location enabled for precise deliveries.');
            onAllow();
          }}>
          <Ionicons name="locate-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.allowBtnText}>Allow Location Access</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.manualBtn} onPress={onSkip}>
          <Text style={styles.manualBtnText}>Enter Address Manually</Text>
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
    backgroundColor: COLORS.primaryLight,
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
    backgroundColor: COLORS.primary,
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
