import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import {Color} from '../GlobalStyles';
import RazorpayCheckout from 'react-native-razorpay';
import {useAuth} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

const IMPSModal = ({visible, onClose}: any) => {
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  // ================= render ==============
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>IMPS/NEFT/ Bank Transfer</Text>

            {/* Account Holder's Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account Holder's Name*</Text>
              <TextInput
                style={styles.input}
                placeholder="AAccount Holder's Name"
                placeholderTextColor="#AAB1B7"
                value={accountHolderName}
                onChangeText={setAccountHolderName}
              />
            </View>

            {/* Account Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account No.*</Text>
              <TextInput
                style={styles.input}
                placeholder="Account No.*"
                placeholderTextColor="#AAB1B7"
                keyboardType="numeric"
                value={accountNumber}
                onChangeText={setAccountNumber}
              />
            </View>

            {/* IFSC Code */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>IFSC Code*</Text>
              <TextInput
                style={styles.input}
                placeholder="icic12345"
                placeholderTextColor="#AAB1B7"
                value={ifscCode}
                onChangeText={setIfscCode}
              />
            </View>

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close ➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },

  optionButton: {
    width: '100%',
    padding: 15,
    backgroundColor: Color.secondaryColors200,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: Color.primaryBlue100,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0A0A0A',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    color: '#333333',
  },
  closeButton: {
    backgroundColor: '#183764',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default IMPSModal;
