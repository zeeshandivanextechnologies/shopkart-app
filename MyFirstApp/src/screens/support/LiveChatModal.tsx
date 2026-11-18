import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../constants/theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  time: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    text: 'Hello Boss! 👋 Welcome to ShopKart 24x7 Priority Support. How can I help you today?',
    sender: 'agent',
    time: '05:00 PM',
  },
  {
    id: 'm2',
    text: 'I wanted to check on the delivery status of my shoes.',
    sender: 'user',
    time: '05:01 PM',
  },
  {
    id: 'm3',
    text: 'Sure! Your order #ORD-849201 is dispatched and on schedule for delivery today before 8 PM.',
    sender: 'agent',
    time: '05:02 PM',
  },
];

interface LiveChatModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  visible,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'user',
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulated instant reply
    setTimeout(() => {
      const agentReply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message! Our executive is reviewing this for you right away. Anything else we can help with?',
        sender: 'agent',
        time: 'Just now',
      };
      setMessages((prev) => [...prev, agentReply]);
    }, 1200);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <View style={styles.agentInfo}>
            <View style={styles.avatarWrap}>
              <Ionicons name="headset" size={16} color="#ffffff" />
              <View style={styles.onlineBadge} />
            </View>
            <View>
              <Text style={styles.agentName}>ShopKart Support</Text>
              <Text style={styles.agentStatus}>Online • Typically replies in 1 min</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.iconBtn} onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <ScrollView contentContainerStyle={styles.messagesList} showsVerticalScrollIndicator={false}>
          <Text style={styles.encryptionNotice}>🔒 Messages are end-to-end encrypted</Text>

          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <View
                key={m.id}
                style={[styles.messageBubble, isUser ? styles.userBubble : styles.agentBubble]}>
                <Text style={[styles.messageText, isUser ? styles.userText : styles.agentText]}>
                  {m.text}
                </Text>
                <Text style={[styles.messageTime, isUser ? styles.userTime : styles.agentTime]}>
                  {m.time}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* Bottom Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message here..."
            placeholderTextColor={COLORS.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Ionicons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: 45,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    gap: 8,
  },
  backBtn: {
    padding: 4,
  },
  agentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  agentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  agentStatus: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  iconBtn: {
    padding: 4,
  },
  messagesList: {
    padding: SPACING.md,
    gap: 12,
  },
  encryptionNotice: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginVertical: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  agentBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
  },
  userText: {
    color: '#ffffff',
  },
  agentText: {
    color: COLORS.text,
  },
  messageTime: {
    fontSize: 9,
    marginTop: 4,
  },
  userTime: {
    color: '#E0E7FF',
    textAlign: 'right',
  },
  agentTime: {
    color: COLORS.textSecondary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: COLORS.text,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
