import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Color, FontFamily, FontSize} from '../../GlobalStyles';
import useGetData from '../../shared/fetch/useGetData';
import usePostData from '../../shared/fetch/usePostData';
import LoadingScreen from '../LoadingScreen';

export default function HotelSearchScreen({navigation, route}: any) {
  // ========================= states ================
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [Loading, setLoading] = useState(false);

  function formatDateToYYYYMMDD(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // ============= fetch handlers
  async function getHotelList() {
    setLoading(true);
    const data = await usePostData(
      `get-rates-by-city`,
      {
        city: route?.params?.city,
        checkInDate: formatDateToYYYYMMDD(route?.params?.checkInDate),
        checkOutDate: formatDateToYYYYMMDD(route?.params?.checkOutDate),
        rooms: route?.params?.rooms?.map((item: any) => {
          return {
            noOfAdults: item?.adults,
            noOfChildren: item?.children,
            childrenAge: item?.childAges,
          };
        }),
      },
      'hotel',
    );

    setHotels(data?.data?.hotels);
    setLoading(false);
  }

  useEffect(() => {
    getHotelList();
  }, []);

  if (Loading) {
    return <LoadingScreen />;
  }

  // ====================== render ====================
  return (
    <View>
      {/* ================== header */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
          paddingHorizontal: 16,
          paddingVertical: 24,
          backgroundColor: Color.primaryBlue100,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
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

      <ScrollView>
        {/* Hotels List */}
        <View style={styles.hotelsContainer}>
          {/* <Text style={styles.sectionTitle}>Most Popular Hotels in Chennai</Text> */}
          {hotels?.map((item, index) => (
            <Pressable
              onPress={() => {
                navigation?.navigate('HotelDetailsScreen', {
                  data: item,
                  city: route?.params?.city,
                  checkInDate: formatDateToYYYYMMDD(route?.params?.checkInDate),
                  checkOutDate: formatDateToYYYYMMDD(
                    route?.params?.checkOutDate,
                  ),
                  rooms: route?.params?.rooms?.map((item: any) => {
                    return {
                      noOfAdults: item?.adults,
                      noOfChildren: item?.children,
                      childrenAge: item?.childAges,
                    };
                  }),
                });
              }}
              key={index}
              style={styles.hotelCard}>
              <Image
                source={{uri: item?.images[0]?.url}}
                style={styles.hotelImage}
              />
              <Text style={styles.hotelRating}>{item?.starRating}</Text>
              <Text style={styles.hotelName}>
                {item?.address.area}, {item?.address.city}
              </Text>
              {/* <Text style={styles.hotelLocation}>Nungambakkam</Text> */}
              <Text style={styles.hotelPrice}>
                ₹{item?.rates[0]?.pricing?.perNight?.price} + ₹
                {item?.rates[0]?.pricing?.perNight?.taxes[0]?.amount} tax /
                Night
              </Text>
              <Text style={styles.hotelOldPrice}>₹2,41,309</Text>
              <Text style={styles.hotelDiscount}>You save ₹33,691</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hotelsContainer: {marginVertical: 15, padding: 20},
  hotelCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },
  hotelImage: {width: '100%', height: 150, borderRadius: 10},
  hotelRating: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#007b83',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: Color.primaryBlue100,
  },
  hotelLocation: {color: '#555', fontSize: 12},
  hotelPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
    color: Color.primaryBlue100,
  },
  hotelOldPrice: {color: '#aaa', textDecorationLine: 'line-through'},
  hotelDiscount: {color: '#007b83', fontSize: 12, fontWeight: 'bold'},
  picker: {
    padding: 8,
    borderRadius: 10,
    marginBottom: 5,
    color: Color.primaryBlue100,
    backgroundColor: Color.secondaryColors100,
    height: 50,
  },
  viewMoreProducts: {
    width: 140,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: '500',
    fontSize: FontSize.size_sm,
  },
  viewMoreProductsWrapper: {
    borderRadius: 12,
    marginTop: 20,
    backgroundColor: Color.primaryBlue100,
    paddingVertical: 16,
    overflow: 'hidden',
  },
  wrapperFlexBox: {
    paddingHorizontal: 0,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addToCartClr: {
    color: Color.white,
    textAlign: 'center',
  },
});
