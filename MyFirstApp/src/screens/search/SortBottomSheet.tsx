import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

export type SortOption =
  | 'popular'
  | 'price_low'
  | 'price_high'
  | 'rating_high'
  | 'newest';

interface SortBottomSheetProps {
  visible: boolean;
  activeSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  onClose: () => void;
}

const SORT_OPTIONS: { id: SortOption; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'popular', label: 'Popularity & Relevance', icon: 'flame-outline' },
  { id: 'price_low', label: 'Price: Low to High', icon: 'arrow-down-outline' },
  { id: 'price_high', label: 'Price: High to Low', icon: 'arrow-up-outline' },
  { id: 'rating_high', label: 'Customer Rating (4★ & Above)', icon: 'star-outline' },
  { id: 'newest', label: 'Newest Arrivals & Releases', icon: 'sparkles-outline' },
];

export const SortBottomSheet: React.FC<SortBottomSheetProps> = ({
  visible,
  activeSort,
  onSelectSort,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.bottomSheet} onStartShouldSetResponder={() => true}>
          {/* Handle bar */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Ionicons name="swap-vertical" size={20} color={COLORS.primary} />
              <Text style={styles.title}>Sort By</Text>
            </View>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close-circle-outline" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <ScrollView style={styles.optionsList}>
            {SORT_OPTIONS.map((opt) => {
              const isSelected = activeSort === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                  onPress={() => {
                    onSelectSort(opt.id);
                    onClose();
                  }}>
                  <View style={styles.optLeft}>
                    <Ionicons
                      name={opt.icon}
                      size={20}
                      color={isSelected ? COLORS.primary : COLORS.textSecondary}
                    />
                    <Text style={[styles.optLabel, isSelected && styles.optLabelSelected]}>
                      {opt.label}
                    </Text>
                  </View>

                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={22}
                    color={isSelected ? COLORS.primary : '#BDBDBD'}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    maxHeight: '60%',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  optionsList: {
    paddingVertical: SPACING.sm,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    borderRadius: 12,
    marginVertical: 4,
  },
  optionItemSelected: {
    backgroundColor: '#F3F4F6',
  },
  optLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optLabel: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  optLabelSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
