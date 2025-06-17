import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
  PlayPauseIcon,
} from 'react-native-heroicons/outline';
import {CalendarDaysIcon, PlusCircleIcon} from 'react-native-heroicons/solid';
import {Color} from '../../GlobalStyles';
import Activity from '../../component/split-bill/Activity';
import {useAuth} from '../../context/AuthContext';

const SplitBillHomeScreen = ({navigation}: any) => {
  const activityData = [
    {
      id: '1',
      title: 'Sameer Birthday Party',
      amount: '₹3,652',
      color: '#E03E3E',
      iconBackground: Color.primaryBlue100,
      showIcon: true,
    },
    {
      id: '2',
      title: 'Hotel Parks',
      amount: '₹3,652',
      color: '#2AB673',
      paymentBy: 'Payment by Sameer',
      showIcon: false,
    },
  ];

  const {user} = useAuth();

  // ==================== render ================
  return (
    <>
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
                color: Color.primaryBlue100,
              },
            ]}>
            Split Bills
          </Text>
          <View></View>
        </View>

        {/* Total Balance */}
        {/* <View style={styles.balanceContainer}>
          <Text
            style={[
              styles.balanceText,
              {
                color: Color.secondaryColors500,
              },
            ]}>
            Total Balance
          </Text>
          <Text
            style={[
              styles.amount,
              {
                color: Color.primaryBlue100,
              },
            ]}>
            ₹3,456.00
          </Text>
        </View> */}

        {/* I Owe / I am Owed */}
        <View style={styles.oweContainer}>
          <View style={[styles.card, {backgroundColor: '#FDE8E8'}]}>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: '#E35D5D',
                },
              ]}>
              I Owe
            </Text>
            <Text style={[styles.cardAmount, {color: '#E03E3E'}]}>₹56.00</Text>
          </View>
          <View style={[styles.card, {backgroundColor: '#E8F8F2'}]}>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: '#8BB9AD',
                },
              ]}>
              I am Owed
            </Text>
            <Text style={[styles.cardAmount, {color: '#2AB673'}]}>₹500.00</Text>
          </View>
        </View>

        {/* Activity Section */}
        <Text style={styles.sectionTitle}>Activity</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={activityData}
          renderItem={({item}) => <Activity data={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.activityContainer}
        />

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Transactions</Text>
        <View>
          {[...Array(4)].map((_, index) => (
            <View style={styles.transactionCard} key={index}>
              <CalendarDaysIcon size={30} color="#E50914" />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDate}>04-APR-23</Text>
                <Text style={styles.transactionDescription}>
                  UPI Payment - Netflix India
                </Text>
                <Text style={styles.paidBy}>Paid by: Salmaan Ahmed</Text>
              </View>
              <Text style={styles.transactionAmount}>₹199.00</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add New Bill Button */}
      <View
        style={{
          paddingHorizontal: 16,
          backgroundColor: '#F5F5F5',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SplitBillSelectServiceScreen')}
          style={styles.addBillButton}>
          <Text style={styles.addBillText}>Add New Bill</Text>
          <PlusCircleIcon size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  balanceContainer: {
    backgroundColor: Color.primaryBlue20,
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  balanceText: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  oweContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 24,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    // alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: Color.primaryBlue100,
  },
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  activityCard: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  activityTitle: {
    fontSize: 13,
    color: '#6E6E6E',
  },
  activityAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  paymentBy: {
    fontSize: 12,
    color: '#6E6E6E',
    marginTop: 4,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 16,
  },
  transactionDate: {
    fontSize: 14,
    color: '#6E6E6E',
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 4,
    color: Color.secondaryColors400,
  },
  paidBy: {
    fontSize: 12,
    color: '#6E6E6E',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E03E3E',
  },
  addBillButton: {
    flexDirection: 'row',
    backgroundColor: '#2AB673',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  addBillText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
});

export default SplitBillHomeScreen;
