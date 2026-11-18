import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface MobileLoginScreenProps {
  onSendOTP: (mobile: string) => void;
  onNavigateEmailLogin: () => void;
  onBack: () => void;
}

export const MobileLoginScreen: React.FC<MobileLoginScreenProps> = ({
  onSendOTP,
  onNavigateEmailLogin,
  onBack,
}) => {
  const [mobile, setMobile] = useState('');

  const handleSendCode = () => {
    if (!mobile.trim() || mobile.trim().length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    onSendOTP('+91 ' + mobile.trim());
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mobile Login</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.iconCircle}>
          <Ionicons name="phone-portrait-outline" size={40} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Fast & Passwordless</Text>
        <Text style={styles.subtitle}>
          Enter your 10-digit mobile number. We will send you an OTP via SMS to sign in securely.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.phoneInputRow}>
            <View style={styles.prefixBox}>
              <Text style={styles.prefixText}>🇮🇳 +91</Text>
            </View>
            <TextInput
              placeholder="98765 43210"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.phoneInput}
            />
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleSendCode}>
            <Text style={styles.primaryBtnText}>Get OTP Code ➔</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.emailLoginBtn} onPress={onNavigateEmailLogin}>
          <Ionicons name="mail-outline" size={16} color={COLORS.primary} style={{ marginRight: 6 }} />
          <Text style={styles.emailLoginText}>Sign in with Email & Password instead</Text>
        </TouchableOpacity>
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
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  scroll: { padding: SPACING.lg, alignItems: 'center', gap: SPACING.md },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, textAlign: 'center' },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    gap: 12,
  },
  label: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prefixBox: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    height: 46,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefixText: { fontSize: 14, fontWeight: 'bold', color: COLORS.text },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
    letterSpacing: 1,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  emailLoginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  emailLoginText: { fontSize: 13, color: COLORS.primary, fontWeight: 'bold' },
});
