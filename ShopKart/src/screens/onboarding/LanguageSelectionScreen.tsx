import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  popular?: boolean;
}

const LANGUAGES: Language[] = [
  { id: 'en', name: 'English', nativeName: 'English', popular: true },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', popular: true },
  { id: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { id: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { id: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { id: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { id: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

interface LanguageSelectionScreenProps {
  onConfirm: (langId: string) => void;
  onBack?: () => void;
}

export const LanguageSelectionScreen: React.FC<LanguageSelectionScreenProps> = ({
  onConfirm,
  onBack,
}) => {
  const [selectedLang, setSelectedLang] = useState('en');

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
        <Text style={styles.headerTitle}>Choose Language</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.heroBox}>
          <Ionicons name="language-outline" size={36} color={COLORS.primary} />
          <Text style={styles.title}>Select Your Preferred Language</Text>
          <Text style={styles.subtitle}>अपनी पसंदीदा भाषा चुनें और खरीदारी शुरू करें</Text>
        </View>

        <View style={styles.grid}>
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                activeOpacity={0.8}
                onPress={() => setSelectedLang(lang.id)}
                style={[
                  styles.langCard,
                  isSelected && styles.langCardActive,
                ]}>
                <View style={styles.cardTop}>
                  <Text style={[styles.nativeText, isSelected && styles.textActive]}>
                    {lang.nativeName}
                  </Text>
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={20}
                    color={isSelected ? COLORS.primary : '#BDBDBD'}
                  />
                </View>
                <Text style={[styles.englishText, isSelected && styles.textActive]}>
                  {lang.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => onConfirm(selectedLang)}>
          <Text style={styles.confirmBtnText}>Continue with Selection ➔</Text>
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
  scroll: { padding: SPACING.lg, paddingBottom: 100 },
  heroBox: { alignItems: 'center', marginVertical: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginTop: 8 },
  subtitle: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  langCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    elevation: 1,
  },
  langCardActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nativeText: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  englishText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 6 },
  textActive: { color: COLORS.primary },
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
