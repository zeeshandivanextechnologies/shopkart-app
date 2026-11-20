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
import { Address } from '../AddressesScreen';

interface AddressModalProps {
  visible: boolean;
  addressToEdit: Address | null;
  onSave: (address: Address) => void;
  onClose: () => void;
}

export const AddressFormModal: React.FC<AddressModalProps> = ({
  visible,
  addressToEdit,
  onSave,
  onClose,
}) => {
  const isEditing = Boolean(addressToEdit);

  const [name, setName] = useState(addressToEdit?.name || 'Boss (Developer)');
  const [phone, setPhone] = useState(addressToEdit?.phone || '+91 98765 43210');
  const [addressLine, setAddressLine] = useState(addressToEdit?.addressLine || '');
  const [city, setCity] = useState(addressToEdit?.city || 'Noida');
  const [state, setState] = useState(addressToEdit?.state || 'Uttar Pradesh');
  const [pincode, setPincode] = useState(addressToEdit?.pincode || '201301');
  const [tag, setTag] = useState<'Home' | 'Office' | 'Other'>(addressToEdit?.tag || 'Home');

  // Sync state on change
  React.useEffect(() => {
    if (addressToEdit) {
      setName(addressToEdit.name);
      setPhone(addressToEdit.phone);
      setAddressLine(addressToEdit.addressLine);
      setCity(addressToEdit.city);
      setState(addressToEdit.state);
      setPincode(addressToEdit.pincode);
      setTag(addressToEdit.tag);
    } else {
      setName('Boss (Developer)');
      setPhone('+91 98765 43210');
      setAddressLine('');
      setCity('Noida');
      setState('Uttar Pradesh');
      setPincode('201301');
      setTag('Home');
    }
  }, [addressToEdit, visible]);

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !addressLine.trim() || !city.trim() || !pincode.trim()) {
      Alert.alert('Required Fields', 'Please fill in all address details.');
      return;
    }

    const addr: Address = {
      id: addressToEdit?.id || Date.now().toString(),
      tag,
      name: name.trim(),
      phone: phone.trim(),
      addressLine: addressLine.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      isDefault: addressToEdit?.isDefault ?? false,
    };

    onSave(addr);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="close" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Address' : 'Add New Address'}
          </Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Address Tag Selector */}
          <Text style={styles.sectionLabel}>Address Type</Text>
          <View style={styles.tagRow}>
            {(['Home', 'Office', 'Other'] as const).map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.tagPill, tag === t && styles.tagPillActive]}
                onPress={() => setTag(t)}>
                <Ionicons
                  name={t === 'Home' ? 'home-outline' : t === 'Office' ? 'business-outline' : 'location-outline'}
                  size={16}
                  color={tag === t ? '#ffffff' : COLORS.textSecondary}
                />
                <Text style={[styles.tagText, tag === t && styles.tagTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Contact Details */}
          <Text style={styles.sectionLabel}>Contact Details</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Rahul Sharma"
              placeholderTextColor={COLORS.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+91 98765 43210"
              placeholderTextColor={COLORS.textSecondary}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Address Fields */}
          <Text style={styles.sectionLabel}>Address Details</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>House / Flat / Building No. & Street</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Flat 402, Sunshine Heights"
              placeholderTextColor={COLORS.textSecondary}
              value={addressLine}
              onChangeText={setAddressLine}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Noida"
                placeholderTextColor={COLORS.textSecondary}
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Pincode</Text>
              <TextInput
                style={styles.input}
                placeholder="201301"
                placeholderTextColor={COLORS.textSecondary}
                value={pincode}
                onChangeText={setPincode}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.fieldLabel}>State</Text>
            <TextInput
              style={styles.input}
              placeholder="Uttar Pradesh"
              placeholderTextColor={COLORS.textSecondary}
              value={state}
              onChangeText={setState}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
            <Text style={styles.saveBtnText}>
              {isEditing ? 'Update Address' : 'Save & Use This Address'}
            </Text>
          </TouchableOpacity>
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
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.md,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  tagPillActive: {
    backgroundColor: COLORS.primary,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tagTextActive: {
    color: '#ffffff',
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: 40,
  },
  saveBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
