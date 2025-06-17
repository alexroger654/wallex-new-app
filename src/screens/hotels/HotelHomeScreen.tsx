import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {Color, FontFamily, FontSize} from '../../GlobalStyles';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import useGetData from '../../shared/fetch/useGetData';
import SelectRoomAndGuest from '../../component/digigold/SelectRoomAndGuest';
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import {Dropdown} from 'react-native-element-dropdown';
const HotelHomeScreen = ({navigation}: any) => {
  const [cityList, setCityList] = useState<{label: string; value: string}[]>(
    [],
  );
  const [city, setCity] = useState('Bangalore');
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rooms, setRooms] = useState([
    {adults: 1, children: 1, childAges: [5]},
  ]);

  const onCheckInChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || checkInDate;
    setShowCheckIn(false);
    setCheckInDate(currentDate);
  };

  const onCheckOutChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || checkOutDate;
    setShowCheckOut(false);
    setCheckOutDate(currentDate);
  };

  async function getCityList() {
    const data = await useGetData(`cities`, 'hotel');
    const formattedData =
      data?.data?.map((city: string) => ({
        label: city,
        value: city,
      })) || [];
    setCityList(formattedData);
  }

  useEffect(() => {
    getCityList();
  }, []);

  // ===================== render =========================
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 20,
          }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              padding: 24,
            }}>
            <ChevronLeftIcon size={22} color={Color.white} />
            <Text style={styles.headerText}>Hotel Booking</Text>
          </Pressable>
          <Pressable onPress={() => navigation?.navigate('HotelBookingList')}>
            <CalendarDaysIcon size={22} color={Color.white} />
          </Pressable>
        </View>
      </View>

      <View style={{padding: 24}}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          {/* City */}
          <View
            style={[
              styles.picker,
              {
                justifyContent: 'center',
              },
            ]}>
            <Dropdown
              data={cityList}
              labelField="label"
              valueField="value"
              placeholder="Select a City"
              value={city}
              onChange={item => setCity(item.value)}
              placeholderStyle={{
                fontSize: 16,
                color: Color.secondaryColors300,
              }}
              selectedTextStyle={{
                fontSize: 16,
                color: Color.primaryBlue100,
              }}
              // style={styles.dropdown}
              // placeholderStyle={styles.placeholderStyle}
              // selectedTextStyle={styles.selectedTextStyle}
              // inputSearchStyle={styles.inputSearchStyle}
              search
            />
          </View>

          <View style={{flexDirection: 'row', width: '100%', gap: 20}}>
            {/* Check-in Date */}
            <View>
              <Text style={styles.label}>Check-in Date</Text>
              <Pressable
                onPress={() => setShowCheckIn(true)}
                style={[
                  styles.picker,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: 14, color: Color.primaryBlue100}}>
                  {checkInDate.toDateString()}
                </Text>
              </Pressable>
              {showCheckIn && (
                <DateTimePicker
                  value={checkInDate}
                  mode="date"
                  display="default"
                  onChange={onCheckInChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            {/* Check-out Date */}
            <View>
              <Text style={styles.label}>Check-out Date</Text>
              <Pressable
                onPress={() => setShowCheckOut(true)}
                style={[
                  styles.picker,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Text style={{fontSize: 14, color: Color.primaryBlue100}}>
                  {checkOutDate.toDateString()}
                </Text>
              </Pressable>
              {showCheckOut && (
                <DateTimePicker
                  value={checkOutDate}
                  mode="date"
                  display="default"
                  onChange={onCheckOutChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
          </View>

          <Pressable
            onPress={() => setIsModalVisible(true)}
            style={{marginVertical: 12}}>
            <Text style={{fontWeight: '700', color: Color.primaryBlue100}}>
              {rooms?.length} Room,{' '}
              {rooms.reduce((sum, room) => sum + room.adults, 0)} guests
            </Text>
            <Text style={{color: Color.primaryBlue50, fontSize: 12}}>
              {rooms.reduce((sum, room) => sum + room.adults, 0)} adults,{' '}
              {rooms.reduce((sum, room) => sum + room.children, 0)} Children
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate('HotelSearchScreen', {
                rooms,
                checkOutDate,
                checkInDate,
                city,
              })
            }
            style={[styles.viewMoreProductsWrapper, styles.wrapperFlexBox]}>
            <Text style={[styles.viewMoreProducts, styles.addToCartClr]}>
              Search
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          padding: 20,
        }}>
        {/* Popular Cities */}
        <View style={styles.popularCitiesContainer}>
          <Text style={styles.sectionTitle}>
            Search For hotels in Popular Cities!
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* {cityList?.slice(0, 10)?.map(city => (
              <View key={city} style={styles.cityContainer}>
                <Image
                  source={{
                    uri: 'https://img.freepik.com/free-vector/hand-drawn-mumbai-illustration_23-2149447057.jpg?t=st=1730950319~exp=1730953919~hmac=85978ae4ed326eeb93f7b2f73b99df3560796ffb0912713a5b570308f32812a9&w=740',
                  }}
                  style={styles.cityIcon}
                />
                <Text style={styles.cityText}>{city}</Text>
              </View>
            ))} */}
          </ScrollView>
        </View>

        {/* Offers */}
        <View style={styles.offerContainer}>
          <Text style={styles.offerTitle}>Your Bookings</Text>
          <Text style={styles.offerDescription}>
            Lorem ipsum dolor sit amet consectetur. Urna urna aliquam turpis
            risus aliquam.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('HotelBookingList')}
            style={styles.claimButton}>
            <Text style={styles.claimButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>

        {/* Hotels List */}
        <View style={styles.hotelsContainer}>
          <Text style={styles.sectionTitle}>
            Most Popular Hotels in Chennai
          </Text>
          {[1, 2].map((_, index) => (
            <View key={index} style={styles.hotelCard}>
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-vector/flat-hotel-booking-concept_52683-7995.jpg?t=st=1730950728~exp=1730954328~hmac=80039d38613639bfb94988027e82c763bc034dcbee5cf9f6130013c80b7e03bd&w=740',
                }}
                style={styles.hotelImage}
              />
              <Text style={styles.hotelRating}>3.7</Text>
              <Text style={styles.hotelName}>The Park Chennai</Text>
              <Text style={styles.hotelLocation}>Nungambakkam</Text>
              <Text style={styles.hotelPrice}>₹2,424 + ₹428 tax / Night</Text>
              <Text style={styles.hotelOldPrice}>₹2,41,309</Text>
              <Text style={styles.hotelDiscount}>You save ₹33,691</Text>
            </View>
          ))}
        </View>
      </View>

      <SelectRoomAndGuest
        rooms={rooms}
        setRooms={setRooms}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Color.white},
  header: {backgroundColor: Color.primaryBlue100, height: 244},
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  searchContainer: {
    backgroundColor: Color.white,
    padding: 15,
    borderRadius: 10,
    marginTop: -190,
    elevation: 1,
  },
  searchInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
    marginBottom: 10,
  },
  label: {color: '#555', fontSize: 12, marginTop: 10},
  date: {fontSize: 16, fontWeight: 'bold'},
  nights: {color: '#007b83', fontSize: 12, marginBottom: 10},
  roomInfo: {color: '#333', marginBottom: 10},
  popularCitiesContainer: {marginVertical: 15},
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.primaryBlue100,
  },
  cityContainer: {alignItems: 'center', marginRight: 10},
  cityIcon: {width: 80, height: 80, backgroundColor: '#ccc', borderRadius: 10},
  cityText: {
    marginTop: 5,
    fontSize: 12,
    color: Color.primaryBlue100,
    fontWeight: '600',
  },
  offerContainer: {
    backgroundColor: '#6a0dad',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
  },
  offerTitle: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  offerDescription: {color: '#fff', marginVertical: 5},
  claimButton: {
    backgroundColor: '#4e0099',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  claimButtonText: {color: '#fff', textAlign: 'center'},
  hotelsContainer: {marginVertical: 15},
  hotelCard: {
    backgroundColor: '#fff',
    padding: 15,
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
  hotelPrice: {fontSize: 14, fontWeight: 'bold', marginVertical: 5},
  hotelOldPrice: {color: '#aaa', textDecorationLine: 'line-through'},
  hotelDiscount: {color: '#007b83', fontSize: 12, fontWeight: 'bold'},
  picker: {
    padding: 8,
    borderRadius: 8,
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

export default HotelHomeScreen;
