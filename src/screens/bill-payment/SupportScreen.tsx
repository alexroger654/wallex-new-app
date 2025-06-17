import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import {Picker} from '@react-native-picker/picker';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {Color} from '../../GlobalStyles';
import {Toast} from 'react-native-toast-notifications';
import usePostData from '../../shared/fetch/usePostData';

const HelpAndSupport = () => {
  const [idType, setIdType] = useState('Transaction ID');
  const [referenceId, setReferenceId] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [additionalDescription, setAdditionalDescription] = useState('');

  const data = [{label: 'Transaction ID'}, {label: 'Request ID'}];

  const issueOptions = ['Issue 1', 'Issue 2', 'Issue 3'];

  //   const handleSubmit = () => {
  //     console.log({
  //       idType,
  //       referenceId,
  //       selectedIssue,
  //       additionalDescription,
  //     });
  //   };

  const registerComplaints = async () => {
    if (!referenceId || !selectedIssue || !additionalDescription) {
      Toast.show('Please Fill All The Details');
      return;
    }
    Toast.show('Something Went Wrong', {
      type: 'danger',
    });
    return;

    // Define the XML data
    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
  <complaintRegistrationReq>
    <customerMobile>9620992993</customerMobile>
    <complaintType>Transaction</complaintType>
    <participationType />
    <agentId />
    <txnRefId>CC013311BAAE00049105</txnRefId>
    <billerId />
    <complaintDesc>Complaint initiated through API</complaintDesc>
    <servReason />
    <complaintDisposition>Transaction Successful, account not updated</complaintDisposition>
  </complaintRegistrationReq>`;

    try {
      // Make the POST request using fetch
      const response = await fetch(
        'https://dev.wallex.world/bbps/register-complain',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/xml',
            Accept: 'application/xml',
          },
          body: xmlData,
        },
      );

      // Check if the response is successful
      if (!response.ok) {
        Toast.show('Something Went Wrong');
      }

      // Handle the response
      const responseText = await response.text();
      console.log('Response:', responseText);
      Toast.show('Complaint Sent Successfully');
    } catch (error) {
      // Handle errors
      //   console.error('Error:', error.message);
    }
  };

  async function createComplaints() {
    const result = await usePostData(
      'bbps/complaints',
      {
        id: 'custom', // transaction ref id
        complaintId: 'dlkdkljdflioejdf',
        type: 'TRANSACTION',
        // status: 'FAILURE', // "SUCCESS", "FAILURE", "PENDING"
      },
      'service',
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ChevronLeftIcon size={24} color="#fff" />
        <Text style={styles.headerText}>Help & Support</Text>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/BharatBillPay.png')}
        />
      </View>

      <ScrollView
        style={{
          flex: 1,
          padding: 20,
        }}>
        <View
          style={{
            backgroundColor: Color.white,
            padding: 14,
            borderRadius: 20,
          }}>
          <View style={{}}>
            {/* ID Type Radio Buttons */}
            <Text style={styles.label}>ID Type</Text>
            <RadioButtonRN
              layout="row"
              data={data}
              initial={1}
              selectedBtn={(e: any) => setIdType(e.label)}
              box={false}
              activeColor="#003366"
              style={styles.radioButtons}
              textStyle={styles.radioText}
            />
          </View>
          {/* Transaction Reference ID */}
          <Text style={styles.label}>Transaction Reference ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Reference ID"
            value={referenceId}
            onChangeText={setReferenceId}
          />
          {/* Select Issue */}
          <Text style={styles.label}>What is the issue?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedIssue}
              onValueChange={itemValue => setSelectedIssue(itemValue)}>
              <Picker.Item
                label="Select Issue"
                value=""
                color={Color.primaryBlue50}
              />
              {issueOptions.map((issue, index) => (
                <Picker.Item
                  key={index}
                  label={issue}
                  value={issue}
                  //   color={Color.white}
                />
              ))}
            </Picker>
          </View>

          {/* Additional Description */}
          <Text style={styles.label}>Additional Description</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Write brief here..."
            multiline
            value={additionalDescription}
            onChangeText={setAdditionalDescription}
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View
        style={{
          padding: 20,
        }}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={registerComplaints}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondaryColors100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003366',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#003366',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: Color.secondaryColors100,
    borderRadius: 8,
    marginBottom: 16,
  },
  textarea: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#003366',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButtons: {
    marginBottom: 16,
  },
  radioText: {
    color: '#003366',
    fontSize: 14,
  },
});

export default HelpAndSupport;
