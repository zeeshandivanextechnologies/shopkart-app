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

interface ForgotPasswordScreenProps {
  onSubmitEmail: (email: string) => void;
  onNavigateLogin: () => void;
  onBack: () => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onSubmitEmail,
  onNavigateLogin,
  onBack,
}) => {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    if (!email.trim()) {
      Alert.alert('Required', 'Please enter your registered email address.');
      return;
    }
    onSubmitEmail(email.trim());
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.iconCircle}>
          <Ionicons name="key-outline" size={42} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Trouble Logging In?</Text>
        <Text style={styles.subtitle}>
          Enter your registered email and we'll send you a 4-digit verification code to reset your password.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Registered Email Address</Text>
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

          <TouchableOpacity style={styles.primaryBtn} onPress={handleSendCode}>
            <Text style={styles.primaryBtnText}>Send OTP Code ➔</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backToLogin} onPress={onNavigateLogin}>
          <Ionicons name="arrow-back" size={16} color={COLORS.primary} style={{ marginRight: 4 }} />
          <Text style={styles.backToLoginText}>Return to Sign In</Text>
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
  scroll: { padding: SPACING.lg, gap: SPACING.md, alignItems: 'center' },
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
    marginBottom: 10,
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
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  backToLogin: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  backToLoginText: { fontSize: 13, color: COLORS.primary, fontWeight: 'bold' },
});
