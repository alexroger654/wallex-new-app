import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const RoomDetailsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Review</Text>

      {/* Hotel Info Card */}
      <View style={styles.hotelCard}>
        <View style={styles.hotelInfo}>
          <View style={{flex: 1}}>
            <Text style={styles.hotelStars}>3-star hotel in Nungambakkam</Text>
            <Text style={styles.hotelName}>The Park Chennai</Text>
            <View style={styles.rating}>
              {/* Dummy star icons */}
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
            </View>
          </View>
          <Image
            source={{uri: 'https://link-to-hotel-image.jpg'}} // replace with actual image URL
            style={styles.hotelImage}
          />
        </View>
        <View style={styles.dateInfo}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Check-in</Text>
            <Text style={styles.dateValue}>14 Apr</Text>
            <Text style={styles.dateDetail}>Sun, 12 PM</Text>
          </View>
          <View style={styles.nights}>
            <Text style={styles.nightsText}>4 Nights</Text>
          </View>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Check-out</Text>
            <Text style={styles.dateValue}>18 Apr</Text>
            <Text style={styles.dateDetail}>Thu, 11 AM</Text>
          </View>
        </View>
        <Text style={styles.roomInfo}>1 Room, 2 Guests</Text>
        <Text style={styles.detailsLink}>Details</Text>
      </View>

      {/* Room Details */}
      <View style={styles.roomDetails}>
        <Text style={styles.sectionTitle}>Residence Room Only</Text>
        <Text style={styles.detailsLink}>See Room Details</Text>
        <View style={styles.amenities}>
          <Text style={styles.amenity}>✓ Air Conditioning</Text>
          <Text style={styles.amenity}>✓ WiFi</Text>
        </View>
      </View>

      {/* Policies */}
      <View style={styles.policyContainer}>
        <Text style={styles.sectionTitle}>Cancellation Policy</Text>
        <Text style={styles.policyText}>
          Lorem ipsum dolor sit amet consectetur. Neque ut metus nam id massa at
          tincidunt.
        </Text>
      </View>
      <TouchableOpacity style={styles.policyButton}>
        <Text style={styles.policyTitle}>Booking Policy</Text>
        <Text style={styles.policySummary}>Policy Summary ➔</Text>
      </TouchableOpacity>

      {/* Price Breakdown */}
      <View style={styles.priceBreakdown}>
        <Text style={styles.sectionTitle}>Price Breakup</Text>
        <View style={styles.priceRow}>
          <Text>1 room x 4 nights</Text>
          <Text>₹ 16,790</Text>
        </View>
        <View style={styles.priceRow}>
          <Text>Hotel taxes</Text>
          <Text>₹ 1,730</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.totalText}>Total Amount</Text>
          <Text style={styles.totalText}>₹ 17,924</Text>
        </View>
      </View>

      {/* Savings and Continue Button */}
      <View style={styles.savingsContainer}>
        <Text style={styles.savingsText}>You save ₹33,691</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalAmount}>₹17,924 (total with taxes)</Text>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  hotelCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  hotelInfo: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  hotelStars: {
    color: '#666',
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    flexDirection: 'row',
    marginTop: 5,
  },
  star: {
    fontSize: 16,
    color: '#f4c430',
  },
  hotelImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginLeft: 10,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    color: '#666',
  },
  dateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateDetail: {
    color: '#666',
  },
  nights: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
  nightsText: {
    color: '#00796b',
    fontWeight: 'bold',
  },
  roomInfo: {
    marginTop: 10,
    color: '#666',
  },
  detailsLink: {
    color: '#00796b',
    fontWeight: 'bold',
    marginTop: 5,
  },
  roomDetails: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amenities: {
    flexDirection: 'row',
    marginTop: 5,
  },
  amenity: {
    marginRight: 10,
    color: '#333',
  },
  policyContainer: {
    marginBottom: 20,
  },
  policyText: {
    color: '#666',
  },
  policyButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  policyTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  policySummary: {
    color: '#00796b',
  },
  priceBreakdown: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
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
    paddingVertical: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#00796b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoomDetailsScreen;
