import {
  FlatList,
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
import {XMLParser} from 'fast-xml-parser';
import BillFetchResponse from './BillFetchResponse';

export default function ElectricityBill({mobile}: any) {
  const [selectedOperator, setSelectedOperator] = useState('OCNS');
  const [fetchData, setFetchData] = useState<any>('');
  // Initial state
  const [inputs, setInputs] = useState([
    {label: 'a', value: '10'},
    {label: 'a b', value: '20'},
    {label: 'a b c', value: '30'},
    {label: 'a b c d', value: '40'},
    {label: 'a b c d e', value: '50'},
  ]);

  const [packages, setPackages] = useState<any>({});
  const toast = useToast();

  // Handler to update the value for an input field
  //@ts-ignore
  const handleInputChange = (index, newValue) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].value = newValue;
    setInputs(updatedInputs);
  };

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
  const fetchBill = async () => {
    // XML data
    const xmlData = `
      <billFetchRequest>
   <agentId>CC01CC01513515340681</agentId>
   <agentDeviceInfo>
      <ip>192.168.2.73</ip>
      <initChannel>AGT</initChannel>
      <mac>01-23-45-67-89-ab</mac>
   </agentDeviceInfo>
   <customerInfo>
      <customerMobile>9898990084</customerMobile>
      <customerEmail></customerEmail>
      <customerAdhaar></customerAdhaar>
      <customerPan></customerPan>
   </customerInfo>
   <billerId>OTME00005XXZ43</billerId>
   <inputParams>
      <input>
         <paramName>a</paramName>
         <paramValue>10</paramValue>
      </input>
      <input>
         <paramName>a b</paramName>
         <paramValue>20</paramValue>
      </input>
      <input>
         <paramName>a b c</paramName>
         <paramValue>30</paramValue>
      </input>
      <input>
         <paramName>a b c d</paramName>
         <paramValue>40</paramValue>
      </input>
      <input>
         <paramName>a b c d e</paramName>
         <paramValue>50</paramValue>
      </input>
   </inputParams>
</billFetchRequest>
    `;

    try {
      const response = await fetch('https://dev.wallex.world/bbps/fetch-bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml', // Set content type to XML
          Accept: 'application/xml', // Optional, if the API responds with XML
        },
        body: xmlData,
      });

      if (response.ok) {
        const responseText = await response.text();

        // Parse XML to JSON
        const parser = new XMLParser();
        const jsonData = parser.parse(responseText);
        console.log(jsonData.billFetchResponse, 'ppppppppppppp');
        // Set parsed data to state
        setFetchData(jsonData.billFetchResponse);
      } else {
        console.error(
          'Failed to send request:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error:', error);
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
            id: 'OCNS',
            label: 'OCNS',
          },
          {
            id: 'OTME',
            label: 'OTME',
          },
        ]}
      />

      <FlatList
        data={inputs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
              style={styles.input}
              value={item.value}
              onChangeText={value => handleInputChange(index, value)}
              keyboardType="numeric"
            />
          </View>
        )}
      />
      {selectedOperator == 'OCNS' ? (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder={'Amount'}
              placeholderTextColor={Color.colorGray}
            />
          </View>
        </>
      ) : (
        <></>
      )}

      <View
        style={{
          // padding: 20,
          marginTop: 20,
          backgroundColor: Color.white,
        }}>
        <TouchableOpacity
          //   onPressIn={handleRecharge}
          onPressIn={fetchBill}
          style={styles.button}
          onPress={selectedOperator == 'OCNS' ? handleRecharge : fetchBill}>
          <Text style={styles.buttonText}>
            {selectedOperator == 'OCNS' ? 'Pay Now' : 'Fetch Bill'}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 40,
        }}></View>

      <View>{fetchData && <BillFetchResponse data={fetchData} />}</View>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  inputGroup: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
});
