import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { Product } from '../../data/productsData';

interface WriteReviewModalProps {
  visible: boolean;
  product: Product;
  onClose: () => void;
  onSubmitSuccess: (newReview: {
    userName: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
  }) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  visible,
  product,
  onClose,
  onSubmitSuccess,
}) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) {
      Alert.alert('Required', 'Please write a few words about your experience.');
      return;
    }

    const reviewObj = {
      userName: userName.trim() || 'Verified Customer',
      rating,
      title: title.trim() || (rating >= 4 ? 'Great purchase!' : 'Average product'),
      comment: comment.trim(),
      date: 'Today',
    };

    onSubmitSuccess(reviewObj);
    setTitle('');
    setComment('');
    setRating(5);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Write a Review</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle-outline" size={26} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {/* Product Summary */}
            <View style={styles.productSummary}>
              <Text style={styles.productTitle} numberOfLines={1}>{product.title}</Text>
              <Text style={styles.productBrand}>By {product.brand}</Text>
            </View>

            {/* Star Rating Select */}
            <View style={styles.ratingSection}>
              <Text style={styles.label}>Rate this product</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                    style={styles.starBtn}>
                    <Ionicons
                      name={star <= rating ? 'star' : 'star-outline'}
                      size={32}
                      color={star <= rating ? '#FFA000' : '#BDBDBD'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.ratingLabel}>
                {rating === 5 ? 'Excellent 🌟' : rating === 4 ? 'Very Good 👍' : rating === 3 ? 'Average 😐' : 'Poor 👎'}
              </Text>
            </View>

            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Your Name (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Rahul Sharma"
                placeholderTextColor={COLORS.textSecondary}
                value={userName}
                onChangeText={setUserName}
              />
            </View>

            {/* Review Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Review Headline</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Best quality for this price!"
                placeholderTextColor={COLORS.textSecondary}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Review Comment */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Detailed Feedback</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="What did you like or dislike? How is the fit/quality?"
                placeholderTextColor={COLORS.textSecondary}
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Ionicons name="checkmark-circle" size={20} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.submitBtnText}>Submit Review</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.lg,
  },
  productSummary: {
    backgroundColor: '#F9FAFB',
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.lg,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  productBrand: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 4,
  },
  starBtn: {
    padding: 4,
  },
  ratingLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
  },
  textArea: {
    height: 90,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: SPACING.sm,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
