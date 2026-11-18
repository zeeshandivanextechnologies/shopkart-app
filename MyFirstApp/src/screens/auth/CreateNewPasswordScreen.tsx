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

interface CreateNewPasswordScreenProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const CreateNewPasswordScreen: React.FC<CreateNewPasswordScreenProps> = ({
  onSuccess,
  onBack,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    if (!password || password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Mismatch', 'Confirm password does not match.');
      return;
    }
    Alert.alert('Password Updated! 🔒', 'Your account credentials have been securely reset.');
    onSuccess();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.iconCircle}>
          <Ionicons name="lock-closed" size={42} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Set New Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from previous passwords for optimal security.
        </Text>

        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputBox}>
              <Ionicons name="key-outline" size={20} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
              <TextInput
                placeholder="At least 6 characters"
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.inputBox}>
              <Ionicons name="checkmark-done-outline" size={20} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Re-type new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
            </View>
          </View>

          {/* Password Strength Checklist */}
          <View style={styles.checklist}>
            <View style={styles.checkItem}>
              <Ionicons
                name={password.length >= 6 ? 'checkmark-circle' : 'ellipse-outline'}
                size={16}
                color={password.length >= 6 ? COLORS.success : '#BDBDBD'}
              />
              <Text style={styles.checkText}>At least 6 characters</Text>
            </View>
            <View style={styles.checkItem}>
              <Ionicons
                name={password && password === confirmPassword ? 'checkmark-circle' : 'ellipse-outline'}
                size={16}
                color={password && password === confirmPassword ? COLORS.success : '#BDBDBD'}
              />
              <Text style={styles.checkText}>Passwords match</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleSave}>
            <Text style={styles.primaryBtnText}>Save & Sign In</Text>
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
  checklist: {
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
    gap: 6,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
});
