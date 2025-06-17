import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StarIcon} from 'react-native-heroicons/outline';
import {Color} from '../../src/GlobalStyles';

const similarHotels = [
  {
    id: '1',
    name: 'The Park Chennai',
    location: 'Nungambakkam',
    rating: 3.7,
    price: '₹2,424',
    tax: '+ ₹428 tax / Night',
    savings: 'You save ₹33,691',
    originalPrice: '₹2,41,309',
  },
  // Add more similar hotels as needed
];

const renderSimilarHotel = ({item}) => (
  <View style={styles.similarHotelCard}>
    <Image
      source={{
        uri: 'https://img.freepik.com/free-vector/flat-hotel-booking-concept_52683-7995.jpg?t=st=1730950728~exp=1730954328~hmac=80039d38613639bfb94988027e82c763bc034dcbee5cf9f6130013c80b7e03bd&w=740',
      }}
      style={styles.similarHotelImage}
    />
    <View style={styles.similarHotelDetails}>
      <Text style={styles.similarHotelName}>{item.name}</Text>
      <Text style={styles.similarHotelLocation}>{item.location}</Text>
      <Text style={styles.similarHotelPrice}>
        {item.price} <Text style={styles.similarHotelTax}>{item.tax}</Text>
      </Text>
      <Text style={styles.similarHotelSavings}>{item.savings}</Text>
      <Text style={styles.similarHotelOriginalPrice}>{item.originalPrice}</Text>
    </View>
  </View>
);

// ====================== component ==========================
export default function OverviewScreen({data}: {data: IHotel}) {
  // ============== states ====================
  const [allAmenitiesVisible, setAllAmenitiesVisible] = useState(false);

  // ====================================== render
  return (
    <>
      {/* Ratings and Reviews */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Ratings and Reviews</Text>
        {/* Sample Rating */}
        <View style={styles.reviewContainer}>
          <Text style={styles.ratingText}>
            <StarIcon size={16} color="#4CAF50" /> {data?.starRating}/5 Good
          </Text>
          <Text style={styles.reviewCount}>(833 Ratings)</Text>
        </View>
      </View>

      {/* Amenities */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Hotel Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {data?.amenities
            ?.slice(0, allAmenitiesVisible ? data?.amenities?.length : 6)
            ?.map((amenity, index) => (
              <Text key={index} style={styles.amenityText}>
                ✓ {amenity}
              </Text>
            ))}
        </View>
        <TouchableOpacity
          onPress={() => setAllAmenitiesVisible(!allAmenitiesVisible)}
          style={styles.viewAmenitiesButton}>
          <Text style={styles.viewAmenitiesText}>
            {allAmenitiesVisible ? 'View Less' : 'View all Amenities'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Policies */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Hotel Policies</Text>
        {/* <View style={styles.policyContainer}> */}
        <Text style={styles.policyText}>
          {data?.cancellation?.cancellationPolicies[0]}
        </Text>
        <Text style={styles.policyText}>Check-out: 12:00PM</Text>

        {/* </View> */}
      </View>

      {/* Similar Hotels */}
      {/* <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Similar Hotels</Text>
        <FlatList
          horizontal
          data={similarHotels}
          renderItem={renderSimilarHotel}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View> */}
    </>
  );
}

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
    width: '49%',
    fontSize: 14,
    color: Color.primaryBlue100,
    marginVertical: 4,
    paddingVertical: 4,
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
