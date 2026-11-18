import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ImageGalleryModalProps {
  visible: boolean;
  images: string[];
  initialIndex: number;
  productTitle: string;
  onClose: () => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  visible,
  images,
  initialIndex,
  productTitle,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <Modal visible={visible} transparent={false} animationType="fade" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Top Control Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
            <Ionicons name="close" size={28} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.titleWrap}>
            <Text style={styles.title} numberOfLines={1}>{productTitle}</Text>
            <Text style={styles.counter}>{activeIndex + 1} / {images.length}</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="share-social-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Swipeable Large Gallery View */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const slide = Math.round(
              e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
            );
            setActiveIndex(slide);
          }}
          scrollEventThrottle={16}
          style={styles.galleryScroll}>
          {images.map((imgUri, idx) => (
            <View key={idx} style={styles.imageSlide}>
              <Image source={{ uri: imgUri }} style={styles.fullImage} resizeMode="contain" />
            </View>
          ))}
        </ScrollView>

        {/* Bottom Thumbnail Strip */}
        <View style={styles.bottomThumbnails}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbsContainer}>
            {images.map((imgUri, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setActiveIndex(idx)}
                style={[styles.thumbBox, activeIndex === idx && styles.thumbBoxActive]}>
                <Image source={{ uri: imgUri }} style={styles.thumbImage} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: 45,
    paddingBottom: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  iconBtn: {
    padding: 8,
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  counter: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  galleryScroll: {
    flex: 1,
  },
  imageSlide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: SCREEN_WIDTH * 0.95,
    height: '100%',
  },
  bottomThumbnails: {
    paddingVertical: SPACING.md,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  thumbsContainer: {
    paddingHorizontal: SPACING.lg,
    gap: 12,
  },
  thumbBox: {
    width: 55,
    height: 55,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbBoxActive: {
    borderColor: COLORS.primary,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
});
