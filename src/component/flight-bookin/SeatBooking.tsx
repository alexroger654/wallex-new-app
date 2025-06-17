import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Color} from '../../GlobalStyles';

const SeatBooking = ({data, selectedSeat, setSelectedSeat}: any) => {
  const rows = Object.entries(data.seatLayout.Maindeck.rowInfo);

  const handleSeatPress = seat => {
    if (seat.avl) {
      setSelectedSeat(seat.sn);
    }
  };

  const renderSeat = seat => {
    const isAvailable = seat.avl;
    const isSelected = seat.sn === selectedSeat;
    return (
      <TouchableOpacity
        key={seat.sn}
        style={[
          styles.seat,
          isAvailable ? styles.availableSeat : styles.unavailableSeat,
          isSelected && styles.selectedSeat,
        ]}
        disabled={!isAvailable}
        onPress={() => handleSeatPress(seat)}>
        <Text
          style={[styles.seatText, !isAvailable && styles.unavailableSeatText]}>
          {seat.sn}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRow = ([rowNumber, rowData]) => (
    <View key={rowNumber} style={styles.row}>
      {/* <Text style={styles.rowNumber}></Text> */}
      <View style={styles.seatRow}>
        {rowData.rseats.map(seat => renderSeat(seat))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Select Seat</Text> */}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {rows.map(renderRow)}
      </ScrollView>
      {/* <View style={styles.footer}>
        <Text style={styles.selectedSeatText}>
          Selected Seat: {selectedSeat ? selectedSeat : 'None'}
        </Text>
        <TouchableOpacity style={styles.bookButton} disabled={!selectedSeat}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    padding: 16,
    // backgroundColor: '#002D62',
    // alignItems: 'center',
  },
  headerText: {
    color: Color.primaryBlue100,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    // marginVertical: 8,
  },
  rowNumber: {
    width: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
  seatRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    // paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seat: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  availableSeat: {
    backgroundColor: '#e0f7e0',
    borderColor: '#28a745',
  },
  unavailableSeat: {
    backgroundColor: '#f7e0e0',
    borderColor: '#ccc',
  },
  selectedSeat: {
    backgroundColor: Color.primaryBlue20,
    borderColor: '#002D62',
  },
  seatText: {
    color: '#000',
    fontWeight: 'bold',
  },
  unavailableSeatText: {
    color: '#aaa',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  selectedSeatText: {
    fontSize: 16,
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#002D62',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function SelectSeat({data, selectedSeat, setSelectedSeat}: any) {
  return (
    <SeatBooking
      data={data}
      selectedSeat={selectedSeat}
      setSelectedSeat={setSelectedSeat}
    />
  );
}
