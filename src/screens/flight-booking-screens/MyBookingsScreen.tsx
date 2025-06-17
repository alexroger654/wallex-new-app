import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import {Color, Padding} from '../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import usePostData from '../../shared/fetch/usePostData';
import {Toast} from 'react-native-toast-notifications';
import {IGoldInvestment} from '../../interfaces/gold-investment.interface';
import useGetData from '../../shared/fetch/useGetData';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
  name: string;
  emailId: string;
  city: string;
  state: string;
  pincode: string;
  mobileNumber: string;
  address: string;
}

// ===================== component ==========================================
export default function DigiGoldOrderScreen({navigation}: any) {
  // ===================== states ==========
  const [bookings, setBookings] = useState<any>([]);

  //fetch functions
  async function fetchWithAuth() {
    const result: any = await AsyncStorage.getItem('user');

    const headers = {
      Authorization: `Bearer ${JSON.parse(result)?.accessToken}`,
    };
    try {
      const response = await fetch(
        'https://dev.wallex.world/service/yatra/flights/bookings',
        {headers},
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data?.data, 'ooooooooooooooooooooooooooooooo');
      setBookings(data?.data);

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  console.log(bookings, 'pppppppppppppppp');

  useEffect(() => {
    fetchWithAuth();
  }, []);

  // ==================== render =================================
  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
          backgroundColor: Color.primaryBlue100,
          paddingVertical: 24,
          paddingHorizontal: 14,
        }}>
        <ChevronLeftIcon size={22} color={Color.white} />
        <Text style={styles.header}>My Bookings</Text>
      </Pressable>

      <ScrollView
        style={{
          padding: Padding.p_13xl,
        }}>
        <View>
          {bookings?.length ? (
            bookings?.map((item: any) => (
              <View key={item?.referenceId} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.orderId}>ID: {item.superPnr}</Text>
                  <Text style={styles.orderId}>{item?.bookingDate}</Text>
                  <Text style={[styles.status, styles.delivered]}>
                    ₹ {item.totalFare}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <></>
          )}
        </View>

        <View
          style={{
            paddingBottom: 120,
          }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: Color.white,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.primaryBlue100,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    color: Color.colorRed,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cancelled: {
    color: '#ff3d00',
  },
  delivered: {
    color: '#4caf50',
  },
  orderId: {
    fontSize: 14,
    color: Color.primaryBlue100,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});
