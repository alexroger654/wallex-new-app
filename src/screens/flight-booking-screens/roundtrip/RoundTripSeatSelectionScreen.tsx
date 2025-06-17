import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {ChevronLeftIcon, UserIcon} from 'react-native-heroicons/outline';
import {Color} from '../../../GlobalStyles';

const RoundTripSeatSelectionScreen = () => {
  // Seat layout and initial states
  const rows = 8;
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const unavailableSeats = ['1B', '2A', '3C', '4F', '5D', '6E'];
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Handle seat selection
  const handleSeatSelect = seat => {
    setSelectedSeat(selectedSeat === seat ? null : seat);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ChevronLeftIcon size={24} color="#000" />
        <Text style={styles.headerText}>Select Seat</Text>
      </View>

      <ScrollView
        style={{
          padding: 16,
        }}>
        {/* Flight Info */}
        <View style={styles.flightInfoContainer}>
          <Text style={styles.flightDate}>WED, OCT 26 2022</Text>
          <View style={styles.flightRoute}>
            <Text style={styles.flightLocation}>Gotham, USA (GTH)</Text>
            {/* <Icon name="flight" size={20} color="#fff" /> */}
            <Text style={styles.flightLocation}>Khandaq, USA (KHQ)</Text>
          </View>
          <Text style={styles.flightTime}>9:37 PM</Text>
        </View>

        {/* Seat Map */}
        <View style={styles.seatMapContainer}>
          {Array.from({length: rows}, (_, rowIndex) => (
            <View key={rowIndex} style={styles.seatRow}>
              {columns.map((col, colIndex) => {
                const seat = `${rowIndex + 1}${col}`;
                const isUnavailable = unavailableSeats.includes(seat);
                const isSelected = selectedSeat === seat;

                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.seat,
                      isUnavailable
                        ? styles.unavailableSeat
                        : styles.availableSeat,
                      isSelected && styles.selectedSeat,
                    ]}
                    disabled={isUnavailable}
                    onPress={() => handleSeatSelect(seat)}>
                    <Text
                      style={
                        isUnavailable
                          ? styles.unavailableSeatText
                          : styles.seatText
                      }>
                      {col}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.selectedSeat]} />
            <Text style={styles.legendText}>Selected</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.availableSeat]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.unavailableSeat]} />
            <Text style={styles.legendText}>Not Available</Text>
          </View>
        </View>

        {/* Selected Seat */}
        <View style={styles.selectedSeatContainer}>
          <View>
            <Text style={styles.selectedSeatLabel}>Selected Seat:</Text>
            {selectedSeat ? (
              <View style={styles.selectedSeatTag}>
                <UserIcon size={16} color="#fff" />
                <Text style={styles.selectedSeatText}>
                  {' '}
                  #1 | {selectedSeat}
                </Text>
              </View>
            ) : (
              <Text style={styles.noSeatSelected}>No seat selected</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Book Now Button */}
      <TouchableOpacity style={styles.bookButton} disabled={!selectedSeat}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003366',
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
  flightInfoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  flightDate: {
    color: '#777',
    fontSize: 14,
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  flightLocation: {
    color: '#333',
    fontSize: 16,
    marginHorizontal: 8,
  },
  flightTime: {
    color: '#333',
    fontSize: 14,
  },
  seatMapContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  seat: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availableSeat: {
    backgroundColor: Color.secondaryColors100,
  },
  unavailableSeat: {
    backgroundColor: '#F0F0F0',
  },
  selectedSeat: {
    backgroundColor: Color.primaryBlue100,
  },
  seatText: {
    color: Color.white,
  },
  unavailableSeatText: {
    color: Color.primaryBlue100,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    color: '#555',
    fontSize: 12,
  },
  selectedSeatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedSeatLabel: {
    fontSize: 16,
    color: '#333',
  },
  selectedSeatTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003366',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
  selectedSeatText: {
    color: '#fff',
    fontSize: 14,
  },
  noSeatSelected: {
    fontSize: 14,
    color: '#777',
    marginLeft: 8,
  },
  bookButton: {
    backgroundColor: '#003366',
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoundTripSeatSelectionScreen;
