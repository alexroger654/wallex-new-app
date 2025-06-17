import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {MinusIcon, PlusIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
}

interface SelectGuestCountProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  guestCounts: GuestCounts;
  setGuestCounts: React.Dispatch<React.SetStateAction<GuestCounts>>;
}

const SelectGuestCount: React.FC<SelectGuestCountProps> = ({
  isModalVisible,
  setIsModalVisible,
  guestCounts,
  setGuestCounts,
}) => {
  const handleIncrement = (type: string) => {
    setGuestCounts((prevCounts: any) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  const handleDecrement = (type: string) => {
    setGuestCounts((prevCounts: any) => ({
      ...prevCounts,
      [type]: prevCounts[type] > 0 ? prevCounts[type] - 1 : 0,
    }));
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Guests</Text>
            <TouchableOpacity onPress={toggleModal}>
              <XMarkIcon size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Adults */}
          <View style={styles.guestRow}>
            <Text style={styles.label}>Adults</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => handleDecrement('adults')}>
                <MinusIcon size={20} color={Color.white} />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{guestCounts.adults}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => handleIncrement('adults')}>
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
                onPress={() => handleDecrement('children')}>
                <MinusIcon size={20} color={Color.white} />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{guestCounts.children}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => handleIncrement('children')}>
                <PlusIcon size={20} color={Color.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Infants */}
          <View style={styles.guestRow}>
            <Text style={styles.label}>Infants</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => handleDecrement('infants')}>
                <MinusIcon size={20} color={Color.white} />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{guestCounts.infants}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => handleIncrement('infants')}>
                <PlusIcon size={20} color={Color.white} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={toggleModal}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    padding: 6,
    marginHorizontal: 8,
    backgroundColor: Color.primaryGreen100,
    borderRadius: 6,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
  },
  confirmButton: {
    backgroundColor: '#003366',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectGuestCount;
