import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

const bookings = [
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
];

const HotelBookingScreen = () => {
  const [bookingList, setBookingList] = useState(bookings);

  const handleCancelBooking = bookingId => {
    // const checkInDate = new Date(
    //   bookingList.find(booking => booking.bookingId === bookingId).checkInDate,
    // );
    // const currentDate = new Date();
    // if (checkInDate > currentDate) {
    //   setBookingList(
    //     bookingList.filter(booking => booking.bookingId !== bookingId),
    //   );
    //   Alert.alert('Success', 'Booking canceled successfully.');
    // } else {
    //   Alert.alert(
    //     'Error',
    //     'Booking cannot be canceled as the check-in date is not valid.',
    //   );
    // }
  };

  const renderBookingItem = ({item}: any) => (
    <View style={styles.bookingItem}>
      <Text style={styles.hotelName}>{item.hotelName}</Text>
      <Text>Booking ID: {item.bookingId}</Text>
      <Text>Check-In: {new Date(item.checkInDate).toLocaleDateString()}</Text>
      <Text>Check-Out: {new Date(item.checkOutDate).toLocaleDateString()}</Text>
      <Text>Guest Count: {item.rooms[0].guestCount}</Text>
      <Text>
        Total Cost: {item.currency} {item.totalCost}
      </Text>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => handleCancelBooking(item.bookingId)}>
        <Text style={styles.cancelButtonText}>Cancel Booking</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hotel Booking List</Text>
      <FlatList
        data={bookingList}
        keyExtractor={item => item._id}
        renderItem={renderBookingItem}
      />
    </View>
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
  },
  bookingItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default HotelBookingScreen;
