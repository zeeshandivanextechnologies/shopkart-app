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
import { COLORS, SPACING } from '../constants/theme';

export interface Address {
  id: string;
  tag: 'Home' | 'Office' | 'Other';
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: Address[] = [
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

interface AddressesScreenProps {
  onBack: () => void;
}

export const AddressesScreen: React.FC<AddressesScreenProps> = ({ onBack }) => {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [tag, setTag] = useState<'Home' | 'Office' | 'Other'>('Home');

  const handleAddAddress = () => {
    if (!name || !phone || !addressLine || !city || !pincode) {
      Alert.alert('Required Fields', 'Please fill all details.');
      return;
    }
    const newAddr: Address = {
      id: Date.now().toString(),
      tag,
      name,
      phone,
      addressLine,
      city,
      state: 'Delhi NCR',
      pincode,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, newAddr]);
    setShowForm(false);
    setName('');
    setPhone('');
    setAddressLine('');
    setCity('');
    setPincode('');
    Alert.alert('Address Saved', 'New delivery address successfully added!');
  };

  const setDefault = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowForm(!showForm)}>
          <Ionicons name={showForm ? 'close-outline' : 'add-circle-outline'} size={22} color={COLORS.primary} />
          <Text style={styles.addBtnText}>{showForm ? 'Cancel Form' : 'Add New Address'}</Text>
        </TouchableOpacity>

        {/* Address Input Form */}
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Add Delivery Address</Text>
            
            <View style={styles.tagRow}>
              {(['Home', 'Office', 'Other'] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTag(t)}
                  style={[styles.tagPill, tag === t && styles.tagPillActive]}>
                  <Text style={[styles.tagPillText, tag === t && styles.tagPillTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              placeholder="Full Name *"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Mobile Number *"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="House No, Building, Street *"
              value={addressLine}
              onChangeText={setAddressLine}
              style={styles.input}
            />
            <View style={styles.row}>
              <TextInput
                placeholder="City *"
                value={city}
                onChangeText={setCity}
                style={[styles.input, { flex: 1 }]}
              />
              <TextInput
                placeholder="Pincode *"
                value={pincode}
                onChangeText={setPincode}
                keyboardType="numeric"
                style={[styles.input, { flex: 1 }]}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleAddAddress}>
              <Text style={styles.saveBtnText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Saved Address List */}
        {addresses.map((item) => (
          <View key={item.id} style={styles.addrCard}>
            <View style={styles.addrTop}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagBadgeText}>{item.tag.toUpperCase()}</Text>
              </View>
              {item.isDefault ? (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>DEFAULT</Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.addrName}>{item.name}</Text>
            <Text style={styles.addrLine}>{item.addressLine}</Text>
            <Text style={styles.addrCity}>
              {item.city}, {item.state} - {item.pincode}
            </Text>
            <Text style={styles.addrPhone}>Phone: {item.phone}</Text>

            <View style={styles.divider} />

            <View style={styles.addrActions}>
              {!item.isDefault && (
                <TouchableOpacity onPress={() => setDefault(item.id)}>
                  <Text style={styles.actionText}>Make Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => deleteAddress(item.id)} style={{ marginLeft: 'auto' }}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    elevation: 2,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  scroll: { padding: SPACING.lg, gap: SPACING.md },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    gap: 8,
  },
  addBtnText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 14 },
  formCard: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 12,
    gap: 10,
    elevation: 2,
  },
  formTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  tagRow: { flexDirection: 'row', gap: 8 },
  tagPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
  },
  tagPillActive: { backgroundColor: COLORS.primary },
  tagPillText: { fontSize: 12, color: COLORS.text, fontWeight: '500' },
  tagPillTextActive: { color: '#ffffff', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 13,
  },
  row: { flexDirection: 'row', gap: 10 },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  addrCard: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 12,
    elevation: 1,
  },
  addrTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  tagBadge: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagBadgeText: { fontSize: 10, fontWeight: 'bold', color: COLORS.primary },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  defaultText: { fontSize: 10, fontWeight: 'bold', color: COLORS.success },
  addrName: { fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  addrLine: { fontSize: 13, color: '#444', lineHeight: 18 },
  addrCity: { fontSize: 13, color: '#444', marginTop: 2 },
  addrPhone: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },
  addrActions: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  deleteText: { fontSize: 13, color: COLORS.error, fontWeight: '600' },
});
