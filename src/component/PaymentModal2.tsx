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
import Clipboard from '@react-native-clipboard/clipboard';

const PaymentModal2 = ({visible, onClose}: any) => {
  const [accountHolderName, setAccountHolderName] = useState('John Doe');
  const [accountNumber, setAccountNumber] = useState('1234567890');
  const [ifscCode, setIfscCode] = useState('ICIC0001234');

  // ============ hooks=======================
  const toast = useToast();

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    console.log(text);
    toast.show('Copied to Clipboard');
  };

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
            <Text style={styles.title}>IMPS/NEFT/Bank Transfer</Text>

            {/* Account Holder's Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account Holder's Name*</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  value={accountHolderName}
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(accountHolderName)}>
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Account Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Account No.*</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  value={accountNumber}
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(accountNumber)}>
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* IFSC Code */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>IFSC Code*</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  value={ifscCode}
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(ifscCode)}>
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    height: 500,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    width: '100%',
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
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    marginLeft: 10,
    backgroundColor: Color.primaryBlue100,
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  copyText: {
    color: '#fff',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    borderColor: Color.primaryBlue100,
  },
  cancelButtonText: {
    color: Color.primaryBlue100,
  },
});

export default PaymentModal2;
