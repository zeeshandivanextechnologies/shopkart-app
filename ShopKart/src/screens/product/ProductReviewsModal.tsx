import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { Product } from '../../data/productsData';

interface ProductReviewsModalProps {
  visible: boolean;
  product: Product;
  reviews: {
    id: string;
    userName: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    verified: boolean;
  }[];
  onOpenWriteReview: () => void;
  onClose: () => void;
}

export const ProductReviewsModal: React.FC<ProductReviewsModalProps> = ({
  visible,
  product,
  reviews,
  onOpenWriteReview,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ratings & Reviews</Text>
          <TouchableOpacity onPress={onOpenWriteReview} style={styles.writeReviewBtn}>
            <Ionicons name="create-outline" size={18} color={COLORS.primary} />
            <Text style={styles.writeReviewText}>Write</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Customer Ratings Scorecard */}
          <View style={styles.scorecard}>
            <View style={styles.scoreLeft}>
              <Text style={styles.overallRating}>{product.rating}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Ionicons
                    key={s}
                    name={s <= Math.round(product.rating) ? 'star' : 'star-outline'}
                    size={16}
                    color="#FFA000"
                  />
                ))}
              </View>
              <Text style={styles.ratingCountText}>{product.reviewsCount} Total Ratings</Text>
            </View>

            {/* Rating Breakdown Progress Bars */}
            <View style={styles.scoreRight}>
              {[
                { stars: 5, pct: '78%' },
                { stars: 4, pct: '15%' },
                { stars: 3, pct: '4%' },
                { stars: 2, pct: '2%' },
                { stars: 1, pct: '1%' },
              ].map((bar) => (
                <View key={bar.stars} style={styles.barRow}>
                  <Text style={styles.barLabel}>{bar.stars}★</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: bar.pct as any }]} />
                  </View>
                  <Text style={styles.barPct}>{bar.pct}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Customer Reviews List */}
          <View style={styles.reviewsListSection}>
            <Text style={styles.reviewsListTitle}>Customer Feedback ({reviews.length})</Text>

            {reviews.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.userRow}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{rev.userName.charAt(0)}</Text>
                    </View>
                    <View>
                      <Text style={styles.userName}>{rev.userName}</Text>
                      {rev.verified && (
                        <View style={styles.verifiedRow}>
                          <Ionicons name="checkmark-circle" size={13} color={COLORS.success} />
                          <Text style={styles.verifiedText}>Verified Buyer</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text style={styles.reviewDate}>{rev.date}</Text>
                </View>

                {/* Star rating pill */}
                <View style={styles.ratingPill}>
                  <Text style={styles.ratingPillText}>{rev.rating} </Text>
                  <Ionicons name="star" size={11} color="#ffffff" />
                </View>

                <Text style={styles.reviewHeadline}>{rev.title}</Text>
                <Text style={styles.reviewComment}>{rev.comment}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: 45,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  writeReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
  },
  writeReviewText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  content: {
    padding: SPACING.lg,
  },
  scorecard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  scoreLeft: {
    alignItems: 'center',
    paddingRight: SPACING.lg,
    borderRightWidth: 1,
    borderRightColor: '#EEEEEE',
    minWidth: 110,
  },
  overallRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginVertical: 4,
  },
  ratingCountText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scoreRight: {
    flex: 1,
    paddingLeft: SPACING.md,
    gap: 6,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    width: 20,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  barPct: {
    fontSize: 10,
    color: COLORS.textSecondary,
    width: 26,
    textAlign: 'right',
  },
  reviewsListSection: {
    marginTop: SPACING.xs,
  },
  reviewsListTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  reviewCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  userName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 1,
  },
  verifiedText: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: '500',
  },
  reviewDate: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginVertical: 4,
  },
  ratingPillText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  reviewHeadline: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  reviewComment: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
    marginTop: 4,
  },
});
