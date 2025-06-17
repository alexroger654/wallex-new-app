import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {Color} from '../../GlobalStyles';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';

const PaymentsScreen = () => {
  const transactions = [
    {
      id: '1',
      productName: 'Product Name',
      date: 'March 23, 2024',
      amount: '₹290',
    },
    {
      id: '2',
      productName: 'Product Name',
      date: 'March 23, 2024',
      amount: '₹290',
    },
    {
      id: '3',
      productName: 'Product Name',
      date: 'March 23, 2024',
      amount: '₹290',
    },
  ];

  const renderTransaction = ({item}: any) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionId}>#UGDUIB9813UBDU</Text>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity>
            <ChevronLeftIcon size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.headerText,
            {
              color: Color.secondaryColors600,
            },
          ]}>
          Payments
        </Text>
        <View></View>
      </View>

      {/* Wallet Balance Section */}
      <View style={styles.walletBalanceContainer}>
        <Text style={styles.walletLabel}>Wallet Balance</Text>
        <TouchableOpacity>
          <Text style={styles.infoIcon}>i</Text>
        </TouchableOpacity>
        <Text style={styles.walletAmount}>₹0</Text>
        <Text style={styles.minWithdrawText}>
          Min. withdrawal amount is ₹49
        </Text>
        <TouchableOpacity style={styles.startEarningButton}>
          <Text style={styles.startEarningButtonText}>Start Earning</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Modes Section */}
      <View style={styles.paymentModesContainer}>
        <View style={styles.paymentModesLabelContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://img.freepik.com/premium-vector/lot-money-pile-savings-loan-heap-concept-vector-flat-cartoon-icon-illustration_133260-10425.jpg?semt=ais_hybrid',
              }}
              style={{
                height: 30,
                width: 30,
                marginRight: 8,
              }}
            />
            <Text style={styles.paymentModesLabel}>Payment Modes</Text>
          </View>
          <TouchableOpacity style={styles.setupButton}>
            <Text style={styles.setupButtonText}>Setup</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transactions Section */}
      <View style={styles.transactionsContainer}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.infoIcon}>i</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          {/* <TouchableOpacity
            style={[styles.categoryButton, styles.activeCategory]}>
            <Text style={styles.categoryText}>All</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Electronics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Gaming</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          style={styles.transactionList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 28,
    backgroundColor: Color.white,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  backButton: {
    fontSize: 24,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  walletBalanceContainer: {
    backgroundColor: '#D2EEE7',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  walletLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  infoIcon: {
    fontSize: 12,
    color: '#666',
  },
  walletAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
    marginVertical: 8,
  },
  minWithdrawText: {
    fontSize: 14,
    color: '#666',
  },
  startEarningButton: {
    backgroundColor: '#1DAB87',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 800,
    marginTop: 16,
  },
  startEarningButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentModesContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  paymentModesLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentModesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  setupButton: {
    backgroundColor: '#E0E7FF',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  setupButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  transactionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: '#1D4ED8',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  transactionList: {
    marginTop: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionId: {
    fontSize: 12,
    color: '#666',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginVertical: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1DAB87',
  },
});

export default PaymentsScreen;
