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
  price: string;
  name: string;
  handleInvestmentProcess: any;
}

const OrderModal: React.FC<SelectGuestCountProps> = ({
  isModalVisible,
  setIsModalVisible,
  price,
  name,
  handleInvestmentProcess,
}) => {
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleOrder = () => {
    handleInvestmentProcess();
    setIsModalVisible(false);
  };



  console.log(name, ';{data?.brandName}        {data?.brandName}')

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Buy </Text>
            <TouchableOpacity onPress={toggleModal}>
              <XMarkIcon size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Adults */}

          {/* Children */}
          <View style={styles.guestRow}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>{name}</Text>
            </View>
          </View>
          <View style={styles.guestRow}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.counter}>
              <Text style={styles.counterValue}>₹{price}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleOrder} style={styles.confirmButton}>
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

export default OrderModal;
