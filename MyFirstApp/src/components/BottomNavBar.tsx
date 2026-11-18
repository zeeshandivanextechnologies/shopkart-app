import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { useCart } from '../context/CartContext';

export type TabType = 'home' | 'categories' | 'wishlist' | 'orders' | 'profile';

interface BottomNavBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { wishlist, orders } = useCart();

  const tabs: {
    key: TabType;
    label: string;
    iconName: keyof typeof Ionicons.glyphMap;
    activeIconName: keyof typeof Ionicons.glyphMap;
    badge?: number;
  }[] = [
    { key: 'home', label: 'Home', iconName: 'home-outline', activeIconName: 'home' },
    { key: 'categories', label: 'Categories', iconName: 'grid-outline', activeIconName: 'grid' },
    { key: 'wishlist', label: 'Wishlist', iconName: 'heart-outline', activeIconName: 'heart', badge: wishlist.length },
    { key: 'orders', label: 'Orders', iconName: 'bag-handle-outline', activeIconName: 'bag-handle', badge: orders.length },
    { key: 'profile', label: 'Profile', iconName: 'person-outline', activeIconName: 'person' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => onTabChange(tab.key)}
            style={styles.tabButton}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name={isActive ? tab.activeIconName : tab.iconName}
                size={22}
                color={isActive ? COLORS.primary : COLORS.textSecondary}
              />
              {tab.badge && tab.badge > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text
              style={[
                styles.label,
                { color: isActive ? COLORS.primary : COLORS.textSecondary },
                isActive && { fontWeight: 'bold' },
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 2,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    position: 'relative',
  },
  label: {
    fontSize: 11,
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
  },
});
