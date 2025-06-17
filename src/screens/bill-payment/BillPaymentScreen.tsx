import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Color} from '../../GlobalStyles';
import {Toast} from 'react-native-toast-notifications';
import Select from '../../component/Select';
import MobileRecharge from '../../component/bill-payment/MobileRecharge';
import ElectricityBill from '../../component/bill-payment/ElectricityBill';

// Define types for input fields
interface InputField {
  label: string;
  key: string;
  placeholder: string;
  keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

// Define configuration for all input types
const inputFieldsConfig: Record<string, InputField[]> = {
  mobileRecharge: [
    // {
    //   label: 'Mobile Number',
    //   key: 'mobileNumber',
    //   placeholder: 'Mobile Number',
    //   keyboardType: 'phone-pad',
    // },
    // {
    //   label: 'Amount',
    //   key: 'amount',
    //   placeholder: 'Amount',
    //   keyboardType: 'numeric',
    // },
  ],
  electricity: [],
  DTH: [
    {
      label: 'Operator',
      key: 'operator',
      placeholder: 'Operator',
      keyboardType: 'default',
    },
    {
      label: 'Subscriber ID',
      key: 'subscriberId',
      placeholder: 'Subscriber ID',
      keyboardType: 'numeric',
    },
  ],
  metro: [
    {
      label: 'Card Number',
      key: 'cardNumber',
      placeholder: 'Card Number',
      keyboardType: 'numeric',
    },
    {
      label: 'Amount',
      key: 'amount',
      placeholder: 'Amount',
      keyboardType: 'numeric',
    },
  ],
  landlineBill: [
    {
      label: 'Operator',
      key: 'operator',
      placeholder: 'Operator',
      keyboardType: 'default',
    },
    {
      label: 'STD Code',
      key: 'stdCode',
      placeholder: 'STD Code',
      keyboardType: 'numeric',
    },
  ],
  education: [
    {
      label: 'Location',
      key: 'location',
      placeholder: 'Location',
      keyboardType: 'default',
    },
    {
      label: 'Institute Name',
      key: 'instituteName',
      placeholder: 'Institute Name',
      keyboardType: 'default',
    },
    {
      label: 'Student ID',
      key: 'studentId',
      placeholder: 'Student ID',
      keyboardType: 'numeric',
    },
  ],
  payloan: [
    {
      label: 'Lender',
      key: 'lender',
      placeholder: 'Lender',
      keyboardType: 'default',
    },
    {
      label: 'Loan Number',
      key: 'loanNumber',
      placeholder: 'Loan Number',
      keyboardType: 'numeric',
    },
  ],
  gasBill: [
    {
      label: 'Provider',
      key: 'provider',
      placeholder: 'Provider',
      keyboardType: 'default',
    },
    {
      label: 'Customer ID',
      key: 'customerId',
      placeholder: 'Customer ID',
      keyboardType: 'numeric',
    },
  ],
  water: [
    {
      label: 'Water Board',
      key: 'waterBoard',
      placeholder: 'Water Board',
      keyboardType: 'default',
    },
    {
      label: 'RR Number',
      key: 'rrNumber',
      placeholder: 'RR Number',
      keyboardType: 'numeric',
    },
  ],
  trafficChallan: [
    {
      label: 'Traffic Authority',
      key: 'trafficAuthority',
      placeholder: 'Traffic Authority',
      keyboardType: 'default',
    },
    {
      label: 'Challan Number',
      key: 'challanNumber',
      placeholder: 'Challan Number',
      keyboardType: 'numeric',
    },
  ],
  municipalTax: [
    {
      label: 'Property ID',
      key: 'propertyId',
      placeholder: 'Property ID',
      keyboardType: 'numeric',
    },
    {
      label: 'Corporation',
      key: 'corporation',
      placeholder: 'Corporation',
      keyboardType: 'default',
    },
  ],
  tollTag: [
    {
      label: 'Operator',
      key: 'operator',
      placeholder: 'Operator',
      keyboardType: 'default',
    },
    {
      label: 'VRN Number',
      key: 'vrnNumber',
      placeholder: 'VRN Number',
      keyboardType: 'numeric',
    },
  ],
};

const BillPaymentScreen: React.FC = ({navigation, route}: any) => {
  const [selectedType, setSelectedType] =
    useState<keyof typeof inputFieldsConfig>('mobileRecharge');
  const [formData, setFormData] = useState<Record<string, string>>({});

  const [selectedOperator, setSelectedOperator] = useState('');

  const handleInputChange = (key: string, value: string) => {
    setFormData(prevData => ({...prevData, [key]: value}));
  };

  const handleRecharge = () => {
    const fields = inputFieldsConfig[selectedType];
    const isEmpty = fields.some(field => !formData[field.key]);
    if (isEmpty) {
      Toast.show('Please fill in all fields', {
        type: 'danger',
      });
      return;
    }

    Toast.show('Payment Failed', {
      type: 'error',
    });
    navigation?.navigate('ReceiptScreen');
    // Alert.alert(
    //   'Success',
    //   `Submitted for ${selectedType}: ${JSON.stringify(formData)}`,
    // );
  };

  const fields = inputFieldsConfig[selectedType] || [];

  useEffect(() => {
    if (route?.params?.type) {
      setSelectedType(route?.params?.type);
    }
  }, [route?.params?.type]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View
          style={{
            backgroundColor: Color.primaryBlue100,
            paddingHorizontal: 10,
            paddingVertical: 24,
          }}>
          <Text style={styles.title}>Recharge or Pay Bill</Text>
        </View>

        <View
          style={{
            padding: 20,
          }}>
          <ScrollView
            horizontal
            style={{
              marginBottom: 20,
            }}>
            {Object.keys(inputFieldsConfig)?.map(item => (
              <Pressable
                onPress={() => setSelectedType(item)}
                style={{marginRight: 10}}>
                <Text
                  style={{
                    color: Color.primaryBlue100,
                    padding: 10,
                    textTransform: 'uppercase',
                    borderRadius: 12,
                  }}>
                  {item}
                </Text>

                {selectedType == item ? (
                  <>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Color.primaryBlue100,
                        width: '88%',
                        marginHorizontal: 'auto',
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </Pressable>
            ))}
          </ScrollView>
          <View
            style={{
              marginTop: 10,
              marginBottom: 20,
              width: '100%',
            }}>
            {route?.params?.type == 'mobileRecharge' &&
            selectedType == 'mobileRecharge' ? (
              <MobileRecharge mobile={route?.params?.mobile} />
            ) : (
              <></>
            )}
            {selectedType == 'electricity' ? (
              <ElectricityBill mobile={route?.params?.mobile} />
            ) : (
              <></>
            )}
          </View>
          {/* Dynamic Input Fields */}
          {fields.map(field => (
            <TextInput
              key={field.key}
              style={styles.input}
              placeholder={field.placeholder}
              placeholderTextColor={Color.colorGray}
              keyboardType={field.keyboardType}
              value={formData[field.key] || ''}
              onChangeText={value => handleInputChange(field.key, value)}
            />
          ))}
        </View>
      </ScrollView>
      {/* Submit Button */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    color: Color.primaryBlue100,
    backgroundColor: Color.secondaryColors100,
    borderRadius: 10,
    textTransform: 'capitalize',
  },
  input: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    height: 55,
    color: Color.primaryBlue100,
    backgroundColor: Color.secondaryColors100,
  },
  button: {
    backgroundColor: Color.primaryBlue100,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BillPaymentScreen;
