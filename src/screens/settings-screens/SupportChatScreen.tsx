import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import {ISupportTicket} from '../../shared/interfaces/supportTicket.interface';
import usePostData from '../../shared/fetch/usePostData';

export default function SupportChatScreen({route}: any) {
  const [messages, setMessages] = useState<any>([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {};

  const data: ISupportTicket = route?.params?.data;

  async function handleSendMsg() {
    const result = await usePostData(
      'tickets/send-message',
      {
        data: JSON.stringify({
          ticketId: data?._id,
          message: inputText,
        }),
      },
      'service',
    );

    console.log(result, 'ppppppppppppppp');

    if (result) {
      setMessages(result?.data?.messages);
    }
  }

  useEffect(() => {
    setMessages(data?.messages);
  }, [data?._id]);

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* ================== header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: Color.primaryBlue100,
        }}>
        <Pressable onPress={() => {}}>
          <ChevronLeftIcon size={22} color={Color.white} />
        </Pressable>
        <Text
          style={{
            color: Color.white,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Help & Support
        </Text>
      </View>

      {/* Ticket Info */}
      <View style={styles.ticketInfo}>
        <Text style={styles.ticketText}>Ticket ID : {data?._id}</Text>
        <Text style={styles.ticketText}>Subject: {data?.title}</Text>
        <Text style={styles.ticketText}>Reason: {data?.reason}</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView style={styles.chatContainer}>
        {messages?.map((message: any, i: number) => (
          <View
            key={i}
            style={[
              styles.messageBox,
              message?.userType === 'user' ? styles.userMessageBox : null,
            ]}>
            <Text style={styles.messageText}>{message?.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Send a message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMsg}>
          <PaperAirplaneIcon size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  ticketInfo: {
    padding: 16,
    // backgroundColor: '#E5E7EB',
  },
  ticketText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    backgroundColor: '#E5E7EB',
    width: 220,
    paddingVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageBox: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  userMessageBox: {
    backgroundColor: '#CBD5E1',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 14,
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginRight: 8,
    color: '#374151',
    backgroundColor: '#F9FAFB',
  },
  sendButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 12,
  },
});
