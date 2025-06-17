import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {CheckIcon, ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import usePostData from '../../shared/fetch/usePostData';
import Loading from '../../component/Loading';

const App = ({navigation, route}: any) => {
  const [currentFilter, setCurrentFilter] = useState('Discounted Price');

  const [flightData, setFlightData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [completedata, setCompleteData] = React.useState<any>(null);

  React.useEffect(() => {
    fetchFlightData();
  }, []);
  const {
    origin,
    destination,
    flight_depart_date,
    ADT,
    CHD,
    INF,
    seatType,
    type,
    destinationCountry,
    originCountry,
    returnDate,
  } = route?.params?.search;

  const fetchFlightData = async () => {
    setLoading(true);

    const result = await usePostData(
      'search',
      {
        isDomestic:
          destinationCountry == 'IN' && originCountry == 'IN' ? true : false,
        type: type,
        viewName: 'normal',
        flexi: 0,
        noOfSegments: 1,
        origin: origin,
        // origin: 'DEL',
        originCountry: originCountry,
        destination: destination,
        // destination: 'BOM',
        destinationCountry: destinationCountry,
        flight_depart_date: flight_depart_date,
        ADT: ADT,
        CHD: CHD,
        INF: INF,
        // class: route?.params?.class,
        class: 'Economy',
        hb: 0,
        source: 'fresco-home',
        'booking-type': 'official',
        isNonStop: false,
      },
      'flight',
    );

    const date = reformatDateToYYYYMMDD(flight_depart_date);
    const dataItem = `${origin}${destination}${date}`;
    // const dataItem = `DELBOM${date}`;

    setFlightData(result?.data?.resultData?.fltSchedule[dataItem]);
    setCompleteData(result?.data);
    setLoading(false);
  };

  const reformatDateToYYYYMMDD = (dateString: string): string => {
    const [day, month, year] = dateString.split('/');
    return `${year}${month}${day}`;
  };

  function formatDuration(time: string): string {
    const [hours, minutes] = time?.split(':').map(Number);

    const hoursText = hours ? `${hours} Hour${hours !== 1 ? 's' : ''}` : '';
    const minutesText = minutes
      ? `${minutes} Minute${minutes !== 1 ? 's' : ''}`
      : '';

    return [hoursText, minutesText].filter(Boolean).join(' ');
  }

  const FlightCard = ({item}: any) => {
    const flightSegment = item?.OD[0].FS[0];
    const duration = formatDuration(item?.OD[0]?.tdu);
    const totalStops = item?.OD[0].FS.length - 1;
    const fareInfo = flightData[item?.ID]?.O?.ADT;
    const airLinesNames = completedata?.resultData?.fltSchedule?.airlineNames;
    const airportNames = completedata?.resultData?.fltSchedule?.airportNames;
    const date = reformatDateToYYYYMMDD(flight_depart_date);
    // const dataItem = `DELBOM${date}`;
    const dataItem = `${origin}${destination}${date}`;
    const fareDetails =
      completedata?.resultData?.fareDetails[dataItem][item?.ID]?.O;

    // return <></>;

    return (
      <Pressable
        onPress={() =>
          navigation?.navigate('FlightCheckoutScreen', {
            flightDetails: {
              // "isDomestic": true // by default it is true
              searchId: completedata?.resultData?.fltSchedule?.scid,
              msid: completedata?.resultData?.fltSchedule?.scid,
              mode: 'Instant', // "Instant" | "background",
              sc: item?.supplierCode,
              flightIdCSV: item?.ID,
              flightPrice: fareDetails?.ADT?.tf,
              bpc: true,
              isSR: false,
              flight_depart_date,
              destination,
              origin,
              resultObjId: dataItem,
              formateDate: date,
              originCityName: completedata?.cityName[origin],
              destinationCityName: completedata?.cityName[destination],
              duration: duration,
              seatType: seatType,
              flightNumber: flightSegment.fl,
              airlineCode: flightSegment.ac,
              airlineName:
                flightSegment?.dac && airportNames?.[flightSegment.dac]
                  ? airportNames[flightSegment.dac]
                  : '',
            },
          })
        }
        // style={{
        //   width: '100%',
        // }}
        style={styles.card}>
        {/* Airline Info */}
        <View style={styles.airlineRow}>
          <Image
            style={{
              height: 30,
              width: 30,
              marginRight: 8,
            }}
            resizeMode="cover"
            source={require('../../../assets/images/flight_takeoff.png')}
          />
          <Text style={styles.airlineName}>
            {flightSegment?.ac && airLinesNames?.[flightSegment?.ac]
              ? `${airLinesNames[flightSegment?.ac]} (${flightSegment?.ac} - ${
                  flightSegment.fl
                })`
              : ''}
          </Text>
        </View>

        {/* Flight Details */}
        <View style={styles.detailsRow}>
          <View style={styles.timeColumn}>
            {/* <Text style={styles.time}>{airportNames[flightSegment?.aac]}</Text> */}
            <Text style={styles.time}> {origin}</Text>
            <Text style={styles.location}> {flightSegment?.dd}</Text>
          </View>
          <View>
            <Text style={styles.duration}> {duration}</Text>
            <Text
              style={[
                styles.duration,
                {
                  marginTop: 4,
                  borderTopWidth: 1,
                  borderTopColor: Color.secondaryColors200,
                  color: Color.primaryBlue100,
                  fontSize: 12,
                  textAlign: 'center',
                },
              ]}>
              {totalStops > 0 ? `${totalStops} Stops` : 'Non-Stop'}{' '}
            </Text>
          </View>
          <View style={styles.timeColumn}>
            {/* <Text style={styles.time}>
              {' '}
              {flightSegment?.dac && airportNames?.[flightSegment.dac]
                ? airportNames[flightSegment.dac]
                : ''}
            </Text> */}
            <Text style={styles.time}>{destination}</Text>
            <Text style={styles.location}> {flightSegment.ad}</Text>
          </View>
        </View>

        {/* Price and Offers */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {' '}
            ₹{fareDetails?.revisedFareDetails?.tf}
          </Text>
          {/* <Text style={styles.originalPrice}>₹{flight.originalPrice}</Text> */}
        </View>
      </Pressable>
    );
  };

  //

  if (loading) {
    return <Loading />;
  }

  // ================ render

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
            fontSize: 16,
            fontWeight: '700',
          }}>
          Flights
        </Text>
      </Pressable>
      <View style={styles.container}>
        {/* Header Tabs */}
        <View style={styles.tabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              'Price Low to High',
              'Discounted Price',
              'Duration',
              'You May Like',
            ].map(tab => (
              <TouchableOpacity
                onPress={() => setCurrentFilter(tab)}
                key={tab}
                style={[
                  styles.tab,
                  {
                    backgroundColor:
                      currentFilter == tab ? Color.primaryBlue100 : Color.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        currentFilter == tab
                          ? Color.white
                          : Color.primaryBlue100,
                      textAlign: 'center',
                    },
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            padding: 12,
          }}>
          {flightData?.length ? (
            <>
              {flightData?.map((item: any) => (
                <FlightCard item={item} />
              ))}
            </>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Color.secondaryColors100, padding: 10},
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    // flex: 1,
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    marginRight: 8,
    width: 140,
    paddingVertical: 20,
  },
  tabText: {fontSize: 14, fontWeight: 'bold'},
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  airlineRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  logo: {width: 30, height: 30, marginRight: 10},
  airlineName: {fontSize: 14, fontWeight: 'bold', color: Color.primaryBlue100},
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeColumn: {alignItems: 'center'},
  time: {fontSize: 14, fontWeight: 'bold', color: Color.primaryBlue100},
  location: {fontSize: 12, color: Color.primaryBlue100},
  duration: {fontSize: 14, color: Color.primaryBlue100},
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  price: {fontSize: 18, fontWeight: 'bold', color: '#28a745'},
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  offerText: {fontSize: 12, color: '#007bff', marginBottom: 5},
  couponButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  couponText: {fontSize: 12, color: '#fff', fontWeight: 'bold'},
});

export default App;
