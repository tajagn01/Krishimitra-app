import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
  type: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: '🙏 नमस्ते किसान भाई! मैं आपकी खेती की मदद के लिए यहां हूं।',
    isBot: true,
    timestamp: '10:00 AM',
    type: 'welcome',
  },
];

// ✅ Farmer-friendly short replies
const getBotResponse = (text: string): string => {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('कीड़े') || lowerText.includes('बीमारी')) {
    return '👉 बताएं:\n1. फसल का नाम\n2. लक्षण\n3. कब से समस्या\n📷 फोटो भी भेज सकते हैं।';
  } else if (lowerText.includes('मौसम')) {
    return '🌤️ आज मौसम साफ\n🌡️ तापमान ~28°C\n🌧️ अगले 3 दिन हल्की बारिश।';
  } else if (lowerText.includes('खाद') || lowerText.includes('उर्वरक')) {
    return '🚜 खाद की सिफारिश:\n- यूरिया: 100kg/एकड़\n- DAP: 50kg/एकड़\n- पोटाश: 30kg/एकड़';
  }
  return '🙏 कृपया और जानकारी दें।';
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: newMessage,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage('');

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now(),
        text: getBotResponse(userMsg.text),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ Status bar fixed */}
      <StatusBar backgroundColor="#166534" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌾 कृषि सलाहकार</Text>
        <Text style={styles.headerSubtitle}>24x7 मदद</Text>
      </View>

      {/* Chat */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.contentContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.isBot ? styles.botWrapper : styles.userWrapper,
              ]}
            >
              {msg.isBot && (
                <View style={styles.botIcon}>
                  <Ionicons name="leaf" size={20} color="#166534" />
                </View>
              )}
              <View style={[styles.messageBubble, msg.isBot ? styles.botBubble : styles.userBubble]}>
                <Text style={[styles.messageText, msg.isBot ? styles.botText : styles.userText]}>
                  {msg.text}
                </Text>
                <Text style={styles.timestamp}>{msg.timestamp}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Quick Suggestions */}
        <View style={styles.suggestionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['बीमारी', 'मौसम', 'खाद', 'कीट'].map((text, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.suggestionChip}
                onPress={() => setNewMessage(text)}
              >
                <Text style={styles.suggestionText}>{text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="अपना प्रश्न लिखें..."
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !!newMessage.trim() && styles.sendButtonActive]}
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <Ionicons
              name="send"
              size={22}
              color={newMessage.trim() ? '#166534' : '#999'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#388E3C', // ✅ matches status bar + header
  },
  header: {
    backgroundColor: '#388E3C',
    padding: 14,
    marginTop: 44, // ✅ pushed header content down a bit
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#BBF7D0',
    marginTop: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 90 : 80,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    maxWidth: '80%',
  },
  botWrapper: {
    alignSelf: 'flex-start',
  },
  userWrapper: {
    alignSelf: 'flex-end',
  },
  botIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  messageBubble: {
    borderRadius: 16,
    padding: 10,
  },
  botBubble: {
    backgroundColor: '#E8F5E9',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#166534',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  botText: {
    color: '#166534',
  },
  userText: {
    color: 'white',
  },
  timestamp: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  suggestionsContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    marginBottom: Platform.OS === 'ios' ? 85 : 65,
  },
  suggestionChip: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#166534',
  },
  suggestionText: {
    fontSize: 12,
    color: '#166534',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
    // ✅ removed marginBottom: 60 so it moves with keyboard
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    maxHeight: 90,
  },
  sendButton: {
    marginLeft: 6,
    padding: 8,
    borderRadius: 20,
  },
  sendButtonActive: {
    backgroundColor: '#E8F5E9',
  },
});
