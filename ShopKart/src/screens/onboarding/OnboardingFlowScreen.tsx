import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  image: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const SLIDES: OnboardingSlide[] = [
  // Onboarding Screen 1
  {
    id: '1',
    step: 'STEP 1 OF 3',
    title: 'Discover 10,000+ Genuine Brands',
    subtitle: 'Shop the latest trending footwear, gadgets, and apparel from global verified brands with easy size guides.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    icon: 'search-outline',
    color: COLORS.primary,
  },
  // Onboarding Screen 2
  {
    id: '2',
    step: 'STEP 2 OF 3',
    title: 'Ultra-Fast Delivery At Your Doorstep',
    subtitle: 'Lightning-fast delivery with live GPS order tracking and hassle-free 7 days replacement guarantee.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    icon: 'flash-outline',
    color: COLORS.secondary,
  },
  // Onboarding Screen 3
  {
    id: '3',
    step: 'STEP 3 OF 3',
    title: '100% Safe Payments & Cash on Delivery',
    subtitle: 'Pay seamlessly with UPI, Credit/Debit cards, EMI, or simply pay in cash when the delivery agent arrives.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=800&q=80',
    icon: 'shield-checkmark-outline',
    color: '#388E3C',
  },
];

interface OnboardingFlowScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

export const OnboardingFlowScreen: React.FC<OnboardingFlowScreenProps> = ({
  onComplete,
  onSkip,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<any>(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.stepTag}>
          <Text style={styles.stepTagText}>{SLIDES[currentIndex].step}</Text>
        </View>
        <TouchableOpacity onPress={onSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Swipeable Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const slide = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH
          );
          setCurrentIndex(slide);
        }}
        scrollEventThrottle={16}>
        {SLIDES.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.imageCard}>
              <Image source={{ uri: slide.image }} style={styles.image} resizeMode="cover" />
              <View style={[styles.floatingIconBadge, { backgroundColor: slide.color }]}>
                <Ionicons name={slide.icon} size={24} color="#ffffff" />
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.subtitle}>{slide.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Nav Controller */}
      <View style={styles.bottomBar}>
        {/* Pagination Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>

        {/* Next / Finish Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.nextBtn, { backgroundColor: SLIDES[currentIndex].color }]}
          onPress={handleNext}>
          <Text style={styles.nextBtnText}>
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next ➔'}
          </Text>
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
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  stepTag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stepTagText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: 'bold',
  },
  skipBtn: {
    padding: 6,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 10,
  },
  imageCard: {
    width: '100%',
    height: 330,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  floatingIconBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  textContainer: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: 24,
    paddingTop: 12,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    width: 22,
    backgroundColor: COLORS.primary,
  },
  nextBtn: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 3,
  },
  nextBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
