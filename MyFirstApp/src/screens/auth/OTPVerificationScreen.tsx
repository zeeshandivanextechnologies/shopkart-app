import React, { useState, useEffect } from 'react';
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

interface OTPVerificationScreenProps {
  destination: string; // phone or email
  onVerifySuccess: () => void;
  onResendOTP: () => void;
  onBack: () => void;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  destination,
  onVerifySuccess,
  onResendOTP,
  onBack,
}) => {
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleVerify = () => {
    if (otp.trim().length < 4) {
      Alert.alert('Invalid OTP', 'Please enter the 4-digit code.');
      return;
    }
    onVerifySuccess();
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(30);
    onResendOTP();
    Alert.alert('OTP Resent', `A new code has been dispatched to ${destination}.`);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OTP Verification</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.iconCircle}>
          <Ionicons name="shield-checkmark-outline" size={42} color={COLORS.success} />
        </View>

        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We sent a 4-digit security code to{' '}
          <Text style={{ fontWeight: 'bold', color: COLORS.text }}>{destination}</Text>
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>4-Digit OTP Code</Text>
          <View style={styles.inputBox}>
            <TextInput
              placeholder="••••"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={4}
              style={styles.otpInput}
              autoFocus
            />
          </View>

          <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
            <Text style={styles.verifyBtnText}>Verify & Proceed ➔</Text>
          </TouchableOpacity>
        </View>

        {/* Resend Timer Strip */}
        <View style={styles.timerRow}>
          {secondsLeft > 0 ? (
            <Text style={styles.timerText}>
              Resend OTP in <Text style={{ fontWeight: 'bold' }}>00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendActiveText}>Resend Code Now</Text>
            </TouchableOpacity>
          )}
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
  scroll: { padding: SPACING.lg, alignItems: 'center', gap: SPACING.md },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
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
    gap: 14,
  },
  label: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, textAlign: 'center' },
  inputBox: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 12,
    textAlign: 'center',
    color: COLORS.text,
    width: '100%',
  },
  verifyBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  verifyBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
  timerRow: { marginTop: 12 },
  timerText: { fontSize: 13, color: COLORS.textSecondary },
  resendActiveText: { fontSize: 13, color: COLORS.primary, fontWeight: 'bold' },
});
