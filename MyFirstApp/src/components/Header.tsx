import React from 'react';
import { Appbar, Button } from 'react-native-paper';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onNotificationPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onNotificationPress,
}) => {
  return (
    <Appbar.Header elevated style={{ backgroundColor: '#ffffff' }}>
      <Appbar.Content title={title} subtitle={subtitle} />
      {onNotificationPress ? (
        <Button mode="text" onPress={onNotificationPress}>
          🔔
        </Button>
      ) : null}
    </Appbar.Header>
  );
};
