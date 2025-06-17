import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Color} from '../../GlobalStyles';

const BillFetchResponse = ({data}: any) => {
  // Simulated data parsed from XML

  // Render functions for sections
  const renderSection = (title, data, renderItem) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>OTME</Text>

      {/* {data.inputParams.input.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.label}>{item.paramName}:</Text>
          <Text style={styles.value}>{item.paramValue}</Text>
        </View>
      ))} */}

      <Text style={styles.sectionTitle}>Biller</Text>
      <View style={styles.item}>
        <Text style={styles.label}>Bill Amount:</Text>
        <Text style={styles.value}>{data?.billerResponse?.billAmount}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Bill Date:</Text>
        <Text style={styles.value}>{data.billerResponse?.billDate}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Bill Number:</Text>
        <Text style={styles.value}>{data.billerResponse.billNumber}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Customer Name:</Text>
        <Text style={styles.value}>{data.billerResponse.customerName}</Text>
      </View>
      <Text style={styles.sectionTitle}>Amount Options</Text>
      {data.billerResponse.amountOptions.option.map((option, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.label}>{option.amountName}:</Text>
          <Text style={styles.value}>{option.amountValue}</Text>
        </View>
      ))}

      <View
        style={{
          // padding: 20,
          marginTop: 20,
          backgroundColor: Color.white,
        }}>
        <TouchableOpacity
          //   onPressIn={handleRecharge}
          // onPressIn={fetchBill}
          style={styles.button}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#444',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 14,
    color: '#000',
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

export default BillFetchResponse;
