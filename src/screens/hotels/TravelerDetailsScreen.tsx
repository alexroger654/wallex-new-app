import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {Color} from '../../GlobalStyles';
import usePostData from '../../shared/fetch/usePostData';
import {ChevronLeftIcon, StarIcon} from 'react-native-heroicons/outline';
import {Toast, useToast} from 'react-native-toast-notifications';
import {useTheme} from '../../context/ThemeProvider';
import {useAuth} from '../../context/AuthContext';
import Loading from '../../component/Loading';

const TravelerDetailsScreen = ({navigation, route}: any) => {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [roomsAndGust, setRoomsAndGust] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<any>({}); // State to hold validation errors
  const toast = useToast();
  const {color} = useTheme();
  const {user} = useAuth();

  const {selectedRooms, rooms, checkInDate, checkOutDate, data} = route?.params;

  // =========================== handle booking ======================

  function validateInputs() {
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!title) newErrors.title = 'Title is required';
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!phoneNumber.trim() || !phoneRegex.test(phoneNumber))
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    if (!email.trim() || !emailRegex.test(email))
      newErrors.email = 'Enter a valid email address';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // // Increase the quantity of a room
  const handleIncreaseQuantity = (roomTypeId: string) => {
    if (roomsAndGust?.length < rooms?.length) {
      setRoomsAndGust((prevRooms: any) =>
        prevRooms.map((room: any) =>
          room.roomTypeId === roomTypeId
            ? {...room, quantity: room.quantity + 1}
            : room,
        ),
      );
    } else {
      toast.show(`Maximum room limit (${rooms?.length}) reached`);
    }
  };

  // // Decrease the quantity of a room and remove it if the quantity reaches 0
  const handleDecreaseQuantity = (roomTypeId: string) => {
    setRoomsAndGust((prevRooms: any) => {
      const updatedRooms = prevRooms
        .map((room: any) =>
          room.roomTypeId === roomTypeId
            ? {...room, quantity: room.quantity - 1}
            : room,
        )
        .filter((room: any) => room.quantity > 0); // Remove rooms with quantity 0

      if (updatedRooms.length === 0) {
        navigation.goBack(); // Navigate back if no rooms are left
      }

      return updatedRooms;
    });
  };

  async function createProvisionalBooking() {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);
    const result = await usePostData(
      'bookings',
      {
        affiliateReference: {
          clientPnr: '969d551b',
        },
        bookerInfo: {
          bookedBy: {
            name: {
              firstName: firstName,
              middleName: '',
              lastName: lastName,
              title: title,
            },
            contact: {
              email: email,
              phoneNumber: {
                type: 'MOBILE',
                countryId: '91',
                number: phoneNumber,
              },
            },
            address: {
              addressLine1: 'House 007',
              addressLine2: 'string',
              city: 'Amreli',
              state: 'Gujarat',
              country: 'string',
              countryCode: 'IN',
              postalCode: '2324322',
            },
          },
          specialRequest: '',
        },
        hotel: {
          id: route?.params?.data?.id,
          rooms: route?.params?.rooms?.map((item: any) => {
            return {
              roomTypeId: route?.params?.data?.roomTypeId,
              ratePlanId: route?.params?.data?.ratePlanId,
              guestCount: {
                adultCount: item?.noOfAdults,
                childCount: item?.noOfChildren,
                childAges: item?.childrenAge,
              },
              primaryGuestInfo: {
                name: {
                  firstName: firstName,
                  middleName: '',
                  lastName: lastName,
                  title: title,
                },
                age: 25,
              },
            };
          }),

          bookingPeriod: {
            checkInDate: route?.params?.checkInDate,
            checkOutDate: route?.params?.checkOutDate,
          },
        },
        rateProvider: {
          provider: 'TGU',
        },
        guaranteeType: 'PREPAY',
        bookingCharges: {
          rate: {
            total: route?.params?.data?.pricing?.total?.price,
            totalTax: route?.params?.data?.pricing?.total?.taxes[0]?.amount,
          },
          bookingCurrency: 'INR',
        },
        paymentType: 'OFFLINE',
      },
      'hotel',
    );

    const isConfirmed = await confirmBooking(
      result?.data?.id,
      result?.data?.superPnr,
    );
    if (isConfirmed) {
      SaveLocalBooking(result?.data?.id);
      toast.show('Booking Successfully');
      navigation.navigate('HotelHomeScreen');
    }

    setLoading(false);
  }

  async function confirmBooking(bookingId: string, clientBookingRef: string) {
    const result: any = await fetch('https://dev.wallex.world/hotel/bookings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer YOUR_AUTH_TOKEN',
      },
      body: JSON.stringify({
        bookingId: bookingId,
        clientPnr: '969d551b',
        status: 'CONFIRM_PROVISIONAL',
        clientBookingRef: clientBookingRef,
      }),
    });

    if (result) {
      return true;
    }
  }

  async function SaveLocalBooking(id: string) {
    const result = await usePostData(
      'yatra/hotels/bookings',
      {
        clientPnr: '969d551b',
        bookingId: id,
        hotelId: data?.id,
        hotelName: data?.vendorName,
        totalCost: route?.params?.data?.pricing?.total?.price,
        currency: 'INR',
        rooms: route?.params?.rooms?.map((item: any, i: number) => {
          return {
            guestCount: item?.noOfAdults + item?.noOfChildren,
          };
        }),
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        status: 'CONFIRMED',
      },
      'service',
    );

    const res = await result?.json();
  }

  useEffect(() => {
    setRoomsAndGust(selectedRooms);
  }, [selectedRooms]);

  useEffect(() => {
    setEmail(user?.email as string);
    setPhoneNumber(user?.mobile as string);
    setFirstName(user?.full_name as string);
  }, [user?._id]);

  if (loading) {
    return <Loading />;
  }

  // ======================== render ==============================

  return (
    <View style={{flex: 1}}>
      {/* ================== header */}
      <Pressable
        onPress={() => navigation?.goBack()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: Color.primaryBlue100,
        }}>
        <Pressable onPress={() => navigation?.goBack()}>
          <ChevronLeftIcon size={22} color={Color.white} />
        </Pressable>
        <Text
          style={{
            color: Color.white,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Hotels
        </Text>
      </Pressable>
      <ScrollView style={styles.container}>
        {/* Title Selection */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
            padding: 10,
            backgroundColor: color?.white,
            borderRadius: 12,
            marginBottom: 20,
          }}>
          <Image
            source={{
              uri: data?.images[0]?.url,
            }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 12,
            }}
          />
          <View>
            <Text
              style={[
                styles.label,
                {
                  fontWeight: '700',
                },
              ]}>
              {data?.vendorName}
            </Text>
            <Text
              style={[
                styles.label,
                {
                  marginTop: -4,
                },
              ]}>
              {data?.address.area} , {data?.address.city}
            </Text>
          </View>
        </View>

        {/* ======================= room list */}
        <View
          style={{
            marginBottom: 14,
          }}>
          <FlatList
            data={roomsAndGust}
            keyExtractor={room => room.roomTypeId.toString()}
            renderItem={({item: room}) => (
              <View style={styles.roomContainer}>
                <View>
                  <Text
                    style={[
                      styles.roomName,
                      {
                        color: color.primaryBlue100,
                      },
                    ]}>
                    Room: {room.roomName}
                  </Text>
                  <Text
                    style={{
                      color: color.primaryBlue100,
                      fontSize: 12,
                    }}>
                    Price: ₹{room.price.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      color: color.primaryBlue100,
                      fontSize: 12,
                    }}>
                    Tax: ₹{room.tax.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    onPress={() => handleDecreaseQuantity(room.roomTypeId)}
                    style={[styles.button, styles.decreaseButton]}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.quantity,
                      {
                        color: color.primaryBlue100,
                      },
                    ]}>
                    {room.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleIncreaseQuantity(room.roomTypeId)}
                    style={[styles.button, styles.increaseButton]}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {/* Title Selection */}
        <View style={styles.titleContainer}>
          {['Mr.', 'Mrs.', 'Ms.'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.titleButton,
                title === option && styles.titleButtonSelected,
              ]}
              onPress={() => setTitle(option)}>
              <Text
                style={
                  title === option ? styles.titleTextSelected : styles.titleText
                }>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.title && <Text style={{color: 'red'}}>{errors.title}</Text>}

        {/* First Name */}
        <Text style={styles.label}>First Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="John"
          placeholderTextColor={Color.primaryBlue20}
          value={firstName}
          onChangeText={setFirstName}
        />
        {errors.firstName && (
          <Text style={{color: 'red'}}>{errors.firstName}</Text>
        )}

        {/* Last Name */}
        <Text style={styles.label}>Last Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Doe"
          value={lastName}
          placeholderTextColor={Color.primaryBlue20}
          onChangeText={setLastName}
        />
        {errors.lastName && (
          <Text style={{color: 'red'}}>{errors.lastName}</Text>
        )}

        {/* Add Guest Button */}
        {/* <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add 2 more guests</Text>
        </TouchableOpacity> */}

        {/* Contact Details */}
        <Text style={styles.contactTitle}>
          Booking Details will be shared here
        </Text>
        <Text style={styles.contactSubtitle}>Enter your contact details</Text>

        {/* Phone Number */}
        <Text style={styles.label}>Phone Number*</Text>
        <TextInput
          style={styles.input}
          placeholder="+91 96985 23345"
          placeholderTextColor={Color.primaryBlue20}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {errors.phoneNumber && (
          <Text style={{color: 'red'}}>{errors.phoneNumber}</Text>
        )}

        {/* Email Address */}
        <Text style={styles.label}>Email address*</Text>
        <TextInput
          style={styles.input}
          placeholder="test@mail.com"
          keyboardType="email-address"
          placeholderTextColor={Color.primaryBlue20}
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={{color: 'red'}}>{errors.email}</Text>}

        {/* Price Breakdown */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Booking Details</Text>
          <View style={styles.priceRow}>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              Rooms
            </Text>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              {route?.params?.rooms?.length}
            </Text>
          </View>
          {/* <View style={styles.priceRow}>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              Gust
            </Text>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              {route?.params?.rooms.reduce(
                (sum: any, room: any) => sum + room.adults,
                0,
              )}{' '}
              adults,{' '}
              {route?.params?.rooms.reduce(
                (sum: any, room: any) => sum + room.children,
                0,
              )}{' '}
              Children
              {route?.params?.rooms?.length}
            </Text>
          </View> */}
          <View style={styles.priceRow}>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              Check In
            </Text>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              {route?.params?.checkInDate}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              Check Out
            </Text>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              {route?.params?.checkOutDate}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              Hotel taxes
            </Text>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              ₹
              {selectedRooms.reduce((acc: any, room: any) => acc + room.tax, 0)}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalText}>
              {' '}
              ₹
              {selectedRooms.reduce(
                (acc: any, room: any) => acc + room.price,
                0,
              )}
            </Text>
          </View>
        </View>

        {/* Savings Message */}
        {/* <View style={styles.savingsContainer}>
                    <Text style={styles.savingsText}>You save ₹33,691</Text>
                </View> */}

        {/* Total Amount and Pay Button */}

        <View
          style={{
            paddingBottom: 100,
          }}></View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.totalAmount}>
          ₹{selectedRooms.reduce((acc: any, room: any) => acc + room.price, 0)}{' '}
          + ₹{selectedRooms.reduce((acc: any, room: any) => acc + room.tax, 0)}{' '}
          tax
        </Text>
        <TouchableOpacity
          onPress={createProvisionalBooking}
          style={styles.payButton}>
          <Text style={styles.payButtonText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 14,
  },
  titleButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  titleButtonSelected: {
    backgroundColor: '#e0f7fa',
    borderColor: Color.secondaryColors100,
  },
  titleText: {
    color: Color.secondaryColors500,
  },
  titleTextSelected: {
    color: '#00796b',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 14,
    color: Color.primaryBlue100,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.secondaryColors100,
    marginBottom: 10,
    color: '#000',
  },
  addButton: {
    alignItems: 'center',
    paddingVertical: 12,
    borderColor: Color.primaryBlue20,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  addButtonText: {
    color: Color.primaryBlue100,
  },
  contactTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  contactSubtitle: {
    color: '#666',
    marginBottom: 10,
  },
  priceContainer: {
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.primaryBlue80,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Color.primaryBlue80,
  },
  savingsContainer: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 15,
  },
  savingsText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  payButton: {
    backgroundColor: Color.primaryBlue100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#fff',
  },
  roomName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  decreaseButton: {
    backgroundColor: '#f87171', // Red color
  },
  increaseButton: {
    backgroundColor: '#4ade80', // Green color
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
});

export default TravelerDetailsScreen;
