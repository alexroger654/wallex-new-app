import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {XMarkIcon, MinusIcon, PlusIcon} from 'react-native-heroicons/outline';
import Modal from 'react-native-modal';
import {Color} from '../../GlobalStyles';
import {Picker} from '@react-native-picker/picker';
const SelectRoomAndGuest: React.FC = ({
  isModalVisible,
  setIsModalVisible,
  rooms,
  setRooms,
}: any) => {
  const handleIncrement = (index: number, type: string) => {
    const updatedRooms = [...rooms];
    if (type === 'adults') {
      updatedRooms[index].adults += 1;
    } else if (type === 'children') {
      updatedRooms[index].children += 1;
      updatedRooms[index].childAges.push(2); // Default age
    }
    setRooms(updatedRooms);
  };

  const handleDecrement = (index: number, type: string) => {
    const updatedRooms = [...rooms];
    if (type === 'adults' && updatedRooms[index].adults > 0) {
      updatedRooms[index].adults -= 1;
    } else if (type === 'children' && updatedRooms[index].children > 0) {
      updatedRooms[index].children -= 1;
      updatedRooms[index].childAges.pop(); // Remove the last child age
    }
    setRooms(updatedRooms);
  };

  const handleAgeChange = (
    roomIndex: number,
    childIndex: number,
    age: number,
  ) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childAges[childIndex] = age;
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, {adults: 1, children: 0, childAges: []}]);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Room & Guest</Text>
            <TouchableOpacity onPress={toggleModal}>
              <XMarkIcon size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {rooms.map((room, roomIndex) => (
              <View key={roomIndex} style={styles.roomContainer}>
                <View style={styles.roomHeader}>
                  <Text style={styles.roomTitle}>Room {roomIndex + 1}</Text>
                </View>

                {/* Adults */}
                <View style={styles.guestRow}>
                  <Text style={styles.label}>Adults</Text>
                  <View style={styles.counter}>
                    <TouchableOpacity
                      style={styles.counterButton}
                      onPress={() => handleDecrement(roomIndex, 'adults')}>
                      <MinusIcon size={20} color={Color.white} />
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{room.adults}</Text>
                    <TouchableOpacity
                      style={styles.counterButton}
                      onPress={() => handleIncrement(roomIndex, 'adults')}>
                      <PlusIcon size={20} color={Color.white} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Children */}
                <View style={styles.guestRow}>
                  <Text style={styles.label}>Children</Text>
                  <View style={styles.counter}>
                    <TouchableOpacity
                      style={styles.counterButton}
                      onPress={() => handleDecrement(roomIndex, 'children')}>
                      <MinusIcon size={20} color={Color.white} />
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{room.children}</Text>
                    <TouchableOpacity
                      style={styles.counterButton}
                      onPress={() => handleIncrement(roomIndex, 'children')}>
                      <PlusIcon size={20} color={Color.white} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Child Ages */}
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    gap: 8,
                  }}>
                  {room.childAges.map((age, childIndex) => (
                    <View key={childIndex} style={styles.ageRow}>
                      <Text style={styles.label}>
                        Child {childIndex + 1} Age
                      </Text>
                      <View
                        style={{
                          backgroundColor: Color.secondaryColors100,
                          borderRadius: 12,
                          paddingBottom: 8,
                          marginTop: 4,
                        }}>
                        <Picker
                          selectedValue={age}
                          style={styles.picker}
                          onValueChange={value =>
                            handleAgeChange(roomIndex, childIndex, value)
                          }>
                          {Array.from({length: 18}, (_, i) => (
                            <Picker.Item key={i} label={`${i}`} value={i} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            {/* Add Room Button */}
            <TouchableOpacity style={styles.addRoomButton} onPress={addRoom}>
              <Text style={styles.addRoomText}>Add Another Room</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity style={styles.confirmButton} onPress={toggleModal}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  openModalButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
  },
  openModalText: {
    color: '#fff',
    fontSize: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  roomContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderBottomColor: Color.secondaryColors200,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.primaryBlue100,
  },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: Color.primaryBlue100,
    flex: 1,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    padding: 4,
    marginHorizontal: 8,
    backgroundColor: Color.primaryGreen100,
    borderRadius: 6,
  },
  counterValue: {
    fontSize: 16,
    color: Color.primaryBlue100,
    fontWeight: '800',
  },
  addRoomButton: {
    backgroundColor: Color.white,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
    borderWidth: 1,
    borderColor: Color.primaryBlue100,
  },
  addRoomText: {
    color: Color.primaryBlue100,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#003366',
    padding: 16,
    borderRadius: 28,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ageRow: {
    marginBottom: 8,
    // borderWidth: 1,
    // borderColor: Color.primaryBlue100,
    padding: 6,
    width: '46%',
    borderRadius: 12,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    color: '#000',
  },
});

export default SelectRoomAndGuest;
