import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {Color} from '../../GlobalStyles';
import {useAuth} from '../../context/AuthContext';
import useGetData from '../../shared/fetch/useGetData';
import Loading from '../../component/Loading';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';

const BookingDetails = ({route, navigation}: any) => {
  const {user} = useAuth();

  const [bookingDataDetails, setBookingDataDetails] = useState<any>({});
  const [hotelDetails, setHotelDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);

  async function getBookingDetails() {
    setLoading(true);
    const result = await useGetData(
      `bookings/${route?.params?.id}?clientPnr=969d551b`,
      'hotel',
    );
    setBookingDataDetails(result?.data);
    setLoading(false);
  }

  async function getHotelDetails() {
    setLoading(true);
    const data = await useGetData(
      `content?hotelId=${bookingDataDetails?.hotel?.id}`,
      'hotel',
    );
    setHotelDetails(data?.data);
    setLoading(false);
  }

  useEffect(() => {
    if (route?.params?.id) {
      getBookingDetails();
    }
  }, [route?.params?.id]);
  useEffect(() => {
    if (bookingDataDetails?.hotel?.id) {
      getHotelDetails();
    }
  }, [bookingDataDetails?.hotel?.id]);

  if (!bookingDataDetails?.bookingDetails) {
    return <></>;
  }

  const {bookingDetails, bookerInfo, hotel, pricing, paymentInfo} =
    bookingDataDetails;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
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
        <Text
          style={{
            color: Color.white,
          }}>
          Booking Details
        </Text>
      </Pressable>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Image
            source={{
              uri: hotelDetails?.images?.length
                ? hotelDetails?.images[0]?.url
                : '',
            }}
            style={{
              width: '100%',
              height: 180,
              borderRadius: 16,
            }}
          />
          <Text style={styles.sectionTitle}>Name: {hotel.name}</Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Address: {hotel.address.addressLine1}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            City: {hotel.address.city}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Contact:{' '}
            {hotel.contact.phoneNumber
              .map(p => `${p.type}: ${p.number}`)
              .join(', ')}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Check-In:{' '}
            {`${hotel.bookingPeriod.checkInDate} at ${hotel.bookingPeriod.checkInTime}`}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Check-Out:{' '}
            {`${hotel.bookingPeriod.checkOutDate} at ${hotel.bookingPeriod.checkOutTime}`}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Room Type: {hotel.rooms[0].name}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Guests: {hotel.rooms[0].guestCount.adultCount} Adults,{' '}
            {hotel.rooms[0].guestCount.childCount} Children
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Inclusions:{' '}
            {hotel.rooms?.length ? hotel?.rooms[0]?.inclusions?.join(', ') : ''}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Information</Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Booking ID: {bookingDetails.id}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Status: {bookingDetails.status}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Created On: {new Date(bookingDetails.createdOn).toLocaleString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booker Information</Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Name:{' '}
            {`${bookerInfo.bookedBy.name.title} ${bookerInfo.bookedBy.name.firstName} ${bookerInfo.bookedBy.name.lastName}`}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Email: {bookerInfo.bookedBy.contact.email}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Phone: {bookerInfo.bookedBy.contact.phoneNumber.number}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Address:{' '}
            {`${bookerInfo.bookedBy.address.addressLine1}, ${bookerInfo.bookedBy.address.city}, ${bookerInfo.bookedBy.address.state}, ${bookerInfo.bookedBy.address.countryCode} - ${bookerInfo.bookedBy.address.postalCode}`}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Base Price: {pricing.bookingCurrency} {pricing.base}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Taxes: {pricing.bookingCurrency} {pricing.taxes[0].amount}
          </Text>
          <Text
            style={{
              color: Color.darkBackground100,
            }}>
            Total Price: {pricing.bookingCurrency} {pricing.price}
          </Text>
        </View>

        <View
          style={{
            paddingBottom: 100,
          }}></View>

        {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <Text
          style={{
            color: Color.darkBackground100,
          }}>
          Total Amount: {paymentInfo.currency} {paymentInfo.totalAmount}
        </Text>
        <Text
          style={{
            color: Color.darkBackground100,
          }}>
          Payment Type: {paymentInfo.paymentType}
        </Text>
        <Text
          style={{
            color: Color.darkBackground100,
          }}>
          Payment Status: {paymentInfo.paymentStatus}
        </Text>
      </View> */}
      </ScrollView>
      {/* Cancel Button */}
      {/* Cancel Button */}
      {new Date(hotel?.bookingPeriod?.checkInDate) > new Date() &&
        bookingDetails.status !== 'CANCELLED' && (
          <View
            style={{
              width: '100%',
              padding: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 20,
                backgroundColor: '#F44336', // Color.colorRed_200 equivalent
                borderRadius: 16,
              }}>
              <Text
                style={{
                  color: '#FFFFFF', // Color.white equivalent
                }}>
                Cancel Booking
              </Text>
            </View>
          </View>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.primaryBlue100,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.primaryBlue100,
  },
});

export default BookingDetails;
