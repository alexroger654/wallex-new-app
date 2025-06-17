import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Button,
} from 'react-native';
import {ShareIcon, StarIcon} from 'react-native-heroicons/outline';
import {ChevronLeftIcon} from 'react-native-heroicons/solid';
import {Color} from '../../GlobalStyles';
import OverviewScreen from '../../../assets/hotel-details/OverviewScreen';
import HotelRoomsScreen from '../../../assets/hotel-details/HotelRoomsScreen';
import usePostData from '../../shared/fetch/usePostData';
import {IRoom} from '../../shared/interfaces/hotel-room.interface';
import LoadingScreen from '../LoadingScreen';
import {useTheme} from '../../context/ThemeProvider';

const tabs = ['Overview', 'Rooms'];

interface ISelectedRoom {
  ratePlanId: string;
  roomTypeId: string;
  tax: number;
  price: number;
  quantity: number;
  roomName: string;
  basePrice: number;
}

const HotelDetailsScreen = ({navigation, route}: any) => {
  // ===================== states ====================
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedRooms, setSelectedRoom] = useState<ISelectedRoom[]>([]);
  const [additionalData, setAdditionalData] = useState<IRoom[]>([]);
  const [Loading, setLoading] = useState(false);

  // ============= fetch handlers
  async function getHotelList() {
    setLoading(true);
    const data = await usePostData(
      `get-rates-by-hotel`,
      {
        hotelId: route?.params?.data?.id,
        checkInDate: route?.params?.checkInDate,
        checkOutDate: route?.params?.checkOutDate,
        rooms: route?.params?.rooms,
      },
      'hotel',
    );
    setAdditionalData(data?.data?.rates);
    setLoading(false);
  }
  const {
    data,
    rooms,
    checkOutDate,
    checkInDate,
    city,
  }: {
    data: IHotel;
    rooms: any;
    checkOutDate: string;
    checkInDate: string;
    city: string;
  } = route?.params;

  const {color} = useTheme();

  useEffect(() => {
    getHotelList();
    setSelectedRoom([]);
  }, []);

  if (Loading) {
    return <LoadingScreen />;
  }

  // ================= render ==================
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Hotel Image and Back/Share Buttons */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: data?.images[0]?.url,
            }}
            style={styles.hotelImage}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <ChevronLeftIcon size={24} color="#fff" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.shareButton}>
            <ShareIcon size={24} color="#0" />
          </TouchableOpacity> */}
        </View>

        {/* Hotel Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.hotelName}>{data?.vendorName}</Text>
          <Text style={styles.hotelLocation}>
            {data?.starRating}-Star Hotel - {data?.address.area} ,{' '}
            {data?.address.city}
          </Text>

          {/* ===================== Tabs (Ratings, Location, Amenities, etc.) */}
          <View style={styles.tabsContainer}>
            <FlatList
              horizontal
              data={tabs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => setActiveTab(item)}
                  style={styles.tab}>
                  <Text
                    style={[
                      styles.tabText,
                      {
                        backgroundColor:
                          activeTab == item
                            ? color.primaryBlue100
                            : color.lightColor,
                        padding: 9,
                        borderRadius: 8,
                        color:
                          activeTab == item
                            ? color.white
                            : color.primaryBlue100,
                      },
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.tabsContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {activeTab == 'Overview' ? (
          <>
            <OverviewScreen data={data} />
          </>
        ) : (
          <></>
        )}
        {activeTab == 'Rooms' ? (
          <>
            <HotelRoomsScreen
              data={data}
              setSelectedRoom={setSelectedRoom}
              selectedRooms={selectedRooms}
              additionalData={additionalData}
              bookingData={{
                checkInDate: route?.params?.checkInDate,
                checkOutDate: route?.params?.checkOutDate,
                rooms: route?.params?.rooms,
              }}
            />
          </>
        ) : (
          <></>
        )}
        {activeTab == 'Amenities' ? (
          <>
            <OverviewScreen data={data} />
          </>
        ) : (
          <></>
        )}
        {activeTab == 'Policies' ? (
          <>
            <OverviewScreen data={data} />
          </>
        ) : (
          <></>
        )}
      </ScrollView>

      {/* Footer: Price and Select Room Button */}
      <View style={styles.footerContainer}>
        <View>
          <Text
            style={{
              color: color?.secondaryTextColor,
            }}>
            {selectedRooms?.length} x Room Selected
          </Text>
          <Text style={styles.footerPrice}>
            ₹{selectedRooms.reduce((acc, room) => acc + room.price, 0)} + ₹
            {selectedRooms.reduce((acc, room) => acc + room.tax, 0)} tax
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (selectedRooms?.length) {
              navigation.navigate('TravelerDetailsScreen', {
                checkOutDate: route?.params?.checkOutDate,
                checkInDate: route?.params?.checkInDate,
                rooms: route?.params?.rooms,
                selectedRooms: selectedRooms,
                data: data,
              });
            } else {
              setActiveTab('Rooms');
            }
          }}
          style={styles.selectRoomButton}>
          <Text style={styles.selectRoomText}>
            {selectedRooms?.length ? 'Continue' : 'Select Room'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
  },
  hotelImage: {
    width: '100%',
    height: 200,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  shareButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  hotelLocation: {
    fontSize: 14,
    color: '#888',
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  reviewCount: {
    color: Color?.secondaryColors500,
    fontSize: 12,
    marginLeft: 8,
  },
  ratingCount: {
    marginLeft: 8,
    color: '#888',
  },
  dateGuestsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginVertical: 12,
  },
  dateText: {
    fontSize: 16,
    color: Color.primaryBlue100,
  },
  guestsText: {
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Color.secondaryColors100,
    marginTop: 10,
  },
  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 8,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityText: {
    width: '33%',
    fontSize: 14,
    color: Color.primaryBlue100,
    marginVertical: 4,
    paddingVertical: 12,
  },
  viewAmenitiesButton: {
    alignItems: 'center',
    marginVertical: 8,
  },
  viewAmenitiesText: {
    color: '#007BFF',
  },
  policyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  policyText: {
    width: '50%',
    fontSize: 14,
    marginVertical: 4,
    color: Color.primaryBlue100,
  },
  similarHotelCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  similarHotelImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  similarHotelDetails: {
    padding: 8,
  },
  similarHotelName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  similarHotelLocation: {
    fontSize: 12,
    color: '#888',
  },
  similarHotelPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  similarHotelTax: {
    fontSize: 12,
    color: '#888',
  },
  similarHotelSavings: {
    fontSize: 12,
    color: '#4CAF50',
  },
  similarHotelOriginalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  footerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  selectRoomButton: {
    backgroundColor: Color.primaryBlue100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectRoomText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default HotelDetailsScreen;
