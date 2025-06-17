import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Color} from '../GlobalStyles';

const SupportChatScreen = () => {
  const [messages, setMessages] = useState([
    // {id: '1', text: 'Hello! How can we assist you today?', sender: 'support'},
    // {id: '2', text: 'I need help with my account.', sender: 'user'},
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        {id: Date.now().toString(), text: newMessage.trim(), sender: 'user'},
      ]);
      setNewMessage('');
      // Simulate a support response after sending a message
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: (Date.now() + 1).toString(),
            text: "Thank you for reaching out! We'll address your issue shortly.",
            sender: 'support',
          },
        ]);
      }, 1500);
    }
  };

  const renderMessage = ({item}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.supportMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ChevronLeftIcon size={20} color="#fff" />
        <Text style={styles.headerTitle}>Support Chat</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
        inverted
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: Color.primaryBlue100,
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  chatContainer: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '75%',
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1f5d3',
  },
  supportMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e4e6eb',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 14,
    marginRight: 8,
    color: Color.primaryBlue100,
  },
  sendButton: {
    backgroundColor: Color.primaryBlue100,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SupportChatScreen;
