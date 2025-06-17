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
import useGetData from '../../shared/fetch/useGetData';

interface FormData {
  name: string;
  emailId: string;
  city: string;
  state: string;
  pincode: string;
  mobileNumber: string;
  address: string;
}

let dummyData = {
  status: 1,
  code: 200,
  message: 'Flight booking record has been created',
  meta: {
    totalResults: 1,
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  data: [
    {
      _id: '6638905680c5943e70aa9848',
      bookingId: 'Q0000024590',
      checkInDate: '2024-05-20T00:00:00.000Z',
      checkOutDate: '2024-05-20T00:00:00.000Z',
      clientPnr: '969d551b',
      createdAt: '2024-05-06T08:09:58.274Z',
      currency: 'INR',
      hotelId: '00010336',
      hotelName: 'Nandu Guest House Marathalli',
      rooms: [
        {
          guestCount: 3,
        },
      ],
      status: 'CONFIRMED',
      totalCost: 200,
      updatedAt: '2024-05-06T08:09:58.274Z',
      userId: '65e36a96ddfaad5bbf40df2e',
      __v: 0,
    },
  ],
  error: null,
};

// ===================== component ==========================================
export default function HotelBookingList({navigation}: any) {
  // ===================== states ==========
  const [bookings, setBookings] = useState<any[]>([]);

  //fetch functions
  async function getAllbookingss() {
    const data = await useGetData('yatra/hotels/bookings', 'service');
    setBookings(data?.data);
  }

  useEffect(() => {
    getAllbookingss();
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
          padding: Padding.p_xl,
        }}>
        <View>
          {bookings?.map(item => (
            <Pressable
              onPress={() =>
                navigation?.navigate('BookingDetails', {
                  id: item?.bookingId,
                })
              }
              key={item?.referenceId}
              style={styles.card}>
              {/* {item.type == 'gold' ? (
                <>
                  <Image
                    source={require('../../../assets/images/gold.jpg')}
                    style={styles.image}
                  />
                </>
              ) : (
                <>
                  <Image
                    source={require('../../../assets/images/silver.jpg')}
                    style={styles.image}
                  />
                </>
              )} */}
              <View style={styles.cardContent}>
                <Text style={styles.orderTitle}> {item.hotelName}</Text>
                <Text style={styles.orderId}>
                  Check-In: {item?.checkInDate?.slice(0, 10)} | Check-Out:{' '}
                  {item?.checkOutDate?.slice(0, 10)}
                </Text>

                <Text style={[styles.status, styles.delivered]}>
                  Booking Id:{item.bookingId}
                </Text>
                <Text style={styles.orderTitle}>Price ₹{item.totalCost}</Text>
                {/* <Text style={styles.date}>{item.createdAt?.slice(0, 10)}</Text> */}
              </View>
            </Pressable>
          ))}
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
    fontSize: 12,
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
    fontSize: 11,
    color: Color.primaryBlue100,
  },
  orderTitle: {
    fontSize: 16,
    color: Color.primaryBlue100,
    fontWeight: '800',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});
