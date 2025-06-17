import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Select from '../Select';
import {Color} from '../../GlobalStyles';
import useGetData from '../../shared/fetch/useGetData';
import PlanList from './PlanList';
import usePostData from '../../shared/fetch/usePostData';
import {useToast} from 'react-native-toast-notifications';

export default function MobileRecharge({mobile}: any) {
  const [selectedOperator, setSelectedOperator] = useState('');

  const [packages, setPackages] = useState<any>({});
  const toast = useToast();

  // ================== handle get packages

  async function handleGetPackages() {
    const result = await useGetData(
      `mobile-recharge-plans?page=1&limit=20&operator=${selectedOperator}`,
      'service',
    );

    setPackages(result?.data);
  }

  useEffect(() => {
    handleGetPackages();
  }, [selectedOperator]);

  const handleRecharge = async () => {
    // XML data
    const xmlData = `
      <billPaymentRequest>
        <agentId>CC01CC01513515340681</agentId>
        <billerAdhoc>true</billerAdhoc>
        <agentDeviceInfo>
          <ip>192.168.2.73</ip>
          <initChannel>AGT</initChannel>
          <mac>01-23-45-67-89-ab</mac>
        </agentDeviceInfo>
        <customerInfo>
          <customerMobile>9898990083</customerMobile>
          <customerEmail></customerEmail>
          <customerAdhaar></customerAdhaar>
          <customerPan></customerPan>
        </customerInfo>
        <billerId>BILAVMTNL00001</billerId>
        <billerName>MTNL Mumbai</billerName>
        <inputParams>
          <input>
            <paramName>Mobile Number</paramName>
            <paramValue>0131804854</paramValue>
          </input>
          <input>
            <paramName>Recharge Type</paramName>
            <paramValue></paramValue>
          </input>
        </inputParams>
        <amountInfo>
          <amount>50</amount>
          <currency>356</currency>
          <custConvFee>0</custConvFee>
          <amountTags></amountTags>
        </amountInfo>
        <paymentMethod>
          <paymentMode>Cash</paymentMode>
          <quickPay>Y</quickPay>
          <splitPay>N</splitPay>
        </paymentMethod>
        <paymentInfo>
          <info>
            <infoName>Remarks</infoName>
            <infoValue>Received</infoValue>
          </info>
        </paymentInfo>
      </billPaymentRequest>
    `;

    try {
      const result = await usePostData('bill-payment', xmlData, 'bbps');
      if (result) {
        toast.show('Recharge Successful', {
          // type: 'danger',
        });
      } else {
        toast.show('Payment Failed', {
          type: 'danger',
        });
      }
    } catch (e) {
      toast.show('Payment Failed', {
        type: 'danger',
      });
    }
  };

  // ============= render

  return (
    <View>
      <Select
        selectedValue={selectedOperator}
        setSelectedValue={setSelectedOperator}
        options={[
          {
            id: 'Airtel',
            label: 'Airtel',
          },
          {
            id: 'Jio',
            label: 'Jio',
          },
          {
            id: 'BSNL',
            label: 'BSNL',
          },
          {
            id: 'Vi',
            label: 'Vi',
          },
          {
            id: 'MTNL',
            label: 'MTNL',
          },
        ]}
      />
      <TextInput
        style={[
          styles.input,
          {
            marginTop: 14,
          },
        ]}
        placeholder={'Mobile Number'}
        placeholderTextColor={Color.colorGray}
        defaultValue={mobile}
      />
      <TextInput
        style={styles.input}
        placeholder={'Amount'}
        placeholderTextColor={Color.colorGray}
      />

      <View
        style={{
          // padding: 20,
          marginTop: 20,
          backgroundColor: Color.white,
        }}>
        <TouchableOpacity
          onPressIn={handleRecharge}
          style={styles.button}
          onPress={handleRecharge}>
          <Text style={styles.buttonText}>Recharge</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 40,
        }}></View>

      <View>
        <PlanList data={packages} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
