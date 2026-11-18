import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart, Order } from '../../context/CartContext';
import { COLORS, SPACING } from '../../constants/theme';
import { Address } from '../AddressesScreen';
import { AddressFormModal } from './AddressFormModal';
import { OrderResultModal } from './OrderResultModal';

const INITIAL_SAVED_ADDRESSES: Address[] = [
  {
    id: '1',
    tag: 'Home',
    name: 'Boss (Developer)',
    phone: '+91 98765 43210',
    addressLine: 'Flat 402, Sunshine Heights, Sector 62',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    isDefault: true,
  },
  {
    id: '2',
    tag: 'Office',
    name: 'Boss (Work Desk)',
    phone: '+91 98765 43210',
    addressLine: 'Plot 14, Cyber Hub, Phase 2, DLF',
    city: 'Gurugram',
    state: 'Haryana',
    pincode: '122002',
    isDefault: false,
  },
];

interface CheckoutScreenProps {
  onBack: () => void;
  onOrderSuccess: (order: Order) => void;
  onExplore: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onBack,
  onOrderSuccess,
  onExplore,
}) => {
  const { cart, totalAmount, totalDiscount, placeOrder } = useCart();

  // Addresses State
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_SAVED_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  // Delivery & Billing Options
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>('Leave at door');
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');

  // Order Result State
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [resultType, setResultType] = useState<'success' | 'failed'>('success');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const deliveryCharge = deliverySpeed === 'express' ? 99 : totalAmount > 999 ? 0 : 70;
  const finalTotal = totalAmount + deliveryCharge;

  // Handle Place Order
  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      Alert.alert('Address Missing', 'Please select a delivery address to proceed.');
      return;
    }

    try {
      const fullAddressString = `${selectedAddress.name}, ${selectedAddress.addressLine}, ${selectedAddress.city} - ${selectedAddress.pincode} (${selectedAddress.tag}) | Instructions: ${deliveryInstructions}`;
      const order = placeOrder(fullAddressString, paymentMethod);
      setPlacedOrder(order);
      setResultType('success');
      setResultModalVisible(true);
      onOrderSuccess(order);
    } catch (e) {
      setResultType('failed');
      setResultModalVisible(true);
    }
  };

  return (
    <View style={styles.screen}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Step Indicator */}
        <View style={styles.stepRow}>
          <View style={styles.stepItem}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
            <Text style={styles.stepTextActive}>1. Address</Text>
          </View>
          <Text style={styles.stepDivider}>➔</Text>
          <View style={styles.stepItem}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
            <Text style={styles.stepTextActive}>2. Delivery</Text>
          </View>
          <Text style={styles.stepDivider}>➔</Text>
          <View style={styles.stepItem}>
            <Ionicons name="radio-button-on" size={16} color={COLORS.primary} />
            <Text style={styles.stepTextActive}>3. Payment</Text>
          </View>
        </View>

        {/* 1. SELECT & MANAGE ADDRESS SECTION */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <View style={styles.titleWithIcon}>
              <Ionicons name="location-outline" size={20} color={COLORS.primary} />
              <Text style={styles.cardTitle}>Delivery Address</Text>
            </View>
            <TouchableOpacity
              style={styles.addAddrLink}
              onPress={() => {
                setEditingAddress(null);
                setAddressModalVisible(true);
              }}>
              <Ionicons name="add" size={16} color={COLORS.primary} />
              <Text style={styles.addAddrText}>Add New</Text>
            </TouchableOpacity>
          </View>

          {addresses.map((addr) => {
            const isSelected = selectedAddressId === addr.id;
            return (
              <TouchableOpacity
                key={addr.id}
                style={[styles.addressItem, isSelected && styles.addressItemSelected]}
                onPress={() => setSelectedAddressId(addr.id)}>
                <View style={styles.addressLeft}>
                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={isSelected ? COLORS.primary : '#9E9E9E'}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={styles.addrHeaderRow}>
                      <Text style={styles.addrName}>{addr.name}</Text>
                      <View style={styles.tagBadge}>
                        <Text style={styles.tagBadgeText}>{addr.tag}</Text>
                      </View>
                    </View>
                    <Text style={styles.addrLine}>{addr.addressLine}, {addr.city} - {addr.pincode}</Text>
                    <Text style={styles.addrPhone}>Phone: {addr.phone}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => {
                    setEditingAddress(addr);
                    setAddressModalVisible(true);
                  }}>
                  <Ionicons name="pencil" size={16} color={COLORS.primary} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 2. SELECT DELIVERY SPEED & OPTIONS */}
        <View style={styles.card}>
          <View style={styles.titleWithIcon}>
            <Ionicons name="car-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Delivery Options</Text>
          </View>

          <TouchableOpacity
            style={[styles.deliveryOption, deliverySpeed === 'standard' && styles.deliveryOptionActive]}
            onPress={() => setDeliverySpeed('standard')}>
            <Ionicons
              name={deliverySpeed === 'standard' ? 'radio-button-on' : 'radio-button-off'}
              size={18}
              color={deliverySpeed === 'standard' ? COLORS.primary : '#9E9E9E'}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.deliveryOptTitle}>Standard Delivery (2-3 Days)</Text>
              <Text style={styles.deliveryOptSub}>Trusted doorstep delivery by BlueDart</Text>
            </View>
            <Text style={styles.deliveryOptPrice}>
              {totalAmount > 999 ? 'FREE' : '₹70'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deliveryOption, deliverySpeed === 'express' && styles.deliveryOptionActive]}
            onPress={() => setDeliverySpeed('express')}>
            <Ionicons
              name={deliverySpeed === 'express' ? 'radio-button-on' : 'radio-button-off'}
              size={18}
              color={deliverySpeed === 'express' ? COLORS.primary : '#9E9E9E'}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.deliveryOptTitle}>Express 1-Day Rush Delivery ⚡</Text>
              <Text style={styles.deliveryOptSub}>Guaranteed delivery within 24 hours</Text>
            </View>
            <Text style={styles.deliveryOptPrice}>₹99</Text>
          </TouchableOpacity>
        </View>

        {/* 3. DELIVERY INSTRUCTIONS */}
        <View style={styles.card}>
          <View style={styles.titleWithIcon}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Delivery Instructions</Text>
          </View>

          <View style={styles.instructionChips}>
            {[
              'Leave at door',
              'Ring bell twice',
              'Do not disturb (baby asleep)',
              'Leave with security / guard',
            ].map((inst) => {
              const active = deliveryInstructions === inst;
              return (
                <TouchableOpacity
                  key={inst}
                  style={[styles.instPill, active && styles.instPillActive]}
                  onPress={() => setDeliveryInstructions(inst)}>
                  <Text style={[styles.instText, active && styles.instTextActive]}>{inst}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* 4. BILLING ADDRESS CHECK */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.billingRow}
            onPress={() => setSameAsShipping(!sameAsShipping)}>
            <Ionicons
              name={sameAsShipping ? 'checkbox' : 'square-outline'}
              size={22}
              color={sameAsShipping ? COLORS.primary : '#9E9E9E'}
            />
            <Text style={styles.billingText}>Billing address is same as delivery address</Text>
          </TouchableOpacity>
        </View>

        {/* 5. SELECT PAYMENT METHOD */}
        <View style={styles.card}>
          <View style={styles.titleWithIcon}>
            <Ionicons name="card-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Select Payment Method</Text>
          </View>

          {[
            { id: 'UPI', label: 'UPI / Google Pay / PhonePe', icon: 'flash' },
            { id: 'Card', label: 'Credit / Debit Card / Netbanking', icon: 'card' },
            { id: 'COD', label: 'Cash on Delivery (Pay at Door)', icon: 'cash' },
          ].map((m) => {
            const isSel = paymentMethod === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                style={[styles.paymentOption, isSel && styles.paymentOptionActive]}
                onPress={() => setPaymentMethod(m.id as any)}>
                <Ionicons
                  name={isSel ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={isSel ? COLORS.primary : '#9E9E9E'}
                />
                <Text style={styles.paymentOptionLabel}>{m.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 6. ORDER REVIEW ITEM CARDS */}
        <View style={styles.card}>
          <View style={styles.titleWithIcon}>
            <Ionicons name="bag-check-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Order Items Review ({cart.length})</Text>
          </View>

          {cart.map((item) => (
            <View key={item.product.id} style={styles.reviewItemRow}>
              <Image source={{ uri: item.product.image }} style={styles.reviewItemImg} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.reviewItemTitle} numberOfLines={1}>{item.product.title}</Text>
                <Text style={styles.reviewItemMeta}>Qty: {item.quantity} • {item.selectedSize || 'Standard'}</Text>
                <Text style={styles.reviewItemPrice}>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Place Order Bottom Bar */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerTotalLabel}>Total Amount</Text>
          <Text style={styles.footerTotalValue}>₹{finalTotal.toLocaleString('en-IN')}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order & Pay</Text>
          <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Add / Edit Address Modal */}
      <AddressFormModal
        visible={addressModalVisible}
        addressToEdit={editingAddress}
        onSave={(newAddr) => {
          setAddresses((prev) => {
            const exists = prev.find((a) => a.id === newAddr.id);
            if (exists) {
              return prev.map((a) => (a.id === newAddr.id ? newAddr : a));
            }
            return [newAddr, ...prev];
          });
          setSelectedAddressId(newAddr.id);
        }}
        onClose={() => setAddressModalVisible(false)}
      />

      {/* Order Success / Failure Modal */}
      <OrderResultModal
        visible={resultModalVisible}
        type={resultType}
        order={placedOrder}
        onContinueShopping={() => {
          setResultModalVisible(false);
          onExplore();
        }}
        onViewOrders={() => {
          setResultModalVisible(false);
          onBack();
        }}
        onRetryPayment={() => {
          setResultModalVisible(false);
          handlePlaceOrder();
        }}
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scroll: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 14,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepTextActive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  stepDivider: {
    color: '#D1D5DB',
    fontSize: 12,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addAddrLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addAddrText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  addressItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#EEF2FF',
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  addrHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addrName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  tagBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  addrLine: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 2,
  },
  addrPhone: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  editBtn: {
    padding: 6,
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 8,
  },
  deliveryOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#EEF2FF',
  },
  deliveryOptTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  deliveryOptSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  deliveryOptPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  instructionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  instPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  instPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  instText: {
    fontSize: 12,
    color: COLORS.text,
  },
  instTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  billingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  billingText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '500',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: SPACING.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 8,
  },
  paymentOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#EEF2FF',
  },
  paymentOptionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  reviewItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  reviewItemImg: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  reviewItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  reviewItemMeta: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  reviewItemPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  footerTotalLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  footerTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  placeOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 12,
  },
  placeOrderText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
