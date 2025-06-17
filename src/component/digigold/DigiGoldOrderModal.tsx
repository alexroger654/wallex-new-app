import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { MinusIcon, PlusIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { Color } from '../../GlobalStyles';

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
}

interface SelectGuestCountProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
  metal: string;
  grams: number;
  price: any;
  handleInvestmentProcess: any;
}

const DigiGoldOrderModal: React.FC<SelectGuestCountProps> = ({
  isModalVisible,
  setIsModalVisible,
  image,
  metal,
  grams,
  price,
  handleInvestmentProcess,
}) => {
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleOrder = () => {
    handleInvestmentProcess();
    setIsModalVisible(false);
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
            <Text style={styles.headerTitle}>Buy {metal}</Text>
            <TouchableOpacity onPress={toggleModal}>
              <XMarkIcon size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Adults */}
          <View style={styles.guestRow}>
            <Text style={styles.label}>Metal </Text>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>{metal}</Text>
            </View>
          </View>
          <View style={styles.guestRow}>
            <Text style={styles.label}>Quantity </Text>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>{grams}</Text>
            </View>
          </View>

          {/* Children */}
          <View style={styles.guestRow}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>{price}</Text>
            </View>
          </View>
          <View style={styles.guestRow}>
            <Text style={styles.label}>Total Tax</Text>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>₹{(price * 3) / 100} (3%)</Text>
            </View>
          </View>
          <View style={styles.guestRow}>
            <Text style={styles.label}>Total Price</Text>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>₹{(+price * 1.03)?.toString()}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleOrder}>
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

export default DigiGoldOrderModal;
