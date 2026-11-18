import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { LiveChatModal } from './LiveChatModal';

interface SupportScreenProps {
  onBack: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({ onBack }) => {
  const [ticketQuery, setTicketQuery] = useState('');
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const [liveChatVisible, setLiveChatVisible] = useState(false);

  const faqs = [
    {
      q: 'How do I track my delivery status?',
      a: 'Go to the Orders tab at the bottom to check live 5-step GPS courier tracking of your purchases.',
    },
    {
      q: 'What is the return and refund policy?',
      a: 'We offer 7-day hassle-free returns. Refunds are processed to the source bank account within 24 hours of item pickup.',
    },
    {
      q: 'Can I cancel an order after placing it?',
      a: 'Yes, you can cancel before the item is shipped from the warehouse with an immediate 100% refund.',
    },
    {
      q: 'How do I use promo coupons on checkout?',
      a: 'Enter code "SAVE200" or pick from available offers in the Shopping Bag to get an instant deduction.',
    },
  ];

  const handleSendTicket = () => {
    if (!ticketQuery.trim()) {
      Alert.alert('Empty Message', 'Please write your query before sending.');
      return;
    }
    Alert.alert(
      'Support Ticket Created! 🎫',
      `Ticket #TKT-${Math.floor(1000 + Math.random() * 9000)} created. A representative will contact you within 2 hours.`
    );
    setTicketQuery('');
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & 24x7 Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Quick Contact Hub Cards */}
        <View style={styles.contactRow}>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Alert.alert('Toll Free Support', 'Calling 1800-746-7527 (Toll Free)...')}>
            <Ionicons name="call-outline" size={26} color={COLORS.primary} />
            <Text style={styles.contactTitle}>Call Us</Text>
            <Text style={styles.contactSub}>1800-746-7527</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => setLiveChatVisible(true)}>
            <Ionicons name="chatbubbles-outline" size={26} color={COLORS.success} />
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactSub}>Instant reply ⚡</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => Alert.alert('Email Support', 'Opening mail to support@shopkart.in')}>
            <Ionicons name="mail-outline" size={26} color={COLORS.secondary} />
            <Text style={styles.contactTitle}>Email Us</Text>
            <Text style={styles.contactSub}>support@shopkart.in</Text>
          </TouchableOpacity>
        </View>

        {/* Live Chat Banner */}
        <TouchableOpacity
          style={styles.chatBanner}
          onPress={() => setLiveChatVisible(true)}>
          <View style={styles.chatBannerLeft}>
            <Ionicons name="headset" size={26} color="#ffffff" />
            <View>
              <Text style={styles.chatBannerTitle}>Chat with Customer Care</Text>
              <Text style={styles.chatBannerSub}>Online now • Dedicated agent ready to assist</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ffffff" />
        </TouchableOpacity>

        {/* Frequently Asked Questions */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, idx) => {
            const isExpanded = faqExpanded === idx;
            return (
              <View key={idx} style={styles.faqItem}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => setFaqExpanded(isExpanded ? null : idx)}>
                  <Text style={styles.faqQuestion}>{faq.q}</Text>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={COLORS.textSecondary}
                  />
                </TouchableOpacity>
                {isExpanded && <Text style={styles.faqAnswer}>{faq.a}</Text>}
              </View>
            );
          })}
        </View>

        {/* Create Support Ticket Form */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Write to Us</Text>
          <Text style={styles.formSub}>
            Can't find what you need? Describe your issue below:
          </Text>
          <TextInput
            style={styles.ticketInput}
            placeholder="Type your question, issue or order reference here..."
            placeholderTextColor={COLORS.textSecondary}
            value={ticketQuery}
            onChangeText={setTicketQuery}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={handleSendTicket}>
            <Text style={styles.submitBtnText}>Submit Query Ticket</Text>
          </TouchableOpacity>
        </View>

        {/* Corporate Office & Contact Details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Corporate Headquarters</Text>
          <View style={styles.contactInfoRow}>
            <Ionicons name="location-outline" size={18} color={COLORS.primary} />
            <Text style={styles.contactInfoText}>
              ShopKart Tower, Plot 14, Cyber City Phase 2, Gurugram, HR - 122002
            </Text>
          </View>
          <View style={styles.contactInfoRow}>
            <Ionicons name="time-outline" size={18} color={COLORS.primary} />
            <Text style={styles.contactInfoText}>Support Hours: 24 Hours, 7 Days a week</Text>
          </View>
        </View>
      </ScrollView>

      {/* Live Two-Way Chat Modal */}
      <LiveChatModal
        visible={liveChatVisible}
        onClose={() => setLiveChatVisible(false)}
      />
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
  scroll: {
    padding: SPACING.md,
    paddingBottom: 40,
    gap: 12,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
  },
  contactCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 6,
  },
  contactSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  chatBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 14,
  },
  chatBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chatBannerTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chatBannerSub: {
    color: '#C7D2FE',
    fontSize: 11,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 10,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 6,
    lineHeight: 18,
  },
  formSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  ticketInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    fontSize: 13,
    color: COLORS.text,
    height: 85,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  contactInfoText: {
    fontSize: 12,
    color: '#4B5563',
    flex: 1,
    lineHeight: 16,
  },
});
