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
import { PaymentProcessingModal } from './PaymentProcessingModal';
import { PaymentHistoryAndRefundModal } from './PaymentHistoryAndRefundModal';

export interface SavedCard {
  id: string;
  bankName: string;
  cardNumber: string;
  holderName: string;
  expiry: string;
  type: 'Visa' | 'Mastercard' | 'RuPay';
  bgColor: string;
}

const INITIAL_CARDS: SavedCard[] = [
  {
    id: '1',
    bankName: 'HDFC Bank Regalia',
    cardNumber: '•••• •••• •••• 4242',
    holderName: 'BOSS DEVELOPER',
    expiry: '08/28',
    type: 'Visa',
    bgColor: '#1A237E',
  },
  {
    id: '2',
    bankName: 'ICICI Sapphiro',
    cardNumber: '•••• •••• •••• 8899',
    holderName: 'BOSS DEVELOPER',
    expiry: '11/27',
    type: 'Mastercard',
    bgColor: '#B71C1C',
  },
];

const POPULAR_BANKS = [
  { id: 'sbi', name: 'State Bank of India', code: 'SBI' },
  { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
  { id: 'icici', name: 'ICICI Bank', code: 'ICICI' },
  { id: 'axis', name: 'Axis Bank', code: 'AXIS' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', code: 'KOTAK' },
  { id: 'pnb', name: 'Punjab National Bank', code: 'PNB' },
];

const WALLETS = [
  { id: 'paytm', name: 'Paytm Wallet', balance: 450, icon: 'wallet-outline' },
  { id: 'mobikwik', name: 'MobiKwik ZIP', balance: 1200, icon: 'flash-outline' },
  { id: 'amazon', name: 'Amazon Pay Balance', balance: 80, icon: 'logo-amazon' },
];

interface PaymentsScreenProps {
  onBack: () => void;
  onPaymentSuccess?: (method: string) => void;
}

type PaymentAccordion = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';

export const PaymentsScreen: React.FC<PaymentsScreenProps> = ({
  onBack,
  onPaymentSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<PaymentAccordion>('upi');
  const [cards, setCards] = useState<SavedCard[]>(INITIAL_CARDS);

  // UPI inputs
  const [upiId, setUpiId] = useState('boss@okaxis');

  // New Card inputs
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCvv, setNewCardCvv] = useState('');

  // Net banking
  const [selectedBank, setSelectedBank] = useState('hdfc');

  // COD
  const [codCaptcha, setCodCaptcha] = useState('');

  // Processing & History Modal
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMethod, setProcessingMethod] = useState('');
  const [historyModalVisible, setHistoryModalVisible] = useState(false);

  // Trigger simulated payment
  const handlePay = (methodName: string) => {
    setProcessingMethod(methodName);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert('Payment Authorized! ✅', `Transaction successful via ${methodName}`);
      onPaymentSuccess?.(methodName);
    }, 2000);
  };

  const handleAddNewCard = () => {
    if (!newCardNumber || !newCardHolder || !newCardExpiry || !newCardCvv) {
      Alert.alert('Incomplete Details', 'Please enter card number, holder name, expiry and CVV.');
      return;
    }

    const card: SavedCard = {
      id: Date.now().toString(),
      bankName: 'Custom Bank',
      cardNumber: '•••• •••• •••• ' + newCardNumber.slice(-4),
      holderName: newCardHolder.toUpperCase(),
      expiry: newCardExpiry,
      type: 'Visa',
      bgColor: '#1E293B',
    };

    setCards([card, ...cards]);
    setNewCardNumber('');
    setNewCardHolder('');
    setNewCardExpiry('');
    setNewCardCvv('');
    Alert.alert('Card Saved! 💳', 'Card saved for 1-tap fast checkouts.');
  };

  return (
    <View style={styles.screen}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments & Wallets</Text>
        <TouchableOpacity
          style={styles.historyBtn}
          onPress={() => setHistoryModalVisible(true)}>
          <Ionicons name="time-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Trust Strip */}
        <View style={styles.securityStrip}>
          <Ionicons name="shield-checkmark" size={18} color="#166534" />
          <Text style={styles.securityText}>100% Secure Payments • RBI & PCI-DSS Compliant</Text>
        </View>

        {/* 1. UPI PAYMENT METHOD */}
        <View style={styles.methodCard}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setActiveTab(activeTab === 'upi' ? ('' as any) : 'upi')}>
            <View style={styles.methodTitleRow}>
              <View style={[styles.methodIcon, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="flash" size={18} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.methodTitle}>UPI (Instant & Free)</Text>
                <Text style={styles.methodSub}>Google Pay, PhonePe, Paytm, BHIM</Text>
              </View>
            </View>
            <Ionicons
              name={activeTab === 'upi' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          {activeTab === 'upi' && (
            <View style={styles.methodBody}>
              {/* Popular UPI Apps */}
              <View style={styles.upiAppsRow}>
                {[
                  { name: 'Google Pay', icon: 'logo-google' },
                  { name: 'PhonePe', icon: 'phone-portrait-outline' },
                  { name: 'Paytm UPI', icon: 'wallet-outline' },
                ].map((app) => (
                  <TouchableOpacity
                    key={app.name}
                    style={styles.upiAppBtn}
                    onPress={() => handlePay(app.name)}>
                    <Ionicons name={app.icon as any} size={20} color={COLORS.primary} />
                    <Text style={styles.upiAppName}>{app.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.orDivider}>— OR ENTER UPI ID —</Text>

              <View style={styles.upiInputRow}>
                <TextInput
                  style={styles.upiInput}
                  placeholder="username@bank (e.g. mobile@upi)"
                  placeholderTextColor={COLORS.textSecondary}
                  value={upiId}
                  onChangeText={setUpiId}
                />
                <TouchableOpacity
                  style={styles.payBtnSmall}
                  onPress={() => handlePay(`UPI (${upiId})`)}>
                  <Text style={styles.payBtnSmallText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* 2. CREDIT & DEBIT CARDS */}
        <View style={styles.methodCard}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setActiveTab(activeTab === 'card' ? ('' as any) : 'card')}>
            <View style={styles.methodTitleRow}>
              <View style={[styles.methodIcon, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="card" size={18} color={COLORS.error} />
              </View>
              <View>
                <Text style={styles.methodTitle}>Credit / Debit Cards</Text>
                <Text style={styles.methodSub}>Visa, Mastercard, RuPay, Maestro</Text>
              </View>
            </View>
            <Ionicons
              name={activeTab === 'card' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          {activeTab === 'card' && (
            <View style={styles.methodBody}>
              {/* Saved Cards Carousel */}
              <Text style={styles.subSectionTitle}>Saved Cards</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsScroll}>
                {cards.map((c) => (
                  <View key={c.id} style={[styles.creditCard, { backgroundColor: c.bgColor }]}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardBank}>{c.bankName}</Text>
                      <Text style={styles.cardType}>{c.type}</Text>
                    </View>
                    <Text style={styles.cardNum}>{c.cardNumber}</Text>
                    <View style={styles.cardFooterRow}>
                      <View>
                        <Text style={styles.cardHolderLabel}>CARD HOLDER</Text>
                        <Text style={styles.cardHolderName}>{c.holderName}</Text>
                      </View>
                      <View>
                        <Text style={styles.cardHolderLabel}>EXPIRES</Text>
                        <Text style={styles.cardHolderName}>{c.expiry}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.cardPayBtn}
                      onPress={() => handlePay(c.bankName)}>
                      <Text style={styles.cardPayBtnText}>Pay with this Card</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              {/* Add New Card Form */}
              <Text style={styles.subSectionTitle}>Add New Credit / Debit Card</Text>
              <TextInput
                style={styles.formInput}
                placeholder="Card Number (16 Digits)"
                placeholderTextColor={COLORS.textSecondary}
                value={newCardNumber}
                onChangeText={setNewCardNumber}
                keyboardType="numeric"
                maxLength={16}
              />
              <TextInput
                style={styles.formInput}
                placeholder="Cardholder Name"
                placeholderTextColor={COLORS.textSecondary}
                value={newCardHolder}
                onChangeText={setNewCardHolder}
              />
              <View style={styles.formRow}>
                <TextInput
                  style={[styles.formInput, { flex: 1 }]}
                  placeholder="MM/YY"
                  placeholderTextColor={COLORS.textSecondary}
                  value={newCardExpiry}
                  onChangeText={setNewCardExpiry}
                  maxLength={5}
                />
                <TextInput
                  style={[styles.formInput, { flex: 1 }]}
                  placeholder="CVV (3 Digits)"
                  placeholderTextColor={COLORS.textSecondary}
                  value={newCardCvv}
                  onChangeText={setNewCardCvv}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
              <TouchableOpacity style={styles.addCardBtn} onPress={handleAddNewCard}>
                <Ionicons name="lock-closed" size={16} color="#ffffff" style={{ marginRight: 6 }} />
                <Text style={styles.addCardBtnText}>Save Card & Pay</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 3. NET BANKING */}
        <View style={styles.methodCard}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setActiveTab(activeTab === 'netbanking' ? ('' as any) : 'netbanking')}>
            <View style={styles.methodTitleRow}>
              <View style={[styles.methodIcon, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="business" size={18} color="#166534" />
              </View>
              <View>
                <Text style={styles.methodTitle}>Net Banking</Text>
                <Text style={styles.methodSub}>All Indian Banks supported</Text>
              </View>
            </View>
            <Ionicons
              name={activeTab === 'netbanking' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          {activeTab === 'netbanking' && (
            <View style={styles.methodBody}>
              <Text style={styles.subSectionTitle}>Select Your Bank</Text>
              <View style={styles.banksGrid}>
                {POPULAR_BANKS.map((b) => {
                  const isSel = selectedBank === b.id;
                  return (
                    <TouchableOpacity
                      key={b.id}
                      style={[styles.bankPill, isSel && styles.bankPillActive]}
                      onPress={() => setSelectedBank(b.id)}>
                      <Text style={[styles.bankText, isSel && styles.bankTextActive]}>
                        {b.code}
                      </Text>
                      <Text style={[styles.bankFull, isSel && styles.bankFullActive]} numberOfLines={1}>
                        {b.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity
                style={styles.addCardBtn}
                onPress={() => handlePay(`Net Banking (${selectedBank.toUpperCase()})`)}>
                <Text style={styles.addCardBtnText}>Proceed to Bank Gateway</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* 4. WALLETS */}
        <View style={styles.methodCard}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setActiveTab(activeTab === 'wallet' ? ('' as any) : 'wallet')}>
            <View style={styles.methodTitleRow}>
              <View style={[styles.methodIcon, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="wallet" size={18} color="#D97706" />
              </View>
              <View>
                <Text style={styles.methodTitle}>Digital Wallets</Text>
                <Text style={styles.methodSub}>Paytm, MobiKwik, Amazon Pay</Text>
              </View>
            </View>
            <Ionicons
              name={activeTab === 'wallet' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          {activeTab === 'wallet' && (
            <View style={styles.methodBody}>
              {WALLETS.map((w) => (
                <View key={w.id} style={styles.walletRow}>
                  <View style={styles.walletLeft}>
                    <Ionicons name={w.icon as any} size={22} color={COLORS.primary} />
                    <View>
                      <Text style={styles.walletName}>{w.name}</Text>
                      <Text style={styles.walletBal}>Available Balance: ₹{w.balance}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.payBtnSmall}
                    onPress={() => handlePay(w.name)}>
                    <Text style={styles.payBtnSmallText}>Pay</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 5. CASH ON DELIVERY */}
        <View style={styles.methodCard}>
          <TouchableOpacity
            style={styles.methodHeader}
            onPress={() => setActiveTab(activeTab === 'cod' ? ('' as any) : 'cod')}>
            <View style={styles.methodTitleRow}>
              <View style={[styles.methodIcon, { backgroundColor: '#F3F4F6' }]}>
                <Ionicons name="cash" size={18} color={COLORS.text} />
              </View>
              <View>
                <Text style={styles.methodTitle}>Cash on Delivery (COD)</Text>
                <Text style={styles.methodSub}>Pay cash at your doorstep upon arrival</Text>
              </View>
            </View>
            <Ionicons
              name={activeTab === 'cod' ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          {activeTab === 'cod' && (
            <View style={styles.methodBody}>
              <View style={styles.codNotice}>
                <Ionicons name="information-circle-outline" size={18} color={COLORS.textSecondary} />
                <Text style={styles.codNoticeText}>
                  Please keep exact change ready. A small convenience fee of ₹50 may apply on COD orders below ₹500.
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.addCardBtn, { backgroundColor: '#166534' }]}
                onPress={() => handlePay('Cash on Delivery')}>
                <Text style={styles.addCardBtnText}>Confirm Order with COD</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Payment Processing Spinner Modal */}
      <PaymentProcessingModal
        visible={isProcessing}
        method={processingMethod}
      />

      {/* Payment History & Refund Status Modal */}
      <PaymentHistoryAndRefundModal
        visible={historyModalVisible}
        onClose={() => setHistoryModalVisible(false)}
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
  historyBtn: {
    padding: 6,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  securityStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#DCFCE7',
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  securityText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#166534',
    flex: 1,
  },
  methodCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  methodTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  methodSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  methodBody: {
    padding: SPACING.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  upiAppsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.md,
    gap: 8,
  },
  upiAppBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 4,
  },
  upiAppName: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.text,
  },
  orDivider: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginVertical: 6,
  },
  upiInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  upiInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: COLORS.text,
  },
  payBtnSmall: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  payBtnSmallText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: SPACING.sm,
  },
  cardsScroll: {
    gap: 12,
    paddingBottom: 10,
  },
  creditCard: {
    width: 260,
    borderRadius: 14,
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBank: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardType: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardNum: {
    color: '#ffffff',
    fontSize: 15,
    letterSpacing: 2,
    marginVertical: 12,
    fontWeight: '600',
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolderLabel: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: 'bold',
  },
  cardHolderName: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardPayBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  cardPayBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  formInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 8,
  },
  formRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addCardBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  addCardBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  banksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  bankPill: {
    width: '31%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  bankPillActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#EEF2FF',
  },
  bankText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  bankTextActive: {
    color: COLORS.primary,
  },
  bankFull: {
    fontSize: 9,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  bankFullActive: {
    color: COLORS.primary,
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  walletName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  walletBal: {
    fontSize: 11,
    color: COLORS.success,
    marginTop: 1,
    fontWeight: '500',
  },
  codNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  codNoticeText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
});
