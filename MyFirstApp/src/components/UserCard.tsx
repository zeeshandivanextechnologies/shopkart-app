import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Avatar, Chip } from 'react-native-paper';
import { COLORS, SPACING } from '../constants/theme';

interface UserCardProps {
  name: string;
  role: string;
  skills: string[];
}

export const UserCard: React.FC<UserCardProps> = ({ name, role, skills }) => {
  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Title
        title={name}
        subtitle={role}
        titleVariant="titleLarge"
        left={(props) => (
          <Avatar.Text
            {...props}
            label={name.substring(0, 2).toUpperCase()}
            style={{ backgroundColor: COLORS.primary }}
          />
        )}
      />
      <Card.Content>
        <Text variant="bodyMedium" style={{ color: COLORS.textSecondary }}>
          Active Skills & Tech Stack:
        </Text>
        <View style={styles.chipGroup}>
          {skills.map((skill, index) => (
            <Chip key={index} style={styles.chip} textStyle={{ fontSize: 12 }}>
              {skill}
            </Chip>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    elevation: 3,
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  chip: {
    backgroundColor: COLORS.primaryLight,
  },
});
