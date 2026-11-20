import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { Product } from '../../data/productsData';

interface VideoModalProps {
  visible: boolean;
  product: Product;
  onClose: () => void;
}

export const ProductVideoModal: React.FC<VideoModalProps> = ({
  visible,
  product,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <Text style={styles.title} numberOfLines={1}>{product.title} - Video Demo</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Simulated Video Player Screen */}
          <View style={styles.playerWrapper}>
            <View style={styles.videoCanvas}>
              <Ionicons name="film-outline" size={60} color="#60A5FA" />
              <Text style={styles.videoQuality}>4K Ultra HD • Official Demo</Text>
              <Text style={styles.videoSub}>{product.brand} Studio Showcase Reel</Text>

              <TouchableOpacity
                style={styles.playButton}
                onPress={() => setIsPlaying(!isPlaying)}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={36}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>

            {/* Video Controls Timeline */}
            <View style={styles.controlsBar}>
              <Text style={styles.timeText}>01:24</Text>
              <View style={styles.timelineTrack}>
                <View style={styles.timelineProgress} />
              </View>
              <Text style={styles.timeText}>03:45</Text>
            </View>
          </View>

          {/* Key Product Highlights in Video */}
          <View style={styles.highlightsBox}>
            <Text style={styles.highlightHeader}>What this video covers:</Text>
            <Text style={styles.highlightItem}>• 360° Real Angle View & Finish</Text>
            <Text style={styles.highlightItem}>• True-to-life sizing and ergonomics</Text>
            <Text style={styles.highlightItem}>• Unboxing experience and bundled accessories</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    overflow: 'hidden',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  closeBtn: {
    padding: 4,
  },
  playerWrapper: {
    backgroundColor: '#0F172A',
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  videoCanvas: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  videoQuality: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  videoSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  controlsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 10,
    marginTop: 16,
  },
  timeText: {
    color: '#94A3B8',
    fontSize: 11,
  },
  timelineTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    overflow: 'hidden',
  },
  timelineProgress: {
    width: '38%',
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  highlightsBox: {
    padding: SPACING.lg,
    backgroundColor: '#1E293B',
  },
  highlightHeader: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  highlightItem: {
    color: '#CBD5E1',
    fontSize: 12,
    lineHeight: 18,
  },
});
