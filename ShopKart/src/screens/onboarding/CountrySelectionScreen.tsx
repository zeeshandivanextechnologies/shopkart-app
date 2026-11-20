import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface Country {
  code: string;
  name: string;
  currency: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { code: 'IN', name: 'India', currency: 'INR (₹)', flag: '🇮🇳' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED (د.إ)', flag: '🇦🇪' },
  { code: 'US', name: 'United States', currency: 'USD ($)', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP (£)', flag: '🇬🇧' },
  { code: 'SG', name: 'Singapore', currency: 'SGD (S$)', flag: '🇸🇬' },
  { code: 'CA', name: 'Canada', currency: 'CAD (C$)', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', currency: 'AUD (A$)', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', currency: 'EUR (€)', flag: '🇩🇪' },
];

interface CountrySelectionScreenProps {
  onConfirm: (country: Country) => void;
  onBack?: () => void;
}

export const CountrySelectionScreen: React.FC<CountrySelectionScreenProps> = ({
  onConfirm,
  onBack,
}) => {
  const [selectedCode, setSelectedCode] = useState('IN');
  const [search, setSearch] = useState('');

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.currency.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCountry = COUNTRIES.find((c) => c.code === selectedCode) || COUNTRIES[0];

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
        <Text style={styles.headerTitle}>Select Region</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search country or currency..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>ALL COUNTRIES & CURRENCIES</Text>
        <View style={styles.card}>
          {filtered.map((item, idx) => {
            const isSelected = selectedCode === item.code;
            return (
              <TouchableOpacity
                key={item.code}
                activeOpacity={0.7}
                onPress={() => setSelectedCode(item.code)}
                style={[
                  styles.countryRow,
                  idx !== filtered.length - 1 && styles.borderBottom,
                  isSelected && styles.countryRowActive,
                ]}>
                <Text style={styles.flag}>{item.flag}</Text>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.currency}>{item.currency}</Text>
                </View>
                <Ionicons
                  name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={isSelected ? COLORS.primary : '#D0D0D0'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => onConfirm(selectedCountry)}>
          <Text style={styles.confirmBtnText}>Save Region & Continue ➔</Text>
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
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  searchWrapper: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  input: { flex: 1, fontSize: 13, color: COLORS.text },
  scroll: { padding: SPACING.lg, paddingBottom: 100 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    elevation: 1,
    overflow: 'hidden',
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  countryRowActive: {
    backgroundColor: COLORS.primaryLight,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  flag: { fontSize: 26 },
  countryName: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
  currency: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
});
