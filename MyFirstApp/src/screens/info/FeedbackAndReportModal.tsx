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

interface FeedbackModalProps {
  visible: boolean;
  type: 'problem' | 'feedback' | 'rate';
  onClose: () => void;
}

export const FeedbackAndReportModal: React.FC<FeedbackModalProps> = ({
  visible,
  type,
  onClose,
}) => {
  const [rating, setRating] = useState(5);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Payment' | 'Delivery' | 'UI Bug' | 'Other'>('UI Bug');

  const handleSubmit = () => {
    if (type === 'rate') {
      Alert.alert('Thank You! 🌟', 'Thanks for your feedback! We will keep improving ShopKart.');
      onClose();
      return;
    }

    if (!description.trim()) {
      Alert.alert('Required Info', 'Please describe your problem or feedback.');
      return;
    }

    Alert.alert(
      type === 'problem' ? 'Issue Reported 🛠️' : 'Feedback Received ❤️',
      type === 'problem'
        ? `Incident ticket #BUG-${Math.floor(1000 + Math.random() * 9000)} created. Our tech team is investigating.`
        : 'Thank you for sharing your thoughts with the ShopKart product team!'
    );
    setSubject('');
    setDescription('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons
                name={
                  type === 'rate'
                    ? 'star'
                    : type === 'problem'
                    ? 'bug-outline'
                    : 'chatbox-ellipses-outline'
                }
                size={22}
                color={type === 'rate' ? '#F59E0B' : type === 'problem' ? COLORS.error : COLORS.primary}
              />
              <Text style={styles.title}>
                {type === 'rate'
                  ? 'Rate Our App'
                  : type === 'problem'
                  ? 'Report a Problem'
                  : 'App Feedback'}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {/* VIEW 1: RATE APP */}
            {type === 'rate' && (
              <View style={{ alignItems: 'center', paddingVertical: SPACING.md }}>
                <Text style={styles.rateTitle}>Enjoying the ShopKart Experience?</Text>
                <Text style={styles.rateSub}>
                  Your feedback helps us deliver the fastest shopping experience in India!
                </Text>

                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <TouchableOpacity key={s} onPress={() => setRating(s)} style={styles.starBtn}>
                      <Ionicons
                        name={s <= rating ? 'star' : 'star-outline'}
                        size={38}
                        color={s <= rating ? '#F59E0B' : '#D1D5DB'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.ratingBadge}>
                  {rating === 5
                    ? 'Loved it! 5 Stars ⭐⭐⭐⭐⭐'
                    : rating === 4
                    ? 'Great experience! ⭐⭐⭐⭐'
                    : 'Needs Improvement'}
                </Text>
              </View>
            )}

            {/* VIEW 2: REPORT A PROBLEM */}
            {type === 'problem' && (
              <View>
                <Text style={styles.label}>Category of Problem</Text>
                <View style={styles.catRow}>
                  {(['UI Bug', 'Payment', 'Delivery', 'Other'] as const).map((c) => {
                    const isSel = category === c;
                    return (
                      <TouchableOpacity
                        key={c}
                        style={[styles.catPill, isSel && styles.catPillActive]}
                        onPress={() => setCategory(c)}>
                        <Text style={[styles.catText, isSel && styles.catTextActive]}>{c}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <Text style={styles.label}>Headline / Short Summary</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Screen froze during checkout"
                  placeholderTextColor={COLORS.textSecondary}
                  value={subject}
                  onChangeText={setSubject}
                />

                <Text style={styles.label}>Describe What Happened</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Steps to reproduce, error message shown..."
                  placeholderTextColor={COLORS.textSecondary}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                />
              </View>
            )}

            {/* VIEW 3: GENERAL FEEDBACK */}
            {type === 'feedback' && (
              <View>
                <Text style={styles.label}>What do you like or want us to improve?</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Share ideas, feature requests, or praise for our delivery team..."
                  placeholderTextColor={COLORS.textSecondary}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                />
              </View>
            )}

            {/* Submit CTA */}
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>
                {type === 'rate' ? 'Submit Rating' : 'Submit'}
              </Text>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  rateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  rateSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 18,
  },
  starBtn: {
    padding: 2,
  },
  ratingBadge: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#D97706',
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
    marginTop: 10,
  },
  catRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  catPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  catPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  catText: {
    fontSize: 12,
    color: COLORS.text,
  },
  catTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    fontSize: 13,
    color: COLORS.text,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
