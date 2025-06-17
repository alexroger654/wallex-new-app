import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import { Color } from '../../GlobalStyles';
import {
  AdjustmentsVerticalIcon,
  ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TransactionScreen = ({ navigation }: any) => {
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      date: '04-APR-23',
      ref: '928979301938',
      type: 'Debit',
      amount: -193.0,
      description: 'UPI Payment\nAmazon India',
      closingBalance: 23458.0,
    },
    {
      id: '2',
      date: '04-APR-23',
      ref: '928979301939',
      type: 'Credit',
      amount: 193.0,
      description: 'UPI Payment\nAmazon India',
      closingBalance: 23651.0,
    },
    {
      id: '3',
      date: '03-APR-23',
      ref: '928979301940',
      type: 'Debit',
      amount: -193.0,
      description: 'UPI Payment\nEMI Option',
      closingBalance: 23458.0,
    },
  ]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const formatDate = (date: Date) =>
    date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .toUpperCase()
      .replace(' ', '-');

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date.replace(/-/g, ' '));
    if (startDate && endDate) {
      return transactionDate >= startDate && transactionDate <= endDate;
    }
    return true;
  });

  const TransactionItem = ({ transaction }: any) => (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.date}>{transaction.date}</Text>
        <Text style={styles.ref}>Ref No: {transaction.ref}</Text>
        <Text style={styles.description}>{transaction.description}</Text>
      </View>
      <View>
        <Text
          style={[
            styles.amount,
            transaction.type === 'Debit' ? styles.debit : styles.credit,
          ]}>
          {transaction.type === 'Debit' ? '⬆' : '⬇'} ₹
          {Math.abs(transaction.amount).toFixed(2)}
        </Text>
        <Text style={styles.closingBalance}>
          Closing Balance: ₹{transaction.closingBalance.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          backgroundColor: Color.primaryBlue100,
          paddingVertical: 24,
          paddingHorizontal: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Pressable onPress={() => navigation.goBack()} style={styles.header}>
          <ChevronLeftIcon size={20} color={'#fff'} />
          <Text style={styles.headerText}>Transactions</Text>
        </Pressable>
        <Pressable
          onPress={() => setStartPickerVisible(true)}
          style={{
            backgroundColor: Color.primaryBlue100,
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
          }}>
          <AdjustmentsVerticalIcon size={20} color={Color.white} />
        </Pressable>
      </View>

      {/* Date Range Selection */}
      {/* <View style={styles.dateRangeContainer}>
        <View></View>
        <Pressable
          onPress={() => setStartPickerVisible(true)}
          style={{
            backgroundColor: Color.primaryBlue100,
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
          }}>
          <AdjustmentsVerticalIcon size={20} color={Color.white} />
        </Pressable>
      </View> */}

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
      />

      {/* Date Pickers */}
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="date"
        onConfirm={date => {
          setStartDate(date);
          setStartPickerVisible(false);
        }}
        onCancel={() => setStartPickerVisible(false)}
        minimumDate={new Date('2022-01-01')} // Optional: Limit start date selection
      />

      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="date"
        onConfirm={date => {
          setEndDate(date);
          setEndPickerVisible(false);
        }}
        onCancel={() => setEndPickerVisible(false)}
        minimumDate={startDate || new Date('2022-01-01')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    // backgroundColor: Color.primaryBlue100,
    // paddingVertical: 20,
    // paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  dateButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: Color.primaryBlue100,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    height: 30,
    width: 30,
  },
  dateButtonText: {
    color: Color.primaryBlue100,
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  date: {
    fontWeight: 'bold',
    color: Color.secondaryColors700,
  },
  ref: {
    color: Color.secondaryColors500,
    fontSize: 12,
  },
  description: {
    color: Color.secondaryColors500,
    fontSize: 12,
  },
  closingBalance: {
    color: Color.secondaryColors500,
    marginTop: 5,
    fontSize: 12,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  debit: {
    color: 'red',
  },
  credit: {
    color: 'green',
  },
});

export default TransactionScreen;
