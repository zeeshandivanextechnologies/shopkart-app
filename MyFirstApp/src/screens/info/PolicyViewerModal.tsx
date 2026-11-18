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

export type PolicyType =
  | 'privacy'
  | 'terms'
  | 'return'
  | 'refund'
  | 'shipping'
  | 'cancellation'
  | 'grievance';

interface PolicyModalProps {
  visible: boolean;
  type: PolicyType;
  onClose: () => void;
}

const POLICY_DATA: Record<
  PolicyType,
  { title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap; sections: { heading: string; body: string }[] }
> = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Last updated: 18 November 2026',
    icon: 'shield-checkmark-outline',
    sections: [
      {
        heading: '1. Information We Collect',
        body: 'We collect personal information that you provide to us directly such as your name, mobile phone number, shipping address, and email when creating an account or placing an order.',
      },
      {
        heading: '2. Payment Security',
        body: 'All payment transactions are encrypted using 256-bit SSL encryption. We do not store full credit/debit card numbers or CVV codes on our servers.',
      },
      {
        heading: '3. Data Sharing & Third Parties',
        body: 'We only share necessary shipping data with verified logistics partners (such as BlueDart and Delhivery) to facilitate the physical delivery of your purchases.',
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    subtitle: 'User Agreement & Platform Guidelines',
    icon: 'document-text-outline',
    sections: [
      {
        heading: '1. Account Eligibility',
        body: 'By accessing or using ShopKart, you certify that you are at least 18 years of age and competent to enter into a legally binding contract.',
      },
      {
        heading: '2. Product Pricing & Availability',
        body: 'All product prices are quoted in Indian Rupees (INR) and are inclusive of applicable GST taxes. Prices and discounts are subject to change without prior notice.',
      },
      {
        heading: '3. Intellectual Property',
        body: 'All logos, graphics, brand trademarks, and application code are the exclusive intellectual property of ShopKart India Pvt Ltd.',
      },
    ],
  },
  return: {
    title: 'Return Policy',
    subtitle: '7 Days Hassle-Free Returns',
    icon: 'refresh-outline',
    sections: [
      {
        heading: '1. Eligible Return Window',
        body: 'Most products including shoes, fashion apparel, and accessories are eligible for return within 7 calendar days from the date of physical delivery.',
      },
      {
        heading: '2. Item Condition',
        body: 'Returned items must be unused, unwashed, and in their original packaging with all manufacturer tags and barcodes attached.',
      },
      {
        heading: '3. Free Doorstep Pickup',
        body: 'Our courier agent will visit your registered delivery address to inspect and pick up the return package at zero additional fee.',
      },
    ],
  },
  refund: {
    title: 'Refund Policy',
    subtitle: 'Instant & Direct Bank Crediting',
    icon: 'cash-outline',
    sections: [
      {
        heading: '1. Refund Processing Time',
        body: 'Once a returned item passes doorstep verification, refunds are triggered immediately and credited to the original payment source within 24 to 48 business hours.',
      },
      {
        heading: '2. UPI & Card Refunds',
        body: 'UPI and Wallet refunds reflect instantly. Credit Card and Debit Card bank settlements typically take 2-4 banking business days depending on your bank.',
      },
      {
        heading: '3. Cash on Delivery (COD) Orders',
        body: 'For COD returns, refunds are credited directly to your ShopKart Wallet or transferred via IMPS/NEFT to your verified bank account.',
      },
    ],
  },
  shipping: {
    title: 'Shipping & Delivery Policy',
    subtitle: 'Nationwide Ultra-Fast Logistics',
    icon: 'car-outline',
    sections: [
      {
        heading: '1. Free Delivery Threshold',
        body: 'All orders with a cart value exceeding ₹999 qualify for 100% FREE standard delivery across 26,000+ Indian pincodes.',
      },
      {
        heading: '2. Express 1-Day Delivery',
        body: 'Express rush delivery is available in major metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad) for a nominal ₹99 fee.',
      },
      {
        heading: '3. Shipment Tracking',
        body: 'A live tracking link with courier partner AWB number is sent via SMS and WhatsApp as soon as your parcel is dispatched from our fulfillment center.',
      },
    ],
  },
  cancellation: {
    title: 'Cancellation Policy',
    subtitle: 'Zero Penalty Easy Cancellation',
    icon: 'close-circle-outline',
    sections: [
      {
        heading: '1. Pre-Dispatch Cancellation',
        body: 'You may cancel any order before it is dispatched from our warehouse at zero penalty or deduction through the My Orders tab.',
      },
      {
        heading: '2. In-Transit Orders',
        body: 'If the order has already been shipped, you can simply refuse the delivery at your doorstep when the delivery partner arrives.',
      },
      {
        heading: '3. Immediate 100% Refund',
        body: 'Any prepaid amount will be refunded back 100% into your original account upon cancellation confirmation.',
      },
    ],
  },
  grievance: {
    title: 'Grievance Redressal',
    subtitle: 'Statutory Consumer Protection Compliance',
    icon: 'ribbon-outline',
    sections: [
      {
        heading: 'Grievance Officer Details',
        body: 'Name: Rajeshwar Rao\nDesignation: Head of Consumer Grievances\nEmail: grievance-officer@shopkart.in\nPhone: 0124-4902810 (Mon - Fri, 10 AM - 6 PM)',
      },
      {
        heading: 'Resolution Timeline',
        body: 'As mandated by Consumer Protection (E-Commerce) Rules, all customer grievances are officially acknowledged within 48 hours and resolved within 15 days.',
      },
    ],
  },
};

export const PolicyViewerModal: React.FC<PolicyModalProps> = ({
  visible,
  type,
  onClose,
}) => {
  const policy = POLICY_DATA[type] || POLICY_DATA.privacy;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{policy.title}</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Hero Banner */}
          <View style={styles.heroBanner}>
            <View style={styles.iconWrap}>
              <Ionicons name={policy.icon} size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.bannerTitle}>{policy.title}</Text>
            <Text style={styles.bannerSub}>{policy.subtitle}</Text>
          </View>

          {/* Policy Sections */}
          {policy.sections.map((sec, idx) => (
            <View key={idx} style={styles.sectionCard}>
              <Text style={styles.heading}>{sec.heading}</Text>
              <Text style={styles.body}>{sec.body}</Text>
            </View>
          ))}
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  heroBanner: {
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  bannerSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: SPACING.md,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 6,
  },
  body: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
});
