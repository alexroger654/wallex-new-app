import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
} from 'react-native';
import {Color} from '../../GlobalStyles';
import usePostData from '../../shared/fetch/usePostData';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';

const TravelerDetailsScreen = () => {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // =========================== handle booking ======================

  async function handleBooking() {
    const provisionalBookingData = await handleProvisionalBooking();
    if (provisionalBookingData?.superPnr) {
      const result = await confirmBooking();
    }
  }

  // ============ handlers
  async function handleProvisionalBooking() {
    const result = await usePostData(
      `bookings`,
      {
        // Affiliate details
        affiliateReference: {
          clientPnr: '969d551b', // string
        },
        // The customer details of the booking
        bookerInfo: {
          bookedBy: {
            name: {
              firstName: 'Prosenjit',
              middleName: 'string', // OPTIONAL
              lastName: 'Singha',
              title: 'Mr',
            },
            contact: {
              email: 'prosenjitsingha28@gmail.com',
              phoneNumber: {
                type: 'MOBILE',
                countryId: '91',
                number: '9620992993',
              },
            },
            address: {
              addressLine1: 'House 007',
              addressLine2: 'string', // OPTIONAL
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
          id: '00010336',
          rooms: [
            {
              roomTypeId: '0000039452',
              ratePlanId: '0001455418',
              guestCount: {
                adultCount: 1,
                childCount: 2,
                childAges: [10, 9],
              },
              primaryGuestInfo: {
                name: {
                  firstName: 'Prosenjit',
                  middleName: 'string',
                  lastName: 'Singha',
                  title: 'Mr',
                },
                age: 25,
              },
            },
          ],
          bookingPeriod: {
            checkInDate: '2024-12-25',
            checkOutDate: '2024-12-31',
          },
        },
        rateProvider: {
          provider: 'TGU',
        },
        guaranteeType: 'POSTPAY',
        bookingCharges: {
          rate: {
            total: 14000,
            totalTax: 1500,
          },
          bookingCurrency: 'INR',
        },
        paymentType: 'OFFLINE',
      },
      'hotel',
    );

    if (result?.meta?.status == 'SUCCESS') {
      return {
        id: result?.data?.id,
        superPnr: result?.data?.superPnr,
      };
    } else {
      return null;
    }
  }

  async function confirmBooking() {
    const result = await usePostData(
      `bookings`,
      {
        bookingId: 'Q0000024590',
        clientPnr: '969d551b',
        status: 'CONFIRM_PROVISIONAL',
        clientBookingRef: '0605240000011',
      },
      'hotel',
    );

    if (result?.meta?.status == 'SUCCESS') {
      return {
        id: result?.data?.id,
        superPnr: result?.data?.superPnr,
      };
    } else {
      return null;
    }
  }

  // ======================== render ==============================

  return (
    <View style={{flex: 1}}>
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
          Hotels
        </Text>
      </View>
      <ScrollView style={styles.container}>
        {/* Title Selection */}
        {/* ================== header */}

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

        {/* First Name */}
        <Text style={styles.label}>First Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="John"
          placeholderTextColor={Color.primaryBlue20}
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Last Name */}
        <Text style={styles.label}>Last Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Doe"
          value={lastName}
          placeholderTextColor={Color.primaryBlue20}
          onChangeText={setLastName}
        />

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

        {/* Price Breakdown */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Price Breakup</Text>
          <View style={styles.priceRow}>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              1 room x 4 nights
            </Text>
            <Text
              style={{
                color: Color.primaryBlue50,
              }}>
              ₹ 16,790
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
              ₹ 1,730
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalText}>₹ 17,924</Text>
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
        <Text style={styles.totalAmount}>₹17,924 (total with taxes)</Text>
        <TouchableOpacity onPress={handleBooking} style={styles.payButton}>
          <Text style={styles.payButtonText}>Pay now</Text>
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
});

export default TravelerDetailsScreen;
