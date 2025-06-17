import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {
  Border,
  Padding,
  Gap,
  Color,
  FontFamily,
  FontSize,
} from '../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {flightSearchData} from './searchData';
import Options from './FareOption';
import useGetData from '../../shared/fetch/useGetData';
import usePostData from '../../shared/fetch/usePostData';
import Loading from '../../component/Loading';
import {ColorSpace} from 'react-native-reanimated';

//////////////////// component ==========================
const FlightSearchResultScreen = ({navigation, route}: any) => {
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
    const [hours, minutes] = time.split(':').map(Number);

    const hoursText = hours ? `${hours} Hour${hours !== 1 ? 's' : ''}` : '';
    const minutesText = minutes
      ? `${minutes} Minute${minutes !== 1 ? 's' : ''}`
      : '';

    return [hoursText, minutesText].filter(Boolean).join(' ');
  }

  const FlightCard = ({item}: any) => {
    const flightSegment = item.OD[0].FS[0];
    const duration = formatDuration(item.OD[0]?.tdu);
    const totalStops = item.OD[0].FS.length - 1;
    const fareInfo = flightData[item.ID]?.O?.ADT;
    const airLinesNames = completedata?.resultData?.fltSchedule?.airlineNames;
    const airportNames = completedata?.resultData?.fltSchedule?.airportNames;
    const date = reformatDateToYYYYMMDD(flight_depart_date);
    // const dataItem = `DELBOM${date}`;
    const dataItem = `${origin}${destination}${date}`;
    const fareDetails =
      completedata?.resultData?.fareDetails[dataItem][item?.ID]?.O;

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
        style={{
          width: '100%',
        }}>
        <View style={styles.ticketChildLayout}>
          <View style={styles.frameView}>
            <View style={styles.parentFlexBox2}>
              <Text style={[styles.indigoFlights, styles.chennaiText]}>
                {flightSegment?.ac && airLinesNames?.[flightSegment.ac]
                  ? `${airLinesNames[flightSegment.ac]} (${
                      flightSegment.ac
                    } - ${flightSegment.fl})`
                  : ''}
              </Text>
            </View>
            <View style={[styles.frameParent1, styles.parentFlexBox1]}>
              <View style={styles.parent}>
                <Text style={[styles.text, styles.rs1Typo]}>
                  {flightSegment.dd}
                </Text>
                <Text style={[styles.chennai, styles.chennaiText]}>
                  {flightSegment?.dac && airportNames?.[flightSegment.dac]
                    ? airportNames[flightSegment.dac]
                    : ''}
                </Text>
              </View>
              <Image
                style={styles.flightTakeoffIcon}
                resizeMode="cover"
                source={require('../../../assets/images/flight_takeoff.png')}
              />
              <View style={styles.parent}>
                <Text style={[styles.text, styles.rs1Typo]}>
                  {' '}
                  {flightSegment.ad}
                </Text>
                <Text style={[styles.chennai, styles.chennaiText]}>
                  {airportNames[flightSegment.aac]}{' '}
                </Text>
              </View>
            </View>
            <Text style={[styles.h55m, styles.chennaiText]}>
              {duration} | {totalStops > 0 ? `${totalStops} Stops` : 'Non-Stop'}{' '}
            </Text>
          </View>
          <View style={[styles.rsParent, styles.parentFlexBox]}>
            {/* <Text style={[styles.rs, styles.rsTypo]}>8,999rs</Text> */}
            <Text style={[styles.rs1, styles.rs1Typo]}>
              ₹{fareDetails?.revisedFareDetails?.tf}
            </Text>
            <Text style={[styles.off, styles.parentFlexBox1]}>15% off</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return <Loading />;
  }

  // ========================= render =====================

  return (
    <View style={styles.flightSearchResults}>
      <View style={styles.flightSearchResultsChild} />
      <Pressable
        style={[styles.arrowBackIos, styles.arrowBackIosLayout]}
        onPress={() => navigation.goBack()}>
        <ChevronLeftIcon size={24} color="#fff" />
      </Pressable>

      <Text style={[styles.chennaiInd, styles.apr2023Position]}>
        {completedata?.cityName[origin]} - {completedata?.cityName[destination]}
      </Text>
      <Text style={[styles.apr2023, styles.rsTypo]}>1 Apr, 2023 - 4 seats</Text>
      <ScrollView contentContainerStyle={styles.ticketParent}>
        {flightData?.map((item: any) => (
          <FlightCard item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowBackIosLayout: {
    height: 24,
    width: 24,
    top: 40,
  },
  groupChildLayout: {
    height: 239,
    width: 360,
    left: 0,
    position: 'absolute',
  },
  parentFlexBox1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chennaiText: {
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  parentLayout: {
    borderRadius: Border.br_3xs,
    position: 'absolute',
  },
  frameFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xs,
    justifyContent: 'space-between',
    width: 312,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  parentFlexBox2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  parentFlexBox: {
    gap: Gap.gap_sm,
    alignItems: 'center',
  },
  apr2023Position: {
    left: 65,
    position: 'absolute',
  },
  rsTypo: {
    color: Color.primaryBlue50,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  ticketChild8Position: {
    left: 312,
    position: 'absolute',
  },
  ticketChildLayout: {
    height: 140,
    width: '80%',
    backgroundColor: Color.white,
    borderRadius: 10,
    marginBottom: 14,
    marginHorizontal: 'auto',
  },
  lineViewPosition: {
    left: 216,
    position: 'absolute',
  },
  rs1Typo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: '600',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  flightSearchResultsChild: {
    height: 110,
    width: '100%',
    backgroundColor: Color.primaryBlue100,
    left: 0,
    top: 0,
    position: 'absolute',
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  arrowBackIos: {
    left: 24,
    position: 'absolute',
  },
  eclipseStrokeIcon: {
    top: 478,
    left: -115,
    width: 590,
    height: 590,
    opacity: 0.1,
    position: 'absolute',
  },
  groupChild: {
    top: 0,
  },
  continue: {
    color: Color.white,
    textAlign: 'left',
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    textTransform: 'capitalize',
    fontSize: FontSize.size_base,
  },
  navigateNextIcon: {
    width: 25,
    height: 25,
  },
  continueParent: {
    top: 162,
    left: 37,
    width: 286,
    height: 57,
    paddingHorizontal: 32,
    paddingVertical: 8,
    flexDirection: 'row',
    borderRadius: Border.br_3xs,
    position: 'absolute',
    backgroundColor: Color.primaryBlue100,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  choosePaymentMethod: {
    top: 17,
    color: Color.primaryBlue100,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    textAlign: 'left',
    textTransform: 'capitalize',
    left: 24,
    position: 'absolute',
  },
  radioBtnIcon: {
    width: 16,
    height: 16,
  },
  payUsingUpi: {
    color: Color.primaryBlue100,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    textAlign: 'left',
    textTransform: 'capitalize',
    fontSize: FontSize.size_base,
  },
  radioBtnParent: {
    gap: Gap.gap_md,
  },
  download2Icon: {
    width: 20,
    height: 20,
  },
  googlePayIcon1: {
    width: 18,
    height: 15,
  },
  image1Icon: {
    width: 19,
    height: 19,
  },
  download2Parent: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  frameGroup: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: Color.colorAliceblue_100,
  },
  image12Icon: {
    width: 44,
    height: 16,
  },
  frameParent: {
    top: 46,
    left: 24,
    backgroundColor: Color.secondaryColors100,
  },
  vectorParent: {
    top: 801,
  },
  chennaiInd: {
    top: 34,
    textAlign: 'left',
    textTransform: 'capitalize',
    color: Color.white,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    fontSize: FontSize.size_base,
  },
  apr2023: {
    top: 58,
    fontSize: FontSize.size_xs,
    left: 65,
    position: 'absolute',
  },
  filterListIcon: {
    height: 24,
    width: 24,
    top: 40,
  },
  ticketChild: {
    left: 0,
    height: 108,
    top: 0,
    position: 'absolute',
  },
  ticketItem: {
    top: 15,
    width: 0,
    height: 78,
  },
  indigoFlights: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    color: Color.primaryBlue100,
    textTransform: 'capitalize',
    textAlign: 'left',
  },
  text: {
    fontSize: FontSize.size_5xl,
    color: Color.secondaryColors700,
  },
  chennai: {
    color: Color.secondaryColors400,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
    textTransform: 'capitalize',
    textAlign: 'left',
  },
  parent: {
    gap: Gap.gap_md,
  },
  flightTakeoffIcon: {
    width: 30,
    height: 30,
    overflow: 'hidden',
  },
  frameParent1: {
    gap: Gap.gap_lg,
    flexDirection: 'row',
  },
  h55m: {
    fontSize: FontSize.size_3xs,
    color: Color.secondaryColors600,
    fontFamily: FontFamily.poppinsRegular,
    textTransform: 'capitalize',
    textAlign: 'left',
  },
  frameView: {
    top: 13,
    left: 13,
    gap: Gap.gap_md,
    position: 'absolute',
  },
  rs: {
    textDecorationLine: 'line-through',
    fontSize: FontSize.size_sm,
  },
  rs1: {
    fontSize: FontSize.size_base,
    color: Color.primaryBlue100,
  },
  off: {
    color: Color.primaryGreen100,
    textAlign: 'center',
    display: 'flex',
    width: 74,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_xs,
  },
  rsParent: {
    top: 29,
    left: 229,
    position: 'absolute',
  },
  lineView: {
    top: 14,
    borderStyle: 'dashed',
    borderRadius: 0.001,
    borderRightWidth: 2,
    width: 2,
    height: 80,
    borderColor: Color.colorAliceblue_100,
  },
  ticketChild8: {
    left: 312,
    position: 'absolute',
    top: 0,
  },
  ticketParent: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
    marginTop: 140,
    alignItems: 'center',
  },
  flightSearchResults: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Color.secondaryColors100,
    // backgroundColor: 'red',
  },
});

export default FlightSearchResultScreen;
