import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {useTheme} from '../../../context/ThemeProvider';
import usePostData from '../../../shared/fetch/usePostData';
import FareRule from '../../../component/flight-bookin/FareRule';
import {Color} from '../../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import CountdownTimer from '../../../component/flight-bookin/CountdownTimer';

const RoundTripPaymentSuccessfulScreen = ({navigation, route}: any) => {
  const [loading, setLoading] = useState(false);
  const [fareRules, setFareRules] = useState<any>({});

  const {
    contactInfo,
    priceData,
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
    selectedSeat,
  } = route?.params;
  const {color} = useTheme();

  async function getSeatList() {
    setLoading(true);
    const result = await usePostData(
      'get-fare-rule',
      {
        isDomestic: true,
        // Fare Basic Code. You will get this value from search api with fbc key
        fareBasisCode:
          priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.fbc,
        // Airline code. You will get this value from search api with ac key
        airlineCode:
          priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.oac,
        // Search Id. You will get this value from search api with scid key
        searchId: priceData?.searchId,
        // Supplier Code. You will get this value from from search api with supplierCode key
        supplierCode: sc,
        // flightIdCSV
        flightIdCSV: priceData?.flightIdCSV,
      },
      'flight',
    );

    setFareRules(result?.data[0]);
    setLoading(false);
  }

  async function handleFlightBook() {
    const payload = {
      searchId: searchId,
      msid: msid,
      mode: 'Instant',
      sc: sc,
      flightIdCSV: flightIdCSV,
      flightPrice: flightPrice,
      bpc: true,
      isSR: false,
      ref: priceData?.superPnr,
      sst: true,
      pid: priceData?.pricingId,
      isHff: false,
      variation: 0,
      newUi: false,

      pricingId: priceData?.pricingId,
      superPnr: priceData?.superPnr,
      reviewJson: {
        globalParams: {
          prq: '',
          ADTcreator: '',
          pricingId: priceData?.pricingId,
          searchId: searchId,
          superPnr: priceData?.superPnr,
          channel: 'b2b',
          product: 'flight',
          url: priceData?.sessionTimeoutData?.pricingUrl,
          ftype: 'O',
          org: origin,
          dest: destination,
          changeFlightUrl: priceData?.sessionTimeoutData?.searchUrl,
          isPartial: false,
          ebs_accountId: priceData?.data?.ebs_accountId,
          ebs_sessionId: priceData?.data?.ebs_sessionId,
          rurl: 'https://secure.yatra.com/checkout-ui/b2bdom/confirmation',
          moProfileType: 'CASH',
          childTenant: 'b2bdom',
          variation: 1,
        },
        addOnParams: [],
        hotelCrossSellParams: {
          isHotelCrosssellBooking: false,
          hotelBookingRequestJSON: '',
        },
        productParams: {
          tripType: 'O',
          amountDisp: flightPrice,
          displayMarkup: '0',
        },
        promoParams: {
          status: false,
          promoCode: '',
          isReadonly: false,
          amount: 0,
          ecashAmount: 0,
          promoType: '',
          msg: '',
          authCode: '',
          category: '',
          seat: false,
          meal: false,
          disableYlp: false,
          disableDiscountDisplay: false,
          dpsTestNo: 0,
          updatedICB: 0,
        },
        userParams: {
          additionalContact: {
            email: contactInfo?.email,
            mobile: contactInfo?.phone,
            mobileISD: 91,
            interactionId: '',
          },
          emailId: contactInfo?.email,
          mobileNo: contactInfo?.phone,
          userId: '334904',
          title: '',
          firstName: contactInfo?.firstName,
          lastName: contactInfo?.lastName,
          mobileNoISD: '91',
        },
        travellerParams: [
          {
            travellerDetails: {
              id: '',
              title: contactInfo?.title,
              firstName: contactInfo?.firstName,
              middleName: '',
              lastName: contactInfo?.lastName,
              paxClass: 'Adult',
              passengerClass: 'ADT',
              dateOfBirth: '',
              passport: {
                nationality: '',
                number: '',
                issuingCountryCode: '',
                issuingCountryName: '',
                expiryDate: '',
              },
              frequentFlyer: {},
            },
            paxID: 1,
            ssrDetails: {
              ssrMealDetails: [],
              ssrBaggageDetails: [],
              ssrSeatDetails: [
                [
                  {
                    rph: '1',
                    uid: '1',
                    seatValue: '11B',
                    price: 150,
                    isdata: true,
                    pax: '0',
                    trip: 'O',
                    arrloc: 'BLR',
                    deploc: 'DEL',
                  },
                ],
              ],
              ssrOtherDetails: [],
            },
          },
        ],
        gstDetails: {},
        discountParams: {},
        totalBreakup: {
          meals: {
            amount: 0,
            label: 'Meals',
          },
          baggage: {
            amount: 0,
            label: 'Baggage',
          },
          seats: {
            amount: 150,
            label: 'Seats',
          },
          others: {
            amount: 0,
            label: 'Others Charges',
          },
          insurance: {
            amount: 0,
            label: 'Travel Insurance',
          },
          'save.child': {
            amount: 0,
            label: 'TAKE OFF Contribution',
          },
          CLIMES: {
            amount: 0,
            label: 'Carbon Emission',
          },
          SDFC: {
            amount: 0,
            label: 'Same Day Cancellation Protection',
          },
          DFC: {
            amount: 0,
            label: 'Cancellation Protection',
          },
          BBG: {
            amount: 0,
            label: 'Best buy Assurance',
          },
          beingHuman: {
            amount: 0,
            label: 'Being Human Contribution',
          },
          matrix: {
            amount: 0,
            label: 'MATRIX Calling Card',
          },
          'SBI Calling Card': {
            amount: 0,
            label: 'SBI Calling Card',
          },
          markup: {
            amount: 0,
            label: 'Markup',
          },
        },
        advancedPricing: {},
        upSellParams: [],
        gaResponse: {
          data: [
            {
              id: priceData?.superPnr,
              name: 'DOM Flights',
              category: `DOMFlights/Economy/Afternoon/1/${origin}-${destination}`,
              brand: airlineName,
              variant: 'One Way',
              price: flightPrice,
            },
          ],
          action: 'event',
          actionData: 'checkout',
          actionObj: {
            step: 1,
            option: 'Pay Now : Credit Card - Quickbook',
          },
          event: 'Flights - Payment - DOM|Current Selection|Pay Now',
        },
        uiParams: {
          gaTrackingData: {
            event: 'checkout',
            tripType: 'One Way',
            lob: 'Flight',
            ecommerce: {
              checkout: {
                actionField: {
                  step: 2,
                  option: 'Payment Detail',
                },
                products: [
                  {
                    name: `${origin}|${destination}`,
                    id: priceData?.data?.fltSchedule[resultObjId][0]?.ID,
                    price: parseFloat(flightPrice),
                    brand: airlineName,
                    category: 'domestic',
                    variant: 'One Way',
                    quantity: 1,
                  },
                ],
              },
            },
          },
        },
      },
    };

    console.log(payload, 'ppppppppppppppppp');

    const result = await usePostData('book', payload, 'flight');
  }

  useEffect(() => {
    getSeatList();
  }, []);

  const handleSeeDetails = () => {
    // alert('Viewing Details');
  };

  return (
    <View style={styles.container}>
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
            Summery
          </Text>
        </Pressable>

        <View>
          <CountdownTimer color={Color.white} />
        </View>
      </View>

      <ScrollView
        style={{
          padding: 20,
          flex: 1,
        }}>
        <View style={styles.card}>
          {/* <Text
            style={[
              styles.airlineName,
              {
                color: color.primaryBlue100,
              },
            ]}>
            {airlineName}
          </Text>
          <Text style={styles.classType}>Executive</Text> */}

          <View style={styles.route}>
            <Text
              style={[
                styles.airportCode,
                {
                  color: color.primaryBlue100,
                },
              ]}>
              {originCityName}
            </Text>
            <Text style={styles.flightIcon}>✈️</Text>
            <Text
              style={[
                styles.airportCode,
                {
                  color: color.primaryBlue100,
                },
              ]}>
              {destinationCityName}
            </Text>
          </View>
          <View style={styles.flightDetails}>
            <Text style={styles.time}>
              {priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.ad}
            </Text>
            <Text style={styles.time}>
              {' '}
              {priceData?.data?.fltSchedule[resultObjId][0]?.OD[0]?.FS[0]?.dd}
            </Text>
          </View>

          {/* <View style={styles.passengerDetails}>
            <Text style={styles.passengerInfo}>2 Person • Premium</Text>
            <Text style={styles.price}>IDR 350.000/PAX</Text>
          </View> */}

          {/* <View style={styles.passenger}>
            <Text style={styles.passengerName}>Matt Murdock</Text>
            <Text style={styles.edit}>Edit</Text>
          </View> */}
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailRow}>
            <Text style={styles.label}>Name: </Text>
            {contactInfo?.title} {contactInfo?.firstName}{' '}
            {contactInfo?.lastName}
          </Text>
          <Text style={styles.detailRow}>
            <Text style={styles.label}>Email: </Text> {contactInfo?.email}
          </Text>
          <Text style={styles.detailRow}>
            <Text style={styles.label}>Phone: </Text>
            {contactInfo?.phone}
          </Text>
        </View>

        <View style={styles.paymentSummary}>
          {/* <Text style={styles.paymentRow}>
            <Text>1. Matt Murdock</Text>
            <Text>Rp. 210.000</Text>
          </Text> */}
          <View style={styles.totalRow}>
            <Text
              style={{
                color: color.primaryBlue100,
              }}>
              Total
            </Text>
            <Text
              style={{
                color: color.primaryBlue100,
              }}>
              {flightPrice}
            </Text>
          </View>
        </View>

        <FareRule fareRules={fareRules} />
        {/* <TouchableOpacity
          style={styles.refundButton}
          onPress={handleRefundOrReschedule}>
          <Text style={styles.refundButtonText}>
            Refund or Reschedule Ticket
          </Text>
        </TouchableOpacity> */}
      </ScrollView>

      <View
        style={{
          padding: 16,
        }}>
        <TouchableOpacity
          style={styles.seeDetailsButton}
          onPress={handleFlightBook}>
          <Text style={styles.seeDetailsButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    backgroundColor: '#002B7F',
    padding: 18,
    // alignItems: 'center',
    // borderRadius: 8,
  },
  headerText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 16,
    borderRadius: 8,
    elevation: 2,
  },
  airlineName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  classType: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  route: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  airportCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flightIcon: {
    fontSize: 20,
    color: '#888',
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    color: '#555',
  },
  passengerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  passengerInfo: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  passenger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passengerName: {
    fontSize: 16,
  },
  edit: {
    fontSize: 14,
    color: '#007BFF',
  },
  detailsSection: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  detailRow: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  paymentSummary: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
  },
  refundButton: {
    backgroundColor: '#FFEBEB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  refundButtonText: {
    color: '#FF4D4D',
    fontSize: 14,
    fontWeight: 'bold',
  },
  seeDetailsButton: {
    backgroundColor: '#002B7F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  seeDetailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RoundTripPaymentSuccessfulScreen;
