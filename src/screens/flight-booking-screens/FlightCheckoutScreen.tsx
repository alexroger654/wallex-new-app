import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import {Color} from '../../GlobalStyles';
import UserInfo from '../../component/flight-bookin/UserInfor';
import usePostData from '../../shared/fetch/usePostData';
import Loading from '../../component/Loading';
import SeatList from '../../component/flight-bookin/SeatBooking';
import {useToast} from 'react-native-toast-notifications';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {countdownToTenMinutes} from '../../shared/countdownToTenMinutes';
import CountDown from '../../component/flight-bookin/CountdownTimer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountdownTimer from '../../component/flight-bookin/CountdownTimer';

const FlightCheckoutScreen = ({navigation, route}: any) => {
  // ========= states ================
  const [loading, setLoading] = useState(false);
  const [priceData, setPriceData] = useState<any>({});
  const [contactInfo, setContactInfo] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  console.log(priceData);
  console.log(priceData, 'ppppppppppppppppppppppp -----------');

  // ============ hooks
  const toast = useToast();

  // =================== route data
  const {
    searchId,
    msid,
    mode,
    sc,
    flightIdCSV,
    flightPrice,
    bpc,
    isSR,
    flight_depart_date,
    destination,
    origin,
    resultObjId,
    formateDate,
    originCityName,
    destinationCityName,
    duration,
    airlineName,
    seatType,
    airlineCode,
    flightNumber,
  } = route?.params?.flightDetails;

  const saveTimeToStorage = async () => {
    const currentTime = Date.now(); // Current timestamp in milliseconds
    await AsyncStorage.setItem('startTime', currentTime.toString());
    console.log('Start time saved:', new Date(currentTime));
  };

  // ===================== check price =====================
  const checkPrice = async () => {
    setLoading(true);
    const result = await usePostData(
      'check-price',
      {
        searchId: searchId,
        msid,
        mode: 'Instant',
        sc,
        flightIdCSV,
        flightPrice: parseFloat(flightPrice),
        bpc: true,
        isSR: false,
      },
      'flight',
    );

    console.log(result, 'ppp 000000000))))))))))))');
    setPriceData(result?.data);
    saveTimeToStorage();
    setLoading(false);
  };

  useEffect(() => {
    checkPrice();
  }, []);

  // handle continue ===========

  async function handleContinueBooking() {
    if (
      !contactInfo.title ||
      !contactInfo.firstName ||
      !contactInfo.email ||
      !contactInfo.lastName ||
      !contactInfo?.lastName
    ) {
      toast.show('All Fields Are Required', {
        type: 'danger',
      });
      return;
    }

    navigation.navigate('TravellerDetailsScreen', {
      contactInfo,
      priceData,
      searchId,
      msid,
      mode,
      sc,
      flightIdCSV,
      flightPrice:
        priceData?.data?.fareDetails[resultObjId][
          priceData?.data?.fltSchedule[resultObjId][0]?.ID
        ]?.O?.ADT?.tf,
      bpc,
      isSR,
      flight_depart_date,
      destination,
      origin,
      resultObjId,
      formateDate,
      originCityName,
      destinationCityName,
      duration,
      airlineName,
      seatType,
      airlineCode,
      flightNumber,
    });
  }

  if (loading) {
    return <Loading />;
  }

  // ======================= render

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Color.primaryBlue100,
            paddingVertical: 24,
            paddingHorizontal: 14,
          }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <ChevronLeftIcon size={22} color={Color.white} />
            <Text
              style={{
                color: Color.white,
                fontSize: 16,
                fontWeight: '700',
              }}>
              User Info
            </Text>
          </Pressable>

          <View>
            <CountdownTimer color={Color.white} />
          </View>
        </View>

        {/* Body  */}
        <View
          style={{
            padding: 24,
          }}>
          {/* Flight Details */}
          <View style={styles.flightDetailsContainer}>
            <View style={styles.flightInfoHeader}>
              <View>
                <Text style={styles.flightRoute}>
                  {originCityName} To {destinationCityName}
                </Text>
                <Text style={styles.flightSubDetails}>{duration}</Text>
              </View>

              {/* <Text style={styles.reviewText}>Review</Text> */}
            </View>

            {/* <Text style={styles.refundable}>Refundable</Text> */}
          </View>
          {/* ============ user section */}
          <UserInfo contactInfo={contactInfo} setContactInfo={setContactInfo} />
        </View>
      </ScrollView>

      {/* Grand Total */}
      <View
        style={{
          padding: 16,
        }}>
        <View style={styles.totalContainer}>
          <View>
            <Text style={styles.totalText}>Grand Total</Text>
            <Text style={styles.totalAmount}>
              ₹
              {
                priceData?.data?.fareDetails[resultObjId][
                  priceData?.data?.fltSchedule[resultObjId][0]?.ID
                ]?.O?.ADT?.tf
              }
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleContinueBooking}
            style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondaryColors100,
  },
  header: {
    backgroundColor: Color.primaryBlue100,
    padding: 24,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepsContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepText: {
    color: Color.primaryBlue100,
    fontWeight: '600',
    textAlign: 'center',
  },
  stepLabel: {
    color: '#666',
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 12,
  },
  flightDetailsContainer: {
    marginBottom: 16,
  },
  flightInfoHeader: {
    backgroundColor: '#E5E9F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 12,
    borderRadius: 10,
  },
  flightRoute: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  reviewText: {
    color: Color.primaryBlue100,
    fontWeight: '600',
  },
  flightSubDetails: {
    color: Color.secondaryColors500,
    marginBottom: 8,
    fontSize: 12,
    marginTop: 0,
  },
  flightRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  flightCompany: {
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  flightCode: {
    color: Color.primaryBlue100,
  },
  flightTimesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeBlock: {
    alignItems: 'center',
    width: '33%',
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Color.primaryBlue100,
  },
  airportText: {
    color: Color.colorGray,
    fontSize: 12,
  },
  terminalText: {
    color: Color.colorGray,
    fontSize: 12,
  },
  refundable: {
    textAlign: 'center',
    color: '#28a745',
    marginTop: 8,
  },
  promoContainer: {
    backgroundColor: '#E5E9F7',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  promoInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: Color.primaryBlue100,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  promoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  promoCode: {
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  promoDescription: {
    color: '#666',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Color.primaryBlue100,
    borderRadius: 18,
  },
  totalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalAmount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  continueButton: {
    backgroundColor: Color.white,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: Color.primaryBlue100,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#F1F3FF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  infoHeader: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: Color.primaryBlue100,
  },
  infoItem: {
    marginVertical: 4,
  },
  infoText: {
    color: '#666',
  },
  importantInfoContainer: {
    backgroundColor: '#FFF6E3',
    borderRadius: 10,
    padding: 16,
  },
  importantHeader: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: Color.primaryBlue100,
  },
  importantItem: {
    marginVertical: 4,
  },
  importantText: {
    color: '#666',
  },
});

export default FlightCheckoutScreen;
