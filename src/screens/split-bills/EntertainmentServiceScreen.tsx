import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import {
  ChevronLeftIcon,
  PaperAirplaneIcon,
  PlayPauseIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';
import {CalendarDaysIcon, PlusCircleIcon} from 'react-native-heroicons/solid';
import {Color} from '../../GlobalStyles';
import Activity from '../../component/split-bill/Activity';
import Group from '../../component/split-bill/Group';
import useGetData from '../../shared/fetch/useGetData';

interface IMember {
  mobile: string;
  fullName: string;
  exclude: boolean;
}

interface ISplitRecord {
  _id: string;
  createdAt: string;
  createdBy: string;
  loanRecords: any[];
  members: IMember[];
  settledRecords: any[];
  status: 'in-progress' | 'completed' | 'pending';
  title: string;
  totalExpenses: number;
  updatedAt: string;
}

// ========================== component ============================

const EntertainmentServiceScreen = ({navigation}: any) => {
  const [group, setGroup] = useState<ISplitRecord[]>([]);

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

  const getGroup = async () => {
    const result = await useGetData('split-bills', 'service');

    setGroup(result?.data);
  };

  useEffect(() => {
    getGroup();
  }, []);

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
            Entertainment Services
          </Text>
          <View></View>
        </View>

        {/* Total Balance */}
        <Pressable
          onPress={() => navigation.navigate('SelectGroupContactScreen')}
          style={{
            backgroundColor: Color.white,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            paddingVertical: 24,
            marginTop: 28,
          }}>
          <View
            style={{
              backgroundColor: Color.primaryBlue100,
              alignItems: 'center',
              justifyContent: 'center',
              width: 45,
              height: 45,
              borderRadius: 35,
            }}>
            <PlusIcon color={Color.white} size={28} />
          </View>
          <Text
            style={[
              styles.amount,
              {
                color: Color.primaryBlue100,
                fontWeight: '600',
              },
            ]}>
            Create group
          </Text>
        </Pressable>

        {/* Activity Section */}
        <Text style={styles.sectionTitle}>Active Groups</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={group}
          renderItem={({item}) => <Group data={item} />}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.activityContainer}
        />

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Transactions</Text>
        <View>
          {group?.map((item, index) => (
            <View style={styles.transactionCard} key={index}>
              <CalendarDaysIcon size={30} color="#E50914" />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDate}>
                  {item?.createdAt?.slice(0, 10)}
                </Text>
                <Text style={styles.transactionDescription}>{item?.title}</Text>
                <Text style={styles.paidBy}> {item?.status}</Text>
              </View>
              <Text style={styles.transactionAmount}>
                ₹{item?.totalExpenses}
              </Text>
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

export default EntertainmentServiceScreen;
