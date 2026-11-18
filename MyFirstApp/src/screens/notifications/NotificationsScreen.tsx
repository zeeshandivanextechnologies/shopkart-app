import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';
import { NotificationPreferencesModal } from './NotificationPreferencesModal';
import { NotificationDetailsModal } from './NotificationDetailsModal';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'offer' | 'order' | 'promotional';
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Flash Sale Live Now! 🔥',
    message: 'Flat 50% discount on Nike shoes and audio accessories. Offer ends at midnight.',
    time: '10 mins ago',
    type: 'offer',
    read: false,
  },
  {
    id: '2',
    title: 'Order Confirmed 📦',
    message: 'Your order #ORD-849201 has been packed and is ready to dispatch via BlueDart.',
    time: '2 hours ago',
    type: 'order',
    read: false,
  },
  {
    id: '3',
    title: 'SuperCoins Credited ⭐',
    message: 'Congratulations! 100 bonus SuperCoins have been added to your profile wallet.',
    time: 'Yesterday',
    type: 'promotional',
    read: true,
  },
  {
    id: '4',
    title: 'Price Drop Alert 📉',
    message: 'Sony WH-1000XM5 in your wishlist is now ₹5,000 cheaper today!',
    time: '2 days ago',
    type: 'offer',
    read: true,
  },
  {
    id: '5',
    title: 'Out for Delivery 🚚',
    message: 'Your courier executive is out for delivery. Keep OTP 4092 ready.',
    time: '3 days ago',
    type: 'order',
    read: true,
  },
];

interface NotificationsScreenProps {
  onBack: () => void;
  onExploreDeals?: () => void;
  onViewOrders?: () => void;
}

type TabFilter = 'all' | 'order' | 'offer' | 'promotional';

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
  onExploreDeals,
  onViewOrders,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [preferencesVisible, setPreferencesVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'offer':
        return 'pricetag-outline';
      case 'order':
        return 'cube-outline';
      case 'promotional':
        return 'sparkles-outline';
    }
  };

  return (
    <View style={styles.screen}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setPreferencesVisible(true)} style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markReadText}>Read All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Filter Tabs */}
      <View style={styles.filterStrip}>
        {[
          { id: 'all', label: 'All' },
          { id: 'order', label: 'Orders' },
          { id: 'offer', label: 'Offers & Deals' },
          { id: 'promotional', label: 'Promotions' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.filterChip, activeTab === tab.id && styles.filterChipActive]}
            onPress={() => setActiveTab(tab.id as any)}>
            <Text style={[styles.filterChipText, activeTab === tab.id && styles.filterChipTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={60} color="#BDBDBD" />
          <Text style={styles.emptyTitle}>No Notifications Found</Text>
          <Text style={styles.emptySub}>We will notify you about your order updates and special deals here.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.itemCard, !item.read && styles.unreadCard]}
              onPress={() => {
                setNotifications((prev) =>
                  prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
                );
                setSelectedNotification(item);
              }}>
              <View style={[styles.iconBox, !item.read && styles.unreadIconBox]}>
                <Ionicons
                  name={getIcon(item.type) as any}
                  size={20}
                  color={!item.read ? COLORS.primary : COLORS.textSecondary}
                />
              </View>

              <View style={styles.contentBox}>
                <View style={styles.titleRow}>
                  <Text style={[styles.title, !item.read && styles.unreadText]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {!item.read && <View style={styles.dot} />}
                </View>

                <Text style={styles.message} numberOfLines={2}>
                  {item.message}
                </Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Notification Details Modal */}
      <NotificationDetailsModal
        visible={Boolean(selectedNotification)}
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onAction={() => {
          if (selectedNotification?.type === 'offer') onExploreDeals?.();
          if (selectedNotification?.type === 'order') onViewOrders?.();
        }}
      />

      {/* Communication Preferences Settings Modal */}
      <NotificationPreferencesModal
        visible={preferencesVisible}
        onClose={() => setPreferencesVisible(false)}
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  markReadText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  filterStrip: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  list: {
    padding: SPACING.md,
    gap: 10,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
  },
  unreadCard: {
    borderColor: '#C7D2FE',
    backgroundColor: '#FAF5FF',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadIconBox: {
    backgroundColor: '#EEF2FF',
  },
  contentBox: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
  },
  unreadText: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  message: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginVertical: 4,
    lineHeight: 16,
  },
  time: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
});
