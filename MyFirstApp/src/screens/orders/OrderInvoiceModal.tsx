import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { Order } from '../../context/CartContext';

interface InvoiceModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

export const OrderInvoiceModal: React.FC<InvoiceModalProps> = ({
  visible,
  order,
  onClose,
}) => {
  if (!order) return null;

  const handleShareInvoice = async () => {
    try {
      await Share.share({
        message: `ShopKart Tax Invoice for Order #${order.id}\nTotal Paid: ₹${order.totalAmount}\nDate: ${order.date}\nStatus: ${order.status}`,
      });
    } catch (e) {
      Alert.alert('Share Failed', 'Unable to share invoice.');
    }
  };

  const handleDownloadInvoice = () => {
    Alert.alert('Invoice Downloaded! 📄', `Invoice #${order.id}.pdf has been saved to your downloads.`);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tax Invoice</Text>
          <TouchableOpacity onPress={handleShareInvoice} style={styles.shareBtn}>
            <Ionicons name="share-social-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Invoice Document Canvas */}
          <View style={styles.invoiceDoc}>
            {/* Header / Brand */}
            <View style={styles.docTop}>
              <View>
                <Text style={styles.brandTitle}>ShopKart India Pvt Ltd</Text>
                <Text style={styles.docSub}>GSTIN: 07AABCS1429B1Z8</Text>
                <Text style={styles.docSub}>CIN: U72900DL2024PTC389102</Text>
              </View>
              <View style={styles.invoiceTag}>
                <Text style={styles.invoiceTagText}>TAX INVOICE</Text>
              </View>
            </View>

            <View style={styles.docDivider} />

            {/* Order & Billing Info */}
            <View style={styles.metaGrid}>
              <View style={styles.metaCol}>
                <Text style={styles.metaLabel}>Invoice No:</Text>
                <Text style={styles.metaVal}>INV-{order.id.slice(0, 8).toUpperCase()}</Text>
                <Text style={[styles.metaLabel, { marginTop: 6 }]}>Invoice Date:</Text>
                <Text style={styles.metaVal}>{order.date}</Text>
              </View>

              <View style={styles.metaCol}>
                <Text style={styles.metaLabel}>Billed To:</Text>
                <Text style={styles.metaVal} numberOfLines={3}>{order.deliveryAddress}</Text>
                <Text style={[styles.metaLabel, { marginTop: 6 }]}>Payment Mode:</Text>
                <Text style={styles.metaVal}>{order.paymentMethod}</Text>
              </View>
            </View>

            <View style={styles.docDivider} />

            {/* Itemized Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.th, { flex: 2 }]}>Item Description</Text>
              <Text style={[styles.th, { flex: 0.6, textAlign: 'center' }]}>Qty</Text>
              <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Amount</Text>
            </View>

            {/* Items Rows */}
            {order.items.map((item, idx) => (
              <View key={idx} style={styles.tableRow}>
                <View style={{ flex: 2 }}>
                  <Text style={styles.tdTitle} numberOfLines={1}>{item.product.title}</Text>
                  <Text style={styles.tdSub}>HSN: 640411 • {item.selectedSize || 'Standard'}</Text>
                </View>
                <Text style={[styles.td, { flex: 0.6, textAlign: 'center' }]}>{item.quantity}</Text>
                <Text style={[styles.td, { flex: 1, textAlign: 'right', fontWeight: 'bold' }]}>
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </Text>
              </View>
            ))}

            <View style={styles.docDivider} />

            {/* Calculations Breakdown */}
            <View style={styles.summaryWrap}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Sub Total:</Text>
                <Text style={styles.summaryVal}>₹{Math.round(order.totalAmount * 0.82)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>IGST (18% Integrated Tax):</Text>
                <Text style={styles.summaryVal}>₹{Math.round(order.totalAmount * 0.18)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping & Delivery:</Text>
                <Text style={[styles.summaryVal, { color: COLORS.success }]}>FREE</Text>
              </View>

              <View style={[styles.summaryRow, styles.grandTotalRow]}>
                <Text style={styles.grandTotalLabel}>Grand Total (INR):</Text>
                <Text style={styles.grandTotalVal}>₹{order.totalAmount.toLocaleString('en-IN')}</Text>
              </View>
            </View>

            {/* Footer Disclaimer */}
            <View style={styles.docFooter}>
              <Text style={styles.footerNote}>
                This is a computer-generated tax invoice and does not require a physical signature.
              </Text>
            </View>
          </View>

          {/* Download Button */}
          <TouchableOpacity style={styles.downloadBtn} onPress={handleDownloadInvoice}>
            <Ionicons name="download-outline" size={20} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.downloadBtnText}>Download PDF Invoice</Text>
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
  shareBtn: {
    padding: 6,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  invoiceDoc: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
  },
  docTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  docSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  invoiceTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  invoiceTagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  docDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 14,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  metaVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 8,
    borderRadius: 6,
  },
  th: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tdTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  tdSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  td: {
    fontSize: 12,
    color: COLORS.text,
  },
  summaryWrap: {
    paddingLeft: '30%',
    gap: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  summaryVal: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 8,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  grandTotalVal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  docFooter: {
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    alignItems: 'center',
  },
  footerNote: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  downloadBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: SPACING.lg,
  },
  downloadBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
