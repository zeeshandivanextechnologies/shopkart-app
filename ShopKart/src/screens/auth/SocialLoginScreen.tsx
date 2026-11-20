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

interface SocialLoginScreenProps {
  onSocialSuccess: (provider: string, email: string) => void;
  onNavigateEmailLogin: () => void;
  onBack: () => void;
}

export const SocialLoginScreen: React.FC<SocialLoginScreenProps> = ({
  onSocialSuccess,
  onNavigateEmailLogin,
  onBack,
}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1-Click Social Sign In</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.heroBox}>
          <View style={styles.iconCircle}>
            <Ionicons name="finger-print-outline" size={42} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Fast & Effortless</Text>
          <Text style={styles.subtitle}>
            Choose your preferred account to sign in or create a new profile with one single tap.
          </Text>
        </View>

        {/* Social Buttons */}
        <View style={styles.buttonList}>
          {/* Google */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.socialBtn, styles.googleBtn]}
            onPress={() => onSocialSuccess('Google', 'user.google@gmail.com')}>
            <Ionicons name="logo-google" size={22} color="#EA4335" />
            <Text style={styles.socialBtnText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.socialBtn, styles.appleBtn]}
            onPress={() => onSocialSuccess('Apple', 'user.apple@icloud.com')}>
            <Ionicons name="logo-apple" size={22} color="#ffffff" />
            <Text style={[styles.socialBtnText, { color: '#ffffff' }]}>Continue with Apple ID</Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.socialBtn, styles.fbBtn]}
            onPress={() => onSocialSuccess('Facebook', 'user.facebook@meta.com')}>
            <Ionicons name="logo-facebook" size={22} color="#1877F2" />
            <Text style={styles.socialBtnText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Security Assurance */}
        <View style={styles.securityBox}>
          <Ionicons name="shield-checkmark" size={18} color={COLORS.success} />
          <Text style={styles.securityText}>
            We never share or post anything without your explicit permission.
          </Text>
        </View>

        <TouchableOpacity style={styles.emailBtn} onPress={onNavigateEmailLogin}>
          <Text style={styles.emailBtnText}>Sign in with Regular Email Instead</Text>
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
  heroBox: { alignItems: 'center', marginVertical: 14 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, textAlign: 'center' },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
    marginTop: 6,
  },
  buttonList: {
    width: '100%',
    gap: 12,
    marginTop: 10,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 1,
  },
  googleBtn: { backgroundColor: '#ffffff' },
  appleBtn: { backgroundColor: '#000000', borderColor: '#000000' },
  fbBtn: { backgroundColor: '#ffffff' },
  socialBtnText: { fontSize: 15, fontWeight: 'bold', color: COLORS.text },
  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 10,
    gap: 8,
    marginTop: 8,
  },
  securityText: { fontSize: 11, color: '#2E7D32', flex: 1, lineHeight: 16 },
  emailBtn: { marginTop: 14, padding: 6 },
  emailBtnText: { fontSize: 13, color: COLORS.primary, fontWeight: 'bold' },
});
