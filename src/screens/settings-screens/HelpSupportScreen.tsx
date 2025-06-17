import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import {PlusIcon} from 'react-native-heroicons/solid';
import {Color} from '../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {ISupportTicket} from '../../shared/interfaces/supportTicket.interface';
import useGetData from '../../shared/fetch/useGetData';
// Import your global color constants

const HelpSupportScreen = ({navigation}: any) => {
  const [tickets, setTickets] = useState<ISupportTicket[]>([]);

  async function getTicket() {
    const result = await useGetData('tickets', 'service');
    setTickets(result?.data);
  }

  useEffect(() => {
    getTicket();
  }, []);

  console.log(tickets, 'pppppppppppppppppppppp');

  return (
    <>
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
        <Pressable onPress={() => navigation.goBack()}>
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
      <ScrollView style={styles.container}>
        {tickets?.map(item => (
          <Pressable
            onPress={() =>
              navigation.navigate('SupportChatScreen', {
                data: item,
              })
            }
            key={item?._id}
            style={styles.ticketItem}>
            <View style={styles.ticketDetails}>
              <Text style={styles.ticketId}>Ticket ID: {item?._id}</Text>
              <Text style={styles.ticketReason}>Reason: {item?.title}</Text>
              <Text style={styles.ticketDate}>Date Created: 12th Mar 2022</Text>
            </View>
            <TouchableOpacity style={styles.statusButton}>
              <Text style={styles.statusText}>Open</Text>
            </TouchableOpacity>
          </Pressable>
        ))}
        {/* Ticket Item */}
      </ScrollView>
      {/* Add Ticket Button */}
      <TouchableOpacity
        style={styles.addTicketButton}
        onPress={() => navigation.navigate('CreateTicketScreen')}>
        <PlusIcon size={24} color={Color.text} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    padding: 20,
  },
  ticketItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.chatBackground,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ticketDetails: {
    flex: 1,
  },
  ticketId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
    marginBottom: 5,
  },
  ticketReason: {
    fontSize: 14,
    color: Color.secondary,
    marginBottom: 5,
  },
  ticketDate: {
    fontSize: 14,
    color: Color.chatText,
  },
  statusButton: {
    backgroundColor: Color.success, // Replace with a greenish color from your Color.js
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.primaryGreen100,
  },
  addTicketButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Color.primaryBlue100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginRight: 20,
    marginBottom: 20,
  },
});

export default HelpSupportScreen;
