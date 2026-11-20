import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface AppIntroScreenProps {
  onGetStarted: () => void;
  onSelectLanguage: () => void;
}

export const AppIntroScreen: React.FC<AppIntroScreenProps> = ({
  onGetStarted,
  onSelectLanguage,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Language Switch Header */}
      <View style={styles.topBar}>
        <View />
        <TouchableOpacity style={styles.langBtn} onPress={onSelectLanguage}>
          <Ionicons name="globe-outline" size={16} color={COLORS.primary} />
          <Text style={styles.langText}>English / हिन्दी</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Visual Card */}
      <View style={styles.heroWrapper}>
        <View style={styles.imageBox}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80' }}
            style={styles.heroImg}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Content & Benefits */}
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>WELCOME TO SHOPKART</Text>
        </View>

        <Text style={styles.title}>All Your Shopping Needs In One Pocket</Text>
        <Text style={styles.subtitle}>
          Discover over 10,000+ top brand electronics, footwear, trendsetting fashion, and daily lifestyle essentials.
        </Text>

        <View style={styles.benefitList}>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
            <Text style={styles.benefitText}>Free Express Delivery across India</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
            <Text style={styles.benefitText}>Flat ₹200 OFF on your first purchase</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.startBtn}
          onPress={onGetStarted}>
          <Text style={styles.startBtnText}>Explore ShopKart ➔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  langText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  heroWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  imageBox: {
    width: '100%',
    height: '90%',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeText: {
    color: COLORS.secondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 6,
    lineHeight: 18,
  },
  benefitList: {
    marginVertical: 14,
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  startBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
  },
  startBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
