import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { PolicyViewerModal, PolicyType } from './PolicyViewerModal';
import { FeedbackAndReportModal } from './FeedbackAndReportModal';

interface AboutUsScreenProps {
  onBack: () => void;
}

export const AboutUsScreen: React.FC<AboutUsScreenProps> = ({ onBack }) => {
  const [policyType, setPolicyType] = useState<PolicyType | null>(null);
  const [feedbackType, setFeedbackType] = useState<'problem' | 'feedback' | 'rate' | null>(null);

  const stats = [
    { number: '10M+', label: 'Happy Customers' },
    { number: '26,000+', label: 'Pincodes Covered' },
    { number: '5,000+', label: 'Verified Brands' },
    { number: '24/7', label: 'Customer Care' },
  ];

  const legalLinks: { id: PolicyType; title: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'privacy', title: 'Privacy Policy', icon: 'shield-checkmark-outline' },
    { id: 'terms', title: 'Terms & Conditions', icon: 'document-text-outline' },
    { id: 'return', title: '7 Days Return Policy', icon: 'refresh-outline' },
    { id: 'refund', title: 'Refund Policy', icon: 'cash-outline' },
    { id: 'shipping', title: 'Shipping & Delivery Policy', icon: 'car-outline' },
    { id: 'cancellation', title: 'Cancellation Policy', icon: 'close-circle-outline' },
    { id: 'grievance', title: 'Grievance Redressal Officer', icon: 'ribbon-outline' },
  ];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About ShopKart</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Brand Mission Hero */}
        <View style={styles.heroBox}>
          <Text style={styles.brandName}>ShopKart</Text>
          <Text style={styles.heroTagline}>India's Fastest Growing E-Commerce Destination</Text>
          <Text style={styles.heroDescription}>
            Founded with a vision to democratize brand commerce across India. We deliver authentic 100% genuine products with ultra-fast doorstep delivery and seamless digital payments.
          </Text>
        </View>

        {/* Milestone Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((s, idx) => (
            <View key={idx} style={styles.statCard}>
              <Text style={styles.statNum}>{s.number}</Text>
              <Text style={styles.statLbl}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Feedback & Interaction CTAs */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setFeedbackType('rate')}>
            <Ionicons name="star" size={20} color="#F59E0B" />
            <Text style={styles.actionBtnText}>Rate App</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setFeedbackType('feedback')}>
            <Ionicons name="chatbox-ellipses" size={20} color={COLORS.primary} />
            <Text style={styles.actionBtnText}>Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setFeedbackType('problem')}>
            <Ionicons name="bug" size={20} color={COLORS.error} />
            <Text style={styles.actionBtnText}>Report Bug</Text>
          </TouchableOpacity>
        </View>

        {/* Legal Policies Hub */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>Legal Policies & Consumer Guidelines</Text>
          {legalLinks.map((link) => (
            <TouchableOpacity
              key={link.id}
              style={styles.linkRow}
              onPress={() => setPolicyType(link.id)}>
              <View style={styles.linkLeft}>
                <Ionicons name={link.icon} size={20} color={COLORS.primary} />
                <Text style={styles.linkTitle}>{link.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.copyrightText}>
          © 2026 ShopKart India Pvt Ltd. All rights reserved.
        </Text>
      </ScrollView>

      {/* Policy Viewer Modal */}
      {policyType && (
        <PolicyViewerModal
          visible={Boolean(policyType)}
          type={policyType}
          onClose={() => setPolicyType(null)}
        />
      )}

      {/* Feedback & Bug Reporting Modal */}
      {feedbackType && (
        <FeedbackAndReportModal
          visible={Boolean(feedbackType)}
          type={feedbackType}
          onClose={() => setFeedbackType(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 40,
    gap: 12,
  },
  heroBox: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: SPACING.lg,
  },
  brandName: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  heroTagline: {
    color: '#E0E7FF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  heroDescription: {
    color: '#C7D2FE',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  statNum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLbl: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 4,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
  },
  copyrightText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 10,
  },
});
