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

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
  onNavigateMobileLogin: () => void;
  onNavigateSocialLogin: () => void;
  onBack?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateRegister,
  onNavigateForgotPassword,
  onNavigateMobileLogin,
  onNavigateSocialLogin,
  onBack,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Required', 'Please enter your email and password.');
      return;
    }
    onLoginSuccess(email.trim());
  };

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
        <Text style={styles.headerTitle}>Welcome Back</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Brand Hero */}
        <View style={styles.heroBox}>
          <View style={styles.logoCircle}>
            <Ionicons name="bag-handle" size={38} color="#ffffff" />
          </View>
          <Text style={styles.brandTitle}>ShopKart</Text>
          <Text style={styles.brandSub}>Sign in to access your orders & wishlist</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
              <TextInput
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.forgotBtn}
            onPress={onNavigateForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
            <Text style={styles.primaryBtnText}>Sign In with Email</Text>
          </TouchableOpacity>

          {/* Quick Alternatives */}
          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR LOGIN WITH</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.altRow}>
            <TouchableOpacity
              style={styles.altBtn}
              onPress={onNavigateMobileLogin}>
              <Ionicons name="phone-portrait-outline" size={18} color={COLORS.primary} />
              <Text style={styles.altBtnText}>Mobile OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.altBtn}
              onPress={onNavigateSocialLogin}>
              <Ionicons name="logo-google" size={18} color="#EA4335" />
              <Text style={styles.altBtnText}>Social Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Register Prompt */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onNavigateRegister}>
            <Text style={styles.registerLink}>Register Now</Text>
          </TouchableOpacity>
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
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  scroll: { padding: SPACING.lg, gap: SPACING.md },
  heroBox: { alignItems: 'center', marginVertical: 10 },
  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 3,
  },
  brandTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  brandSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4, textAlign: 'center' },
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    gap: 12,
  },
  inputContainer: {},
  label: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 6 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
    backgroundColor: '#FAFAFA',
  },
  input: { flex: 1, fontSize: 14, color: COLORS.text },
  forgotBtn: { alignSelf: 'flex-end' },
  forgotText: { fontSize: 12, color: COLORS.primary, fontWeight: 'bold' },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  line: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  orText: { fontSize: 10, color: COLORS.textSecondary, marginHorizontal: 8, fontWeight: 'bold' },
  altRow: { flexDirection: 'row', gap: 10 },
  altBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
    backgroundColor: '#FAFAFA',
  },
  altBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.text },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  footerText: { fontSize: 13, color: COLORS.textSecondary },
  registerLink: { fontSize: 13, color: COLORS.primary, fontWeight: 'bold' },
});
